import React, { useState } from "react";
import "../../styles/forms.css";

const Bio = ({ bio, onBioChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBio, setCurrentBio] = useState(bio);

  // Toggle the editing state
  const toggleEditing = () => {
    setIsEditing(true);
  };

  // Save the bio changes
  const saveChanges = () => {
    onBioChange(currentBio.trim()); // Save trimmed bio
    setIsEditing(false);
  };

  // Cancel the bio editing
  const cancelChanges = () => {
    setCurrentBio(bio); // Revert to the original bio
    setIsEditing(false);
  };

  // Handle bio input changes
  const handleInputChange = (e) => {
    setCurrentBio(e.target.value);
  };

  // Render the bio input field if editing
  const renderBioEditor = () => (
    <div className="bio-edit-container">
      <textarea
        className="bio-textarea"
        value={currentBio}
        onChange={handleInputChange}
        placeholder="Enter your bio here..." // Only shown when the textarea is empty
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
  );

  // Render the bio display if not editing
  const renderBioDisplay = () => (
    <div
      className="bio-display"
      onClick={toggleEditing}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleEditing();
      }}
    >
      {bio || <span className="placeholder">Click to add your bio...</span>}
    </div>
  );

  return <div className="bio-section">{isEditing ? renderBioEditor() : renderBioDisplay()}</div>;
};

export default Bio;
