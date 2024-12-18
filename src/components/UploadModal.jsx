import React, { useRef, useEffect, useState } from "react";

const UploadModal = ({ onClose, onUpload }) => {
  const [link, setLink] = useState("");
  const inputRef = useRef(null); // Reference for the input field

  // Focus the input when the modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onUpload(link);
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Upload Video Link</h2>
        <input
          ref={inputRef} // Attach the ref to the input field
          type="text"
          placeholder="Paste link here..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger upload on "Enter" key
          style={styles.input}
        />
        <button onClick={() => { onUpload(link); onClose(); }} style={styles.button}>
          Upload
        </button>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

// Styling for the modal
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "8px 12px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeButton: {
    backgroundColor: "red",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UploadModal;
