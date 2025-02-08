import React from 'react';

const ProfilePicture = ({ src, onChange }) => {
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="profile-picture">
        {src ? (
          <img src={src} alt="Profile" />
        ) : (
          <div className="placeholder">Add Photo</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden-input"
        />
      </div>
    );
  };
  
  export default ProfilePicture;