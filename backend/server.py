import google.generativeai as genai
import os
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
import requests
import PyPDF2  # For extracting text from PDF

app = Flask(__name__)
CORS(app)

API_KEY = "AIzaSyBQCWfNkClY6nXpKNCBsGGJx3ajUBsW8XQ"

@app.route('/test', methods=['GET'])
def test_get():
    return jsonify({'message': 'Hello World! from GET'})

@app.route('/greet', methods=['POST'])
def greet():
    data = request.json
    name = data['name']
    return jsonify({'message': f'Hello {name}!'})

@app.route('/generate_question', methods=['POST'])
def generate_question():
    data = request.json
    topic = data['topic']
    no_of_questions = data['no_of_questions']
    difficulty = data['difficulty']

    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")

    questions = model.generate_content(f"Generate {no_of_questions} MCQ questions on {topic} with difficulty {difficulty}. Give me json output.  In the following format: \n\n[{{\n    \"qno\": 1,\n    \"question\": \"What is the capital of India?\",\n    \"options\": [\"Mumbai\", \"Delhi\", \"Kolkata\", \"Chennai\"],\n    \"answer\": \"Delhi\"\n}},\n{{\n    \"qno\": 2,\n    \"question\": \"What is the capital of USA?\",\n    \"options\": [\"Washington DC\", \"New York\", \"Los Angeles\", \"Chicago\"],\n    \"answer\": \"Washington DC\"\n}}]")

    str = questions.text
    str = str.replace('```json', '')
    str = str.replace('```', '')
    str = str.strip()
    questions = json.loads(str)

    print(questions)

    return jsonify(questions)

@app.route('/generate_question_by_file', methods=['POST'])
def generate_question_by_file():
    # Check if a file is provided and it's a PDF
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']

    if file.filename.split('.')[-1].lower() != 'pdf':
        return jsonify({'error': 'File is not a PDF'}), 400

    topic = request.form.get('topic')
    no_of_questions = request.form.get('no_of_questions')
    difficulty = request.form.get('difficulty')
    
    # Validate inputs
    if not topic or not no_of_questions or not difficulty:
        return jsonify({'error': 'Missing required parameters'}), 400
    
    try:
        no_of_questions = int(no_of_questions)
    except ValueError:
        return jsonify({'error': 'Invalid number of questions'}), 400

    # Save the uploaded file temporarily
    file_path = os.path.join("/", file.filename)
    file.save(file_path)
    
    # Extract text from the PDF file
    try:
        pdf_reader = PyPDF2.PdfReader(file_path)
        pdf_text = ""
        for page in range(len(pdf_reader.pages)):
            pdf_text += pdf_reader.pages[page].extract_text()
    except Exception as e:
        return jsonify({'error': f'Failed to process PDF: {str(e)}'}), 500
    finally:
        os.remove(file_path)

    if not pdf_text.strip():
        return jsonify({'error': 'Failed to extract text from the PDF'}), 400

    # Configure the Gemini API
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Prompt construction based on the topic and content of the PDF
    prompt = (f"Based on the content of this PDF file and the topic '{topic}', generate {no_of_questions} "
              f"multiple-choice questions of {difficulty} difficulty. Provide a JSON output for the questions. "
              f"Here is the content of the file: {pdf_text[:2000]}...")

    # Generate questions using the AI model
    questions_response = model.generate_content(prompt)
    
    # Clean the response to get JSON
    questions_str = questions_response.text.replace('```json', '').replace('```', '').strip()

    # Convert to JSON
    try:
        questions = json.loads(questions_str)
    except json.JSONDecodeError:
        return jsonify({'error': 'Failed to decode questions'}), 500

    return jsonify(questions)
    
@app.route('/generate_question_theory', methods=['POST'])
def generate_question_theory():
    data = request.json
    topic = data['topic']
    no_of_questions = data['no_of_questions']
    difficulty = data['difficulty']

    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")

    questions = model.generate_content(f"Generate {no_of_questions} thoery questions on {topic} with difficulty {difficulty}. Give me json output.  In the following format: \n\n[{{\n    \"qno\": 1,\n    \"question\": \"What is the capital of India?\",}},\n{{\n    \"qno\": 2,\n    \"question\": \"What is the capital of USA?\"}}]")

    str = questions.text
    str = str.replace('```json', '')
    str = str.replace('```', '')
    str = str.strip()
    questions = json.loads(str)

    print(questions)
    return jsonify(questions)


if __name__ == '__main__':
    app.run(debug=True)
