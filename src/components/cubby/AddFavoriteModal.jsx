import { useState } from 'react';

const AddFavoriteModal = ({ onClose, onSave }) => {
  const [newFavorite, setNewFavorite] = useState({
    name: '',
    profilePic: ''
  });

  const handleSave = () => {
    if (newFavorite.name && newFavorite.profilePic) {
      onSave({
        ...newFavorite,
        id: Date.now()
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-favorite-modal">
        <h4>Add New Favorite</h4>
        <input
          type="text"
          placeholder="Name"
          value={newFavorite.name}
          onChange={(e) => setNewFavorite(prev => ({
            ...prev,
            name: e.target.value
          }))}
        />
        <input
          type="url"
          placeholder="Profile Picture URL"
          value={newFavorite.profilePic}
          onChange={(e) => setNewFavorite(prev => ({
            ...prev,
            profilePic: e.target.value
          }))}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddFavoriteModal;
