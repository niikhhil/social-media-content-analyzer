import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io

def extract_text_from_pdf(file_stream):
    """Extracts text from a PDF file stream."""
    text = ""
    try:
        # Read the entire file stream into a bytes object first
        pdf_bytes = file_stream.read()
        
        # Now, open the PDF from the bytes object
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
    """Extracts text from an image file stream using OCR."""
    try:
        # Read the stream into an in-memory bytes buffer
        image_bytes = file_stream.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # --- THIS IS THE FIX ---
        # PSM 4 assumes a single column of text of variable sizes.
        # This can be more effective for images with distinct text blocks.
        custom_config = r'--psm 4'
        
        # Use Tesseract to extract text from the image with the new config
        text = pytesseract.image_to_string(image, config=custom_config)
    except Exception as e:
        print(f"Error processing image with OCR: {e}")
        raise ValueError("Could not process the image file.")
    return text

def extract_text_from_file(file):
    """
    Extracts text from a file by determining its type (PDF or image)
    and calling the appropriate extraction function.
    """
    file_extension = file.filename.rsplit('.', 1)[1].lower()
    
    if file_extension == 'pdf':
        return extract_text_from_pdf(file.stream)
    elif file_extension in {'png', 'jpg', 'jpeg'}:
        return extract_text_from_image(file.stream)
    else:
        raise ValueError("Unsupported file type.")

