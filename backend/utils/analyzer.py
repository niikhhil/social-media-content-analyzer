import os
import google.generativeai as genai
from PIL import Image
import io

# Configure the Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")
genai.configure(api_key=api_key)

# --- Text Analysis Function ---
def analyze_content_with_gemini(text):
    """
    Analyzes text using the Gemini API and returns engagement suggestions.
    """
    if not text or not text.strip():
        return "No text provided for analysis."

    # CORRECTED MODEL NAME
    model = genai.GenerativeModel('gemini-2.5-pro')
    
    prompt = f"""
    Analyze the following social media post text and provide actionable suggestions to improve its engagement. 
    Format the response in Markdown with clear headings.

    The response should include:
    - **Overall Sentiment:** (e.g., Positive, Neutral, Negative)
    - **Readability Score:** (e.g., Easy to read, Moderate, Difficult)
    - **Engagement Suggestions:** (Provide 3-4 specific, bulleted points for improvement, like adding a call-to-action, using emojis, or asking a question).

    Post Text:
    ---
    {text}
    ---
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"An error occurred with the Gemini API: {e}")
        raise

# --- Image Analysis Function ---
def analyze_image_with_gemini(file_stream, ocr_text=""):
    """
    Analyzes an image using the Gemini API and returns engagement suggestions.
    """
    
    # CORRECTED MODEL NAME
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    try:
        # Prepare the image for the API
        image_bytes = file_stream.read()
        img = Image.open(io.BytesIO(image_bytes))

        prompt = [
            "Analyze this social media post image. The OCR text is either missing or of very poor quality.",
            "Provide actionable suggestions to improve the post's engagement based on the visual content and any recognizable text.",
            "Format the response in Markdown with clear headings.",
            "The response should include:",
            "- **Visual Analysis:** (Briefly describe what you see in the image).",
            "- **Engagement Suggestions:** (Provide 3-4 specific, bulleted points for improvement based on the image content).",
            "Here is the low-quality OCR text for context (if any): " + ocr_text,
            img
        ]
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"An error occurred with the Gemini API during image analysis: {e}")
        raise
