from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from dotenv import load_dotenv
 # Assuming this is the function that interacts with Gemini SDK
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
    # Get the API key from environment variables
    # api_key = os.getenv("GEMINI_API_KEY")  # Assuming GEMINI_API_KEY is set in your environment
    
    # Configure the API key properly
    genai.configure(api_key="")
    
    # The rest of your code follows as normal...
    prompt = f"Generate {no_q} MCQs on {topic} with {difficulty} difficulty."
    
    # Start chat and generate response using the Gemini model
    model = genai.GenerativeModel(model_name="gemini-1.0-pro")
    convo = model.start_chat(history=[])
    response = convo.send_message(prompt)

    # Assuming the response contains generated MCQs
    mcqs = response.text

    return mcqs, None  # Return generated MCQs

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

    return jsonify(mcqs)

if __name__ == '__main__':
    app.run(debug=True)
