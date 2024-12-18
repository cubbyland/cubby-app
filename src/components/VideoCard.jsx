import React from "react";

const VideoCard = ({ title, url, onPin, onDelete }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        Watch Video
      </a>
      <br />
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
          onClick={onDelete}
        >
          Pin
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
