import React from "react";
import "../../styles/forms.css";

const SocialLinks = ({ socialLinks, onEditSocialLink }) => {
  return (
    <div className="social-links-section">
      {Object.keys(socialLinks).map((platform) => (
        <div key={platform} className="social-link">
          <span className="social-platform">{platform}:</span>
          {socialLinks[platform] ? (
            <a
              href={socialLinks[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${platform}`}
            >
              {socialLinks[platform]}
            </a>
          ) : (
            <span className="social-placeholder">No link added</span>
          )}
          <button
            className="edit-link-button"
            onClick={() => onEditSocialLink(platform)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
