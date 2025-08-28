import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

function FileUpload({ onFileSelect, selectedFile, disabled, imagePreview }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
    multiple: false,
    disabled: disabled,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
        <input {...getInputProps()} />
        {imagePreview ? (
          <div className="preview-container">
            <img src={imagePreview} alt="Selected preview" className="image-preview" />
            <p>File: <span className="file-info">{selectedFile.name}</span></p>
          </div>
        ) : selectedFile ? (
          <p>File: <span className="file-info">{selectedFile.name}</span></p>
        ) : isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select a file</p>
        )}
        <em>(Only *.jpeg, *.png, and *.pdf files will be accepted)</em>
      </div>
    </motion.div>
  );
}

export default FileUpload;
