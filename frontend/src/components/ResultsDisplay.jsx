import React from 'react';

function ResultsDisplay({ extractedText, suggestions }) {
  return (
    <div className="results-container">
      {suggestions && (
        <div className="result-section">
          <h2>Engagement Suggestions</h2>
          {/* Use a <pre> tag to preserve formatting from the API response */}
          <pre className="suggestions-box">{suggestions}</pre>
        </div>
      )}
      {extractedText && (
        <div className="result-section">
          <h2>Extracted Text</h2>
          <pre className="extracted-text-box">{extractedText}</pre>
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;
