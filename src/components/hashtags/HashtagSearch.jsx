import React, { useState } from 'react';

const HashtagSearch = ({ hashtags, onSearch }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    
    const filtered = hashtags.filter(tag => 
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <div className="hashtag-search">
      <input
        type="text"
        placeholder="Search hashtags..."
        value={input}
        onChange={handleInput}
        onKeyPress={(e) => e.key === 'Enter' && onSearch(input)}
      />
      
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(tag => (
            <div 
              key={tag}
              className="suggestion-item"
              onClick={() => {
                setInput(tag);
                onSearch(tag);
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HashtagSearch;
