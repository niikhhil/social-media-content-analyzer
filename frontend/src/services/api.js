import axios from 'axios';

const apiClient = axios.create({
  // Use the environment variable for the baseURL
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ... (keep the rest of your api.js file the same)

/**
 * Uploads a file to extract text.
 * @param {File} file The file to upload.
 * @returns {Promise<string>} A promise that resolves to the extracted text.
 */
export const extractText = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/extract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.extracted_text;
};

/**
 * Sends text to be analyzed for engagement suggestions.
 * @param {string} text The text to analyze.
 * @returns {Promise<string>} A promise that resolves to the suggestions.
 */
export const analyzeText = async (text) => {
  const response = await apiClient.post('/analyze', { text });
  return response.data.suggestions;
};
