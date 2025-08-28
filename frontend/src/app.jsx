import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalysis } from './hooks/useAnalysis'; // Corrected import path
import AnimatedHeader from './components/AnimatedHeader';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles.css';

function App() {
  const [theme, setTheme] = useState('light');
  
  // 2. Use the custom hook to get all state and handlers
  const {
    suggestions,
    isLoading,
    error,
    selectedFile,
    uploadSuccess,
    handleFileSelect,
    handleUpload,
  } = useAnalysis();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <div className="app-container">
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      <AnimatedHeader />
      <main>
        <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} disabled={isLoading} />
        
        <AnimatePresence>
          {selectedFile && !isLoading && (
            <motion.div
              className="upload-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.button 
                onClick={handleUpload} 
                className="upload-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload and Analyze
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && <Spinner />}
        
        <AnimatePresence>
          {uploadSuccess && !error && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              File analyzed successfully! Results below.
            </motion.div>
          )}
          {error && (
             <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {suggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
