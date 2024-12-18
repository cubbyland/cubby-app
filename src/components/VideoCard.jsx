import React, { useState } from "react";

const VideoCard = ({ title, url, description, onPin, onDelete }) => {
  const  [isHovered, setIsHovered] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); 

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        Watch Video
      </a>


      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: "100",
          }}
        >
          <p>Are you sure you want to delete this video?</p>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            onClick={() => onDelete()} // Confirm delete
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "#ccc",
              color: "black",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => setShowConfirm(false)} // Cancel
          >
            Cancel
          </button>
        </div>
      )}

      <div style={{ marginTop: "10px" }}> 
        <button
          onClick={onPin} // Pin button calls the onPin function
          style={{
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#f0ad4e",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClickCapture={() => setShowConfirm(true)} // Show confirmation modal
        >
          Delete
        </button>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "5px",
            marginTop: "5px",
          }}
          onClick={onPin}
        >
          Pin
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
