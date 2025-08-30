import os
import pytesseract
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from utils.text_extractor import extract_text_from_file
from utils.analyzer import analyze_text, analyze_image

# Load environment variables from .env file
load_dotenv()

# Load the Tesseract path from the .env file if it exists
tesseract_path = os.getenv("TESSERACT_CMD_PATH")
if tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = tesseract_path

app = Flask(__name__)
CORS(app)

@app.route('/api/extract', methods=['POST'])
def extract_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    try:
        text = extract_text_from_file(file)
        return jsonify({"extracted_text": text}), 200
    except Exception as e:
        error_message = f"An unexpected error occurred during extraction: {e}"
        print(error_message)
        return jsonify({"error": error_message}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_route():
    # Check if the post is text-based or if it's an image fallback
    text = request.form.get('text', '')
    file = request.files.get('file')

    # Define a threshold for what we consider "bad" OCR
    OCR_THRESHOLD = 20 

    try:
        # If the text is very short AND a file is provided, use image analysis
        if len(text.strip()) < OCR_THRESHOLD and file:
            print("OCR text is short. Switching to image analysis.")
            # We need to pass the file stream/data to the analyzer
            image_data = file.stream
            suggestions = analyze_image(image_data)
        # Otherwise, proceed with text analysis
        else:
            print("Proceeding with text analysis.")
            suggestions = analyze_text(text)
        
        return jsonify({"suggestions": suggestions}), 200
    except Exception as e:
        error_message = f"An error occurred during analysis: {e}"
        print(error_message)
        return jsonify({"error": error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)
