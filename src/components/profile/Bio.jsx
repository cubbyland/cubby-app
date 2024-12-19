import React, { useState } from "react";
import "../../styles/forms.css";

const Bio = ({ bio, onBioChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(bio);

  const handleSave = () => {
    onBioChange(tempBio);
    setIsModalOpen(false);
  };

  return (
    <div className="bio-section">
      <p className="bio-text">{bio || "No bio available."}</p>
      <button className="edit-bio-button" onClick={() => setIsModalOpen(true)}>
        Edit
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Bio</h3>
            <textarea
              className="bio-textarea-large"
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
            />
            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
