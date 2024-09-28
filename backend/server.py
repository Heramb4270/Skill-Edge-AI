from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from dotenv import load_dotenv
import json
import os

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

@app.route('/')
def hello_world():
    return 'Server is running!'

# Function to use Gemini SDK to generate MCQs
def generate_mcqs_with_gemini(topic, no_q, difficulty):
    # Configure the API key properly
    api_key = "AIzaSyCOdDy6L2bW8t4a1zTBC8RXSJ6g32WG5kg"  # Ensure the API key is set in the environment
    if not api_key:
        return None, "API key is missing or not set."
    
    genai.configure(api_key=api_key)
    
    # The prompt for the Gemini API
    prompt = f"""Generate {no_q} MCQs on {topic} with {difficulty} difficulty. I want the JSON output in this format: {{
    "total_marks": 100,
    "optained_marks": 80,
    "questions": [
        {{
            "qno": "Q.1) A",
            "question": "What is Operating System?",
            "student_answer": "The Operating System is core of the System",
            "correct_answer": "Operating System is a software that acts as an interface between user and hardware.",
            "total_marks": 10,
            "optained_marks": 5,
            "remarks": "Missing some points like not mentioning it is a system software or interface between user and hardware"
        }},
        {{
            "qno": "Q.1) B",
            "question": "Select a Mobile  Operating System.",
            "student_answer": "Windows, Linux, Unix, Mac",
            "correct_answer": "Android,",
            "total_marks": 10,
            "optained_marks": 10,
            "remarks": "Correct"
        }}
    ]
}}"""
    
    # Generate response using the Gemini model
    model = genai.GenerativeModel(model_name="gemini-1.0-pro")
    convo = model.start_chat(history=[])
    
    try:
        response = convo.send_message(prompt)
    except Exception as e:
        return None, f"Error communicating with the API: {str(e)}"

    # Log the raw response object for debugging
    print(f"Response Object: {response}")
    print(f"Response Text: {response.text}")  # Log the raw text
    
    return response.text, None
    
@app.route('/generate-mcqs', methods=['POST'])
def generate_mcqs():
    data = request.get_json()
    topic = data['topic']
    no_q = data['no_q']
    difficulty = data['difficulty']

    # Call the function to generate MCQs with the Gemini SDK
    mcqs, error = generate_mcqs_with_gemini(topic, no_q, difficulty)

    if error:
        return jsonify({"error": error}), 500

    return jsonify(mcqs)  # Return the properly formatted JSON response

if __name__ == '__main__':
    app.run(debug=True)
