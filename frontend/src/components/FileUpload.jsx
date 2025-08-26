import React from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ onFileSelect, selectedFile, disabled }) {
  const onDrop = React.useCallback((acceptedFiles) => {
    // We only process the first file if multiple are dropped
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  // useDropzone hook provides props for the dropzone element
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // Define accepted file types
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
    multiple: false, // Don't allow multiple files
    disabled: disabled, // Disable dropzone when loading
  });

  return (
    // Spread the props from the hook onto the div
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
      {/* The input element is hidden but necessary for the file dialog */}
      <input {...getInputProps()} />
      {
        // Conditionally render text based on whether a file is selected or being dragged over
        selectedFile ? (
          <p>Selected file: <span className="file-info">{selectedFile.name}</span></p>
        ) : isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select a file</p>
        )
      }
      <em>(Only *.jpeg, *.png, and *.pdf files will be accepted)</em>
    </div>
  );
}

export default FileUpload;
