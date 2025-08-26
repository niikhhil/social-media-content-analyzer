import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def analyze_text_with_gemini(text):
    """
    Analyzes the given text using the Gemini API to generate social media engagement suggestions.
    """
    try:
        # Configure the Gemini API with the key from the environment
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
        
        genai.configure(api_key=api_key)

        # Define the prompt for the model
        prompt = f"""
        Analyze the following social media post and provide 3-4 actionable suggestions to improve its engagement. 
        Focus on clarity, tone, calls-to-action, and use of hashtags. Format the output as a simple, easy-to-read list.

        Post:
        ---
        {text}
        ---

        Suggestions:
        """

        # --- THIS IS THE FIX ---
        # Use a current and supported model name
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        response = model.generate_content(prompt)

        return response.text

    except Exception as e:
        print(f"An error occurred with the Gemini API: {e}")
        # Return a user-friendly error message
        return "Sorry, the analysis could not be completed at this time."
