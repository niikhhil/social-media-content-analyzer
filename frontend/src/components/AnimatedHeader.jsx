import React from 'react';
import { TypeAnimation } from 'react-type-animation';

function AnimatedHeader() {
  return (
    <header className="app-header">
      <img src="/logo.png" alt="App Logo" className="app-logo" />
      <h1 className="animated-title">
        <TypeAnimation
          sequence={[
            'Social Media Content Analyzer', // The text will be typed once
          ]}
          wrapper="span"
          speed={50}
          cursor={true} // The cursor will remain after typing
          // The repeat={Infinity} prop has been removed
        />
      </h1>
      <p>Upload a document (PDF or image) to extract text and get engagement tips.</p>
    </header>
  );
}

export default AnimatedHeader;
