import { useState } from 'react';
import { extractText, analyzeText } from '../services/api';

export const useAnalysis = () => {
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
    setSuggestions('');
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');
    setSuggestions('');
    setUploadSuccess(false);

    try {
      const textToAnalyze = await extractText(selectedFile);
      const analysisSuggestions = await analyzeText(textToAnalyze);

      setSuggestions(analysisSuggestions);
      setUploadSuccess(true);
      setSelectedFile(null);
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
    uploadSuccess,
    handleFileSelect,
    handleUpload,
  };
};
