import React, { useState } from "react";
import "../../styles/modals.css"; // Import modal styles
import "../../styles/forms.css"; // Import form styles

const UploadModal = ({ onClose, onSave, initialData = {}, fields, title }) => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  // Validation function for inputs (if needed for specific fields)
  const isValidField = (value, fieldName) => {
    if (fieldName === "url") {
      return value.trim() !== "" && value.startsWith("https://");
    }
    return value.trim() !== "";
  };

  // Handle input change
  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  // Handle saving data
  const handleSave = () => {
    const invalidField = fields.find(
      (field) => !isValidField(formData[field.name] || "", field.name)
    );

    if (invalidField) {
      setError(`Please enter a valid ${invalidField.placeholder.toLowerCase()}.`);
    } else {
      onSave(formData); // Call the save function passed as a prop
      setFormData({}); // Clear the form data after saving
      setError(""); // Clear any previous error message
      onClose(); // Close the modal
    }
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleSave(); // Reuse the save logic
    }
  };

  return (
    <div className="modal-container">
      <h2 className="modal-title">{title}</h2>

      {/* Dynamic input fields */}
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={(e) => handleInputChange(e, field.name)}
          onKeyDown={handleKeyDown}
          autoFocus={field.autoFocus || false}
          className="modal-input"
        />
      ))}

      {/* Error message */}
      {error && <div className="modal-error">{error}</div>}

      {/* Buttons */}
      <div className="modal-buttons">
        <button className="upload-button" onClick={handleSave}>
          Save
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
