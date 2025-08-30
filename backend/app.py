import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from dotenv import load_dotenv

# Import your custom utility functions
from utils.text_extractor import handle_file_upload
from utils.analyzer import analyze_content_with_gemini, analyze_image_with_gemini

# Load environment variables from the .env file
load_dotenv()

# Load the Tesseract path from the .env file for local development
tesseract_path = os.getenv("TESSERACT_CMD_PATH")
if tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = tesseract_path


# Initialize the Flask app
app = Flask(__name__)

# CORS Configuration for Production 
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",  # For local development
            "https://social-media-content-analyzer-h634h7v6m.vercel.app/" # Your deployed frontend URL
        ]
    }
})


# API Endpoints

@app.route('/api/extract', methods=['POST'])
def extract_text_endpoint():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    try:
        extracted_text = handle_file_upload(file)
        return jsonify({"extracted_text": extracted_text})
    except Exception as e:
        print(f"An unexpected error occurred during extraction: {e}")
        return jsonify({"error": f"An unexpected error occurred during extraction: {e}"}), 500


@app.route('/api/analyze', methods=['POST'])
def analyze_content_endpoint():
    if 'file' in request.files:
        text = request.form.get('text', '')
        file = request.files['file']
        if len(text.strip()) < 20:
            try:
                suggestions = analyze_image_with_gemini(file, text)
                return jsonify({"suggestions": suggestions})
            except Exception as e:
                print(f"An error occurred with the Gemini API (image analysis): {e}")
                return jsonify({"error": f"An error occurred with the Gemini API: {e}"}), 500
        else:
            try:
                suggestions = analyze_content_with_gemini(text)
                return jsonify({"suggestions": suggestions})
            except Exception as e:
                print(f"An error occurred with the Gemini API (text analysis): {e}")
                return jsonify({"error": f"An error occurred with the Gemini API: {e}"}), 500
    else:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "Missing text in request body"}), 400
        text = data['text']
        try:
            suggestions = analyze_content_with_gemini(text)
            return jsonify({"suggestions": suggestions})
        except Exception as e:
            print(f"An error occurred with the Gemini API (JSON request): {e}")
            return jsonify({"error": f"An error occurred with the Gemini API: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)

