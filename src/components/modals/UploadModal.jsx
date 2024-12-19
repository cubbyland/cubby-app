import React, { useState } from "react";
import "../styles/modals.css"; // Import modal styles
import "../styles/forms.css"; // Import form styles

const UploadModal = ({ onClose, onUpload }) => {
  const [link, setLink] = useState("");
  const [error, setError] = useState(""); // State for error messages

  // Validation function to check if the link is valid
  const isValidLink = (link) => {
    return link.trim() !== "" && link.startsWith("https://x.com/");
  };

  // Handle upload logic with validation
  const handleUpload = () => {
    if (isValidLink(link)) {
      onUpload(link); // Call the upload function passed as a prop
      setLink(""); // Clear the input field after upload
      setError(""); // Clear any previous error message
      onClose(); // Close the modal
    } else {
      setError("Please enter a valid X.com link."); // Show an error message
    }
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleUpload(); // Reuse the same logic for upload
    }
  };

  return (
    <div className="modal-container">
      <h2 className="modal-title">Upload Video Link</h2>

      {/* Input field for video link */}
      <input
        type="text"
        placeholder="Enter Video URL (x.com)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="modal-input"
      />

      {/* Error message for invalid link */}
      {error && <div className="modal-error">{error}</div>}

      {/* Buttons */}
      <div className="modal-buttons">
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
