import React, { useState } from "react";

const UploadModal = ({ onClose, onUpload }) => {
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const handleUpload = () => {
    const isValidXURL = videoURL.startsWith("https://x.com/");
    if (!isValidXURL) {
      setError("Only URLs from https://x.com/ are allowed.");
      return;
    }

    // Clear error and upload the URL
    setError("");
    onUpload(videoURL);
    setVideoURL("");
    onClose(); // Close the modal
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && link.trim() !== "") {
      onUpload(link);
      setLink(""); // Clear input after upload
      onClose();
    }
  };
  
  const handleUploadClick = () => {
    if (link.trim() !== "") {
      onUpload(link);
      setLink(""); // Clear input after upload
      onClose();
    }
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
      <input
        type="text"
        placeholder="Enter Video URL (x.com)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          marginBottom: "10px",
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleUploadClick}
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
