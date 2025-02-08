const HashtagPill = ({ tag, size = 'medium' }) => {
    const sizeClasses = {
      small: 'text-sm px-2 py-1',
      medium: 'text-base px-3 py-1.5',
      large: 'text-lg px-4 py-2'
    };
  
    return (
      <span className={`hashtag-pill ${sizeClasses[size]}`}>
        {tag}
      </span>
    );
  };
  
  export default HashtagPill;