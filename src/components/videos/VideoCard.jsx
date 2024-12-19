import React, { useState } from "react";
import "../styles/videos.css"; // Import the styles for videos

const VideoCard = ({ title, url, description, onPin, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false); // Hover state for card
  const [showConfirm, setShowConfirm] = useState(false); // State for delete confirmation modal

  // Handle delete action
  const handleDelete = () => {
    onDelete(); // Call the parent-provided onDelete function
    setShowConfirm(false); // Close the confirmation modal
  };

  return (
    <div
      className={`video-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)} // Highlight card on hover
      onMouseLeave={() => setIsHovered(false)} // Remove highlight
    >
      {/* Video Title */}
      <h3 className="video-title">{title}</h3>

      {/* Video Description */}
      <p className="video-description">{description}</p>

      {/* Link to watch the video */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="video-link"
      >
        Watch Video
      </a>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this video?</p>
          <button className="confirm-button" onClick={handleDelete}>
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowConfirm(false)} // Close the modal without deleting
          >
            Cancel
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="video-buttons">
        {/* Delete Button */}
        <button
          className="delete-button"
          onClick={() => setShowConfirm(true)} // Show confirmation modal
        >
          Delete
        </button>

        {/* Pin Button */}
        <button className="pin-button" onClick={onPin}>
          Pin
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
