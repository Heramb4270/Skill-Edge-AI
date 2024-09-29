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
    data = request.json
    no_of_questions = data['no_of_questions']
    difficulty = data['difficulty']

    # Extract text from PDF file
    pdf_reader = PyPDF2.PdfReader("SIH1699.pptx.pdf")
    pdf_text = ""
    for page in range(len(pdf_reader.pages)):
        pdf_text += pdf_reader.pages[page].extract_text()

    if not pdf_text.strip():
        return jsonify({'error': 'Failed to extract text from the PDF'}), 400

    # Configure the API
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Use the extracted PDF text to generate questions
    questions = model.generate_content(f"Based on the following text, generate {no_of_questions} MCQ questions with difficulty {difficulty}. Give me JSON output. Text: {pdf_text[:2000]}...")  # Limiting text to 2000 chars for API input

    str = questions.text
    str = str.replace('```json', '')
    str = str.replace('```', '')
    str = str.strip()

    try:
        questions = json.loads(str)
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
