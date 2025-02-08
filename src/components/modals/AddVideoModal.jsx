import { useState, useContext } from 'react';
import Modal from '../ui/Modal';
import HashtagInput from '../hashtags/HashtagInput';
import { VideoContext } from '../../contexts/VideoContext';
import { parseHashtags, validateHashtagLimits } from '../../utils/hashtagUtils';

const AddVideoModal = ({ isOpen, onClose }) => {
  const [embedLink, setEmbedLink] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [error, setError] = useState('');
  const { addVideo } = useContext(VideoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate embed link format
      if (!embedLink.match(/youtube\.com\/embed\/[a-zA-Z0-9_-]{11}/)) {
        throw new Error('Invalid YouTube embed URL format');
      }

      // Parse and validate hashtags
      const hashtags = parseHashtags(hashtagInput);
      validateHashtagLimits(hashtags, []); // Empty array for demo, replace with actual videos

      // Create new video object
      const newVideo = {
        id: crypto.randomUUID(),
        embedLink,
        hashtags,
        createdAt: new Date().toISOString()
      };

      // Add to global state
      addVideo(newVideo);

      // Reset and close
      setEmbedLink('');
      setHashtagInput('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Video">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label>YouTube Embed URL</label>
          <input
            type="url"
            value={embedLink}
            onChange={(e) => setEmbedLink(e.target.value)}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            pattern="https://www\.youtube\.com/embed/.*"
            required
          />
        </div>

        <div className="form-group">
          <label>Hashtags</label>
          <HashtagInput
            value={hashtagInput}
            onChange={setHashtagInput}
            placeholder="#example #tags"
          />
          <small className="hint">Max 5 tags, 20 characters each</small>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Video
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddVideoModal;