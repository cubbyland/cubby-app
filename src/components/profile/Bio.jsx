import React, { useState } from "react";
import "../../styles/forms.css";

const Bio = ({ bio, onBioChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bio-section">
      <textarea
        className="bio-textarea"
        value={isFocused ? bio : ""}
        placeholder={!isFocused ? "Enter your bio here..." : ""}
        onChange={(e) => onBioChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(bio.trim() !== "")}
      />
    </div>
  );
};

export default Bio;
