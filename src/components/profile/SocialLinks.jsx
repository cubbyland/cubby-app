import React from "react";
import "../../styles/forms.css";

const SocialLinks = ({ socialLinks, onSocialLinkChange }) => {
  return (
    <div className="social-links-section">
      {Object.keys(socialLinks).map((platform) => (
        <div key={platform} className="social-link">
          <input
            type="text"
            placeholder={`Enter your ${platform} link`}
            value={socialLinks[platform]}
            onChange={(e) => onSocialLinkChange(platform, e.target.value)}
          />
          {socialLinks[platform] && (
            <a
              href={socialLinks[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${platform}`}
            >
              {platform}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
