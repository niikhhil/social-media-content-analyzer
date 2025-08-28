import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ResultsDisplay({ suggestions }) {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestions).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
    }, () => {
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="results-container">
      {suggestions && (
        <div className="result-section">
          <div className="result-header">
            <h2>Engagement Suggestions</h2>
            <button onClick={handleCopy} className="copy-btn">
              {copySuccess || 'Copy'}
            </button>
          </div>
          <div className="suggestions-box">
            <ReactMarkdown>{suggestions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;
