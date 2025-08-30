import { useState } from 'react';
import { extractText, analyzeContent } from '../services/api';

export const useAnalysis = () => {
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
    setSuggestions('');
    
    // Create image preview if the file is an image
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');
    setSuggestions('');

    try {
      // Step 1: Extract text from the file
      const extractResponse = await extractText(selectedFile);
      const text = extractResponse.extracted_text;
      
      // Step 2: Send the extracted text AND the original file for analysis
      const analyzeResponse = await analyzeContent(text, selectedFile);

      setSuggestions(analyzeResponse.suggestions);

    } catch (err) {
      const errorMessage = err.response ? err.response.data.error : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestions,
    isLoading,
    error,
    selectedFile,
    imagePreview,
    handleFileSelect,
    handleUpload,
  };
};
