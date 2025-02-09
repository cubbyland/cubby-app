export const watchState = (name, value) => {
  console.log(`STATE ${name}:`, value);
  return value;
};

// In AppContainer.jsx
const [searchHashtags, setSearchHashtags] = useState(
  watchState('searchHashtags', [])
);
const [isLoading, setIsLoading] = useState(
  watchState('isLoading', false)
); 