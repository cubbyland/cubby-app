import React from "react";
import "../../styles/forms.css";

const SocialLinks = ({ links = [], onAdd, onUpdate }) => {
  return (
    <div className="social-links-editor">
      {links.map((link, index) => (
        <div key={index} className="social-link-input">
          <input
            placeholder="Platform (e.g. Twitter)"
            value={link.platform}
            onChange={(e) => onUpdate(index, 'platform', e.target.value)}
          />
          <input
            placeholder="Profile URL"
            value={link.url}
            onChange={(e) => onUpdate(index, 'url', e.target.value)}
          />
          <button
            className="remove-link"
            onClick={() => onUpdate(index, 'remove')}
          >
            ×
          </button>
        </div>
      ))}
      <button className="add-link-button" onClick={onAdd}>
        + Add Social Link
      </button>
    </div>
  );
};

export default SocialLinks;
