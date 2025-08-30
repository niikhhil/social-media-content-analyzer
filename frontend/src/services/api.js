import axios from 'axios';

// Use the environment variable for the baseURL, fallback to localhost for development
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api',
});

export const extractText = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/extract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeContent = async (text, file) => {
  const formData = new FormData();
  formData.append('text', text);
  // Only append the file if it exists (it will be null for PDFs)
  if (file) {
    formData.append('file', file);
  }

  const response = await apiClient.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
