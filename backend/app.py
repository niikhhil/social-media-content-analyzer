from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.text_extractor import extract_text_from_file
from utils.analyzer import analyze_text_with_gemini # Import the new analyzer function
import pytesseract

# --- Tesseract Path Configuration ---
# Update this path to where you installed Tesseract OCR on your local machine.
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# ------------------------------------

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    """Checks if the file's extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/extract', methods=['POST'])
def extract_text():
    """Endpoint to handle file uploads and extract text."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    if not file or not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type."}), 400
        
    try:
        extracted_text = extract_text_from_file(file)
        if not extracted_text.strip():
             return jsonify({"error": "Could not extract any text from the document."}), 400
        return jsonify({"extracted_text": extracted_text}), 200
    except Exception as e:
        print(f"An unexpected error occurred during extraction: {e}")
        return jsonify({"error": "An error occurred while processing the file."}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_text_endpoint():
    """
    New endpoint to receive text and return engagement suggestions from Gemini.
    """
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided for analysis."}), 400

    text_to_analyze = data['text']
    
    try:
        suggestions = analyze_text_with_gemini(text_to_analyze)
        return jsonify({"suggestions": suggestions}), 200
    except Exception as e:
        print(f"An unexpected error occurred during analysis: {e}")
        return jsonify({"error": "An error occurred during analysis."}), 500

if __name__ == '__main__':
    app.run(debug=True)
