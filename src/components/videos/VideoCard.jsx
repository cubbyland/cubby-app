import React, { useState } from "react";
import "../../styles/videos.css";

const VideoCard = ({ title, url, description, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(); // Calls the parent-provided onDelete function
    setShowConfirm(false); // Close the confirmation modal
  };

  return (
    <div className="video-card">
      <h3 className="video-title">{title}</h3>
      <p className="video-description">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="watch-video-link"
      >
        Watch Video
      </a>

      {showConfirm && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this video?</p>
          <button className="confirm-button" onClick={handleDelete}>
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <button
        className="delete-button"
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </button>
    </div>
  );
};

export default VideoCard;
