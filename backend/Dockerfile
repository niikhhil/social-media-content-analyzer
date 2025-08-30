# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Update the package manager and install Tesseract OCR
RUN apt-get update && apt-get install -y tesseract-ocr

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application's code into the container
COPY . .

# Run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "app:app"]