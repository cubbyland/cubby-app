import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialTags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hashtags, setHashtags] = useState(initialTags);

  useEffect(() => {
    onSearch(hashtags);
  }, [hashtags, onSearch]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const newTag = searchTerm.trim().replace(/#/g, '');
      if (newTag && !hashtags.includes(`#${newTag}`)) {
        setHashtags(prev => [...prev, `#${newTag}`]);
        setSearchTerm('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setHashtags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="search-bar">
      <div className="hashtag-container">
        {hashtags.map(tag => (
          <span key={tag} className="hashtag">
            {tag}
            <button onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add hashtag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
