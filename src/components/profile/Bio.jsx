import React, { useState } from "react";
import "../../styles/forms.css";

const Bio = ({ bio, onBioChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBio, setCurrentBio] = useState(bio);

  // Function to handle editing toggle
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  // Function to handle saving changes
  const saveChanges = () => {
    onBioChange(currentBio); // Pass updated bio to parent
    setIsEditing(false);
  };

  // Function to handle canceling changes
  const cancelChanges = () => {
    setCurrentBio(bio); // Revert to original bio
    setIsEditing(false);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setCurrentBio(e.target.value);
  };

  return (
    <div className="bio-section">
      {isEditing ? (
        <div className="bio-edit-container">
          <textarea
            className="bio-textarea"
            value={currentBio}
            onChange={handleInputChange}
            placeholder="Enter your bio here..."
            autoFocus
          />
          <div className="bio-buttons">
            <button className="save-button" onClick={saveChanges}>
              Save
            </button>
            <button className="cancel-button" onClick={cancelChanges}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bio-display" onClick={toggleEditing}>
          {bio || "Click to add your bio..."}
        </div>
      )}
    </div>
  );
};

export default Bio;
