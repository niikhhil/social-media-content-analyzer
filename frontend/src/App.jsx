import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

// Import Custom Hook & Components
import { useAnalysis } from './hooks/useAnalysis';
import LandingPage from './components/LandingPage';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';

// Import Styles
import './styles.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [theme, setTheme] = useState('light');
  
  const {
    suggestions,
    isLoading,
    error,
    selectedFile,
    imagePreview,
    handleFileSelect,
    handleUpload,
  } = useAnalysis();

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const showApp = () => {
    setCurrentView('app');
  };

  if (currentView === 'landing') {
    return (
      <>
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <LandingPage onTryNow={showApp} />
      </>
    );
  }

  return (
    <div className="app-container">
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      
      <header className="app-header">
        <img src="/logo.png" alt="App Logo" className="app-logo" />
        <h1 className="animated-title">
            <TypeAnimation
                sequence={[
                    '',
                    500,
                    'Social Media Content Analyzer'
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block' }}
                repeat={0}
            />
        </h1>
        <p className="subtitle">
          Upload a document (PDF or image) to get engagement tips.
        </p>
      </header>

      <main>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FileUpload 
                onFileSelect={handleFileSelect} 
                selectedFile={selectedFile} 
                disabled={isLoading}
                imagePreview={imagePreview}
            />
        </motion.div>
        
        {selectedFile && !isLoading && (
          <div className="upload-section">
            <button onClick={handleUpload} className="upload-btn" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Upload and Analyze'}
            </button>
          </div>
        )}

        {isLoading && <Spinner />}
        {error && <div className="error-message">{error}</div>}
        
        <AnimatePresence>
            {(suggestions) && (
                 <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 0.8 }}
                    className="results-container"
                >
                    <ResultsDisplay 
                        suggestions={suggestions} 
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;

