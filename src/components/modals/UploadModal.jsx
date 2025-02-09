import React, { useState, useEffect } from "react";
import "../../styles/modals.css"; // Import modal styles
import "../../styles/forms.css"; // Import form styles
import PropTypes from 'prop-types';
import api from "../../api/client";

const UploadModal = ({ 
  onClose, 
  onSave, 
  initialData = {}, 
  fields = [], 
  title = 'Upload Video', 
  existingVideos = [],
  initialHashtags = [],
  isXPost,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    ...initialData,
    hashtags: initialData.hashtags || [] // Initialize as empty array
  });
  const [error] = useState("");
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
  const [isUploading, setIsUploading] = useState(false);
  const [localHashtags, setLocalHashtags] = useState(
    [...new Set([...initialHashtags, 'favorites'])] // Merge with default
  );

  // Add URL validation
  useEffect(() => {
    const isX = newPost.url.includes('twitter.com') || newPost.url.includes('x.com');
    setNewPost(prev => ({ ...prev, isXPost: isX }));
  }, [newPost.url]);

  // Handle input change
  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleHashtagAdd = (newTag) => {
    const cleanTag = newTag.replace(/#/g, '').trim().toLowerCase();
    if (cleanTag && !localHashtags.includes(cleanTag)) {
      setLocalHashtags(prev => [...prev, cleanTag]);
    }
  };

  const handleHashtagRemove = (tagToRemove) => {
    setLocalHashtags(prev => 
      prev.filter(tag => tag !== tagToRemove && tag !== 'favorites')
    );
  };

  // Update the regex pattern
  const urlPattern = /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/(\w+\/status\/\d+)/i;

  // Add debug logging to validateForm
  const validateForm = () => {
    const newErrors = {};
    
    if (!newPost.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!urlPattern.test(newPost.url)) {
      newErrors.url = 'Must be a valid X/Twitter post URL';
    }

    return newErrors;
  };

  // Add this helper function
  const checkForDuplicateHashtags = (hashtags) => {
    const hashtagCounts = {};
    const duplicates = [];
    
    hashtags.forEach(tag => {
      const cleanTag = tag.replace(/#/g, '').toLowerCase();
      hashtagCounts[cleanTag] = (hashtagCounts[cleanTag] || 0) + 1;
    });

    Object.entries(hashtagCounts).forEach(([tag, count]) => {
      if (count >= 3) {
        duplicates.push(`#${tag}`);
      }
    });

    return duplicates;
  };

  // Handle saving data
  const handleSave = async () => {
    const duplicateHashtags = checkForDuplicateHashtags(localHashtags);
    if (duplicateHashtags.length > 0) {
      setHashtagWarnings({
        message: `These hashtags have 3+ posts: ${duplicateHashtags.join(', ')}`,
        hashtags: duplicateHashtags
      });
      setReplacementMode(true);
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Ensure lowercase and no duplicates
    const userTags = localHashtags
      .map(tag => tag.replace(/#/g, '').trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    // Always include #favorites
    const finalTags = Array.from(new Set([...userTags, 'favorites']));
    
    const postData = {
      title: `Post ${Date.now()}`,
      url: newPost.url,
      description: formData.description,
      hashtags: finalTags, // Store without # prefix
      isXPost: newPost.url.includes('twitter.com') || newPost.url.includes('x.com')
    };

    console.log('Saving post with tags:', finalTags); // Debug log

    try {
      await api.savePost(postData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  // Add replacement handler
  const handleReplaceVideo = (videoId) => {
    setSelectedReplacement(videoId);
    // Actual replacement logic would go here
    setReplacementMode(false);
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
              onKeyPress={(e) => e.key === 'Enter' && handleHashtagAdd(e.target.value)}
            />
            <button onClick={() => handleHashtagAdd(inputHashtag)}>Add</button>
          </div>
          <div className="hashtag-container">
            {localHashtags.map(tag => (
              <span key={tag} className="hashtag">
                {tag}
                <button onClick={() => handleHashtagRemove(tag)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="modal-buttons">
          <button onClick={handleSave} className="upload-button">
            {isUploading ? 'Uploading...' : 'Upload'}
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
                v.hashtags.some(t => localHashtags.includes(t))
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
  title: PropTypes.string,
  initialHashtags: PropTypes.array,
  isXPost: PropTypes.bool,
  onSuccess: PropTypes.func.isRequired
};

export default UploadModal;
