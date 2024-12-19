import React, { useState } from "react";

const UploadModal = ({ onClose, onUpload, isMaxVideos }) => {
  const [link, setLink] = useState("");
  const [error, setError] = useState(""); // State for error messages

  // Validation function to check if the link is valid
  const isValidLink = (link) => {
    return link.trim() !== "" && link.startsWith("https://x.com/");
  };

  // Handle upload logic with validation
  const handleUpload = () => {
    if (isMaxVideos) {
      setError("10 video limit reached. Delete a video to upload a new one.");
      return;
    }

    if (isValidLink(link)) {
      onUpload(link);      // Call the upload function passed as a prop
      setLink("");         // Clear the input field after upload
      setError("");        // Clear any previous error message
      onClose();           // Close the modal
    } else {
      setError("Please enter a valid X.com link."); // Show an error message
    }
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();  // Prevent default form submission
      handleUpload();      // Reuse the same logic for upload
    }
  };

  // Handle the Upload button click
  const handleUploadClick = (e) => {
    e.preventDefault();    // Prevent default form submission
    handleUpload();        // Reuse the same logic for upload
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>Upload Video Link</h2>
      
      {/* Error message for max limit */}
      {isMaxVideos && (
        <div style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>
          You have reached the maximum limit of 10 videos. Please delete a video to upload a new one.
        </div>
      )}
      
      {/* Input field for video link */}
      <input
        type="text"
        placeholder="Enter Video URL (x.com)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyDown={handleKeyDown} // Reuse the keydown handler
        disabled={isMaxVideos} // Disable input if max limit is reached
        autoFocus
        style={{
          marginBottom: "10px",
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Error message for invalid link */}
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
      
      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleUploadClick} // Reuse the click handler
          disabled={isMaxVideos} // Disable upload button if max videos reached
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Upload
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
