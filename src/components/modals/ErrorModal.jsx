import React from "react";
import "../../styles/modals.css"; // Import modal styles

const ErrorModal = ({ onClose, message }) => {
  return (
    <div className="modal-container">
      <h2 className="modal-title error-title">Error</h2>
      <p className="modal-message">{message}</p>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ErrorModal;
