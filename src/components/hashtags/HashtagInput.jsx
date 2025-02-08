import { useEffect } from 'react';
import { parseHashtags } from '../../utils/hashtagUtils';

const HashtagInput = ({ value, onChange, placeholder }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const parsed = parseHashtags(value);
    setTags(parsed);
  }, [value]);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="hashtag-input-wrapper">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="hashtag-input"
      />
      
      <div className="tag-preview">
        {tags.map((tag, index) => (
          <span key={index} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HashtagInput;