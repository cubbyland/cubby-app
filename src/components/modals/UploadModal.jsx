import React, { useState, useEffect } from "react";
import "../../styles/modals.css"; // Import modal styles
import "../../styles/forms.css"; // Import form styles
import PropTypes from 'prop-types';

const UploadModal = ({ 
  onClose, 
  onSave, 
  initialData = {}, 
  fields = [], 
  title = 'Upload Video', 
  existingVideos = [] 
}) => {
  const [formData, setFormData] = useState({
    ...initialData,
    hashtags: initialData.hashtags || [] // Initialize as empty array
  });
  const [error, setError] = useState("");
  const [inputHashtag, setInputHashtag] = useState("");
  const [hashtagWarnings, setHashtagWarnings] = useState({});
  const [replacementMode, setReplacementMode] = useState(false);
  const [selectedReplacement, setSelectedReplacement] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    url: '',
    description: '',
    hashtags: [],
    isXPost: false
  });
  const [errors, setErrors] = useState({});

  // Add URL validation
  useEffect(() => {
    const isX = newPost.url.includes('twitter.com') || newPost.url.includes('x.com');
    setNewPost(prev => ({ ...prev, isXPost: isX }));
  }, [newPost.url]);

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

  const handleAddHashtag = () => {
    const hashtag = inputHashtag.trim().replace(/#/g, '');
    if (hashtag && !formData.hashtags.includes(`#${hashtag}`)) {
      setFormData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, `#${hashtag}`]
      }));
      setInputHashtag('');
    }
  };

  const removeHashtag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Update the regex pattern
  const urlPattern = /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/(\w+\/status\/\d+)/i;

  // Add debug logging to validateForm
  const validateForm = () => {
    const newErrors = {};
    
    console.log('Validating URL:', newPost.url);
    console.log('Validating Title:', newPost.title);

    // Auto-generate title from URL if empty
    if (!newPost.title.trim()) {
      const usernameMatch = newPost.url.match(/\/([^\/]+)\/status\/\d+/);
      const autoTitle = usernameMatch 
        ? `Post by @${usernameMatch[1]}`
        : 'Social Media Post';
      
      setNewPost(prev => ({
        ...prev,
        title: autoTitle
      }));
    }

    // URL validation remains
    if (!newPost.url) {
      newErrors.url = 'URL is required';
    } else if (!urlPattern.test(newPost.url)) {
      newErrors.url = 'Must be a valid X/Twitter post URL';
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle saving data
  const handleSave = () => {
    const finalHashtags = [
      ...newPost.hashtags.filter(t => t !== '#favorites'),
      '#favorites'
    ];

    onSave({
      ...newPost,
      id: `post-${Date.now()}`,
      hashtags: [...new Set(finalHashtags)],
      isXPost: true
    });
    onClose();
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleSave(); // Reuse the save logic
    }
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal" onKeyDown={(e) => e.key === 'Enter' && handleSave()}>
        <h3>Post to Your Cubby</h3>
        
        {/* X URL Input Section */}
        <div className="form-group x-url-section">
          <label>X (Twitter) Post URL:</label>
          <input
            type="url"
            placeholder="https://x.com/username/status/12345..."
            value={newPost.url}
            onChange={(e) => setNewPost(prev => ({ ...prev, url: e.target.value }))}
            className={`x-url-input ${errors.url ? 'error' : ''}`}
          />
          {errors.url && <div className="error-message">{errors.url}</div>}
        </div>

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

        <div className="hashtag-section">
          <div className="hashtag-input">
            <input
              type="text"
              placeholder="Add hashtag..."
              value={inputHashtag}
              onChange={(e) => setInputHashtag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
            />
            <button onClick={handleAddHashtag}>Add</button>
          </div>
          <div className="hashtag-container">
            {formData.hashtags.map(tag => (
              <span key={tag} className="hashtag">
                {tag}
                <button onClick={() => removeHashtag(tag)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="modal-buttons">
          <button onClick={handleSave} className="upload-button">
            Upload
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>

        {/* Replacement interface */}
        {replacementMode && (
          <div className="replacement-interface">
            <h4>{hashtagWarnings.message}</h4>
            <div className="replacement-list">
              {existingVideos.filter(v => 
                v.hashtags.some(t => finalHashtags.includes(t))
              ).map(video => (
                <div 
                  key={video.id}
                  className={`replacement-item ${selectedReplacement === video.id ? 'selected' : ''}`}
                  onClick={() => setSelectedReplacement(video.id)}
                >
                  <span>{video.title}</span>
                  <button onClick={() => handleReplaceVideo(video.id)}>Replace</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  existingVideos: PropTypes.array,
  initialData: PropTypes.object,
  fields: PropTypes.array,
  title: PropTypes.string
};

export default UploadModal;
