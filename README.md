# Social Media Content Analyzer 🚀

A web application that extracts text from uploaded documents (PDFs and images) and uses AI to generate suggestions for improving social media engagement.

**Live Application URL:** [Link to your deployed application]

---

## 📝 Project Overview

This project is a full-stack web application designed as a technical assessment for a Software Engineering position. The application allows users to upload a social media post as a PDF or an image file. The backend processes the document, extracts the text using PDF parsing or Optical Character Recognition (OCR), and then sends this text to the Google Gemini API for analysis. The frontend displays the AI-generated suggestions in a clean, modern, and interactive user interface.

## ✨ Key Features

-   **Drag-and-Drop File Upload:** Supports PDF and image files (`.png`, `.jpg`, `.jpeg`).
-   **Text Extraction:**
    -   **PDF Parsing:** Accurately extracts text from PDF documents.
    -   **OCR:** Uses Tesseract to extract text from images.
-   **AI-Powered Analysis:** Integrates with the Google Gemini API to provide actionable engagement suggestions.
-   **Modern UI/UX:**
    -   Sleek, responsive design with smooth animations.
    -   Light and dark theme switcher.
    -   Image previews before upload.
    -   Interactive loading states and feedback messages.
-   **Copy to Clipboard:** Easily copy the generated suggestions.

---

## 🛠️ Technology Stack

-   **Frontend:**
    -   React (with Vite)
    -   `axios` for API communication
    -   `react-dropzone` for file uploads
    -   `react-type-animation` for the header effect
    -   `react-markdown` to render formatted suggestions
    -   `framer-motion` for UI animations
-   **Backend:**
    -   Python (Flask)
    -   `PyMuPDF` for PDF parsing
    -   `Pytesseract` & `Pillow` for OCR
    -   `google-generativeai` for AI analysis
-   **Deployment:**
    -   **Frontend:** Vercel / Netlify
    -   **Backend:** Render / Heroku

---

## ⚙️ Setup and Installation

To run this project locally, you will need to have **Node.js**, **Python**, and the **Tesseract OCR Engine** installed on your machine.

### 1. Clone the Repository

```bash
git clone (https://github.com/niikhhil/social-media-content-analyzer.git)
cd social-media-content-analyzer
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
flask --app app --debug run
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev
```

---

## 🔑 Configuration

You will need to create `.env` files for both the frontend and backend to store your API keys and configuration variables.

### Backend (`backend/.env`)

```
GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
TESSERACT_CMD_PATH="C:\Program Files\Tesseract-OCR\tesseract.exe" # Update with your local Tesseract path
```

### Frontend (`frontend/.env.development`)

```
VITE_API_BASE_URL=[http://127.0.0.1:5000/api](http://127.0.0.1:5000/api)
```

---

## ✍️ Brief Write-up of Approach

For this project, I chose a decoupled client-server architecture using React for the frontend and Python/Flask for the backend. This separation allows for independent development and deployment, which is a modern and scalable approach.

The frontend was built with Vite for a fast development experience and focuses on providing a clean, interactive, and responsive user interface. I used `framer-motion` to add subtle animations that enhance the user experience, making the application feel more dynamic. State management was encapsulated into a custom hook (`useAnalysis`) to keep the main `App` component clean and focused on rendering.

The backend is a lightweight Flask API that handles the core logic. I created modular services for text extraction and AI analysis to ensure the code is organized and maintainable. For text extraction, the application intelligently differentiates between file types, using `PyMuPDF` for PDFs and Tesseract for images, which is a robust solution for handling varied document types. The integration with the Google Gemini API was designed to be easily configurable through environment variables, ensuring no sensitive keys are hardcoded. This approach results in a clean, functional, and production-ready application.

---

## 📬 Contact

-   **Name:** Nikhil Yadav
-   **Email:** nikhilyadav9305@gmail.com
