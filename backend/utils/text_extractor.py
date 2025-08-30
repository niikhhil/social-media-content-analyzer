import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io

def extract_text_from_pdf(file_stream):
    # Extracts text from a PDF file stream
    try:
        pdf_document = fitz.open(stream=file_stream.read(), filetype="pdf")
        text = ""
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error processing PDF: {e}")
        raise

def extract_text_from_image(file_stream):
    # Extracts text from an image file stream using OCR.
    try:
        image = Image.open(io.BytesIO(file_stream.read()))
        # Pre-processing: convert to grayscale for better OCR accuracy
        grayscale_image = image.convert('L')
        # Use Tesseract to do OCR on the image
        text = pytesseract.image_to_string(grayscale_image, config='--psm 3')
        return text
    except Exception as e:
        print(f"Error processing image with OCR: {e}")
        raise

def handle_file_upload(file):
    filename = file.filename
    file_extension = filename.rsplit('.', 1)[1].lower()

    if file_extension == 'pdf':
        return extract_text_from_pdf(file)
    elif file_extension in ['png', 'jpg', 'jpeg']:
        return extract_text_from_image(file)
    else:
        raise ValueError("Unsupported file type")
