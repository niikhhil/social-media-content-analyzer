import os
import google.generativeai as genai
from PIL import Image

# Configure the Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_text(text):

    try:
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        prompt = f"""
        Analyze the following social media post text and provide actionable suggestions to improve engagement.

        **Post Text:**
        "{text}"

        **Analysis Required:**
        Provide a concise, easy-to-read analysis. Format the output using Markdown with the following structure:
        - **Overall Vibe:** A brief, one-sentence description of the post's tone and feel.
        - **Engagement Suggestions:** A bulleted list of 3 specific, actionable tips to increase likes, comments, and shares.
        - **Example Rewrite:** A revised version of the post incorporating your suggestions.
        """

        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"An error occurred with the Gemini API (Text): {e}")
        # Return a user-friendly error message
        return "Error: Could not analyze the text. The AI service may be temporarily unavailable."

def analyze_image(image_data):
    """
    This is used when OCR fails to produce meaningful text.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        image_for_api = Image.open(image_data)

        prompt = """
        The text extraction (OCR) for this social media post image failed, likely because the image has no text or the text is highly stylized/blurry. 
        Please analyze the image directly.

        **Analysis Required:**
        Based on the visual content of the image, provide creative suggestions for a social media post that would accompany it. Format the output using Markdown with the following structure:
        - **Image Description:** A brief, one-sentence description of what's happening in the image.
        - **Engagement Suggestions:** A bulleted list of 3 specific, actionable ideas for a caption or post to increase engagement.
        - **Example Post:** A sample post (including a caption and relevant hashtags) that could be used with this image.
        """

        response = model.generate_content([prompt, image_for_api])
        return response.text
    except Exception as e:
        print(f"An error occurred with the Gemini API (Image): {e}")
        return "Error: Could not analyze the image. The AI service may be temporarily unavailable."
