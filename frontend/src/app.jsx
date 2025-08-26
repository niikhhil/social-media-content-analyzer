import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';
import './styles.css';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
    setExtractedText('');
    setSuggestions('');
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // --- Step 1: Extract Text ---
      const extractResponse = await axios.post('http://127.0.0.1:5000/api/extract', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      const text = extractResponse.data.extracted_text;
      setExtractedText(text);

      // --- Step 2: Analyze Text ---
      const analyzeResponse = await axios.post('http://127.0.0.1:5000/api/analyze', {
        text: text,
      });

      setSuggestions(analyzeResponse.data.suggestions);
      setUploadSuccess(true);
      setSelectedFile(null);

    } catch (err) {
      const errorMessage = err.response ? err.response.data.error : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Social Media Content Analyzer 🚀</h1>
        <p>Upload a document (PDF or image) to extract text and get engagement tips.</p>
      </header>
      <main>
        <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} disabled={isLoading} />
        
        {selectedFile && !isLoading && (
          <div className="upload-section">
            <button onClick={handleUpload} className="upload-btn">
              Upload and Analyze
            </button>
          </div>
        )}

        {isLoading && <Spinner />}
        {uploadSuccess && !error && <div className="success-message">File analyzed successfully! Results below.</div>}
        {error && <div className="error-message">{error}</div>}
        
        {(extractedText || suggestions) && (
          <ResultsDisplay 
            extractedText={extractedText} 
            suggestions={suggestions} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
