import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io

def extract_text_from_pdf(file_stream):
    """Extracts text from a PDF file stream."""
    text = ""
    try:
        pdf_bytes = file_stream.read()
        pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        pdf_document.close()
    except Exception as e:
        print(f"Error processing PDF: {e}")
        raise ValueError("Could not process the PDF file.")
    return text

def extract_text_from_image(file_stream):
    """
    Pre-processes an image and then extracts text using OCR for better accuracy.
    """
    try:
        image_bytes = file_stream.read()
        image = Image.open(io.BytesIO(image_bytes))

        # --- THIS IS THE FIX ---
        # 1. Pre-process the image: Convert to grayscale
        processed_image = image.convert('L')

        # 2. Use the most versatile Page Segmentation Mode (PSM)
        # PSM 3 is the default and fully automatic, which is best for varied layouts.
        custom_config = r'--psm 3'
        
        # 3. Perform OCR on the processed image
        text = pytesseract.image_to_string(processed_image, config=custom_config)
    except Exception as e:
        print(f"Error processing image with OCR: {e}")
        raise ValueError("Could not process the image file.")
    return text

def extract_text_from_file(file):
    """
    Extracts text from a file by determining its type and calling the
    appropriate extraction function.
    """
    file_extension = file.filename.rsplit('.', 1)[1].lower()
    
    if file_extension == 'pdf':
        return extract_text_from_pdf(file.stream)
    elif file_extension in {'png', 'jpg', 'jpeg'}:
        return extract_text_from_image(file.stream)
    else:
        raise ValueError("Unsupported file type.")
