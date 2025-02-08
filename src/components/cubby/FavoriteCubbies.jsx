import { useState } from 'react';
import AddFavoriteModal from './AddFavoriteModal';

const FavoriteCubbies = () => {
  const [favorites, setFavorites] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const addFavorite = (newFavorite) => {
    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  return (
    <div className="favorite-cubbies">
      <h3>Favorite Cubbies</h3>
      <button 
        className="add-favorite-button"
        onClick={() => setAddModalOpen(true)}
      >
        + Add Favorite
      </button>

      <div className="favorites-grid">
        {favorites.map(fav => (
          <div key={fav.id} className="favorite-item">
            <img 
              src={fav.profilePic} 
              alt={fav.name} 
              className="favorite-profile-pic"
            />
            <span className="favorite-name">{fav.name}</span>
            <button 
              className="remove-favorite"
              onClick={() => removeFavorite(fav.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <AddFavoriteModal
          onClose={() => setAddModalOpen(false)}
          onSave={addFavorite}
        />
      )}
    </div>
  );
};

export default FavoriteCubbies;
