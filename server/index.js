const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow cross-origin requests
app.use(cors());

// Endpoint to return mock tweet data
app.get('/api/tweets', (req, res) => {
  const mockTweets = {
    data: [
      { id: "1", text: "Mock tweet #1: Hello Cubby!" },
      { id: "2", text: "Mock tweet #2: This is a sample post." },
      { id: "3", text: "Mock tweet #3: Welcome to Cubby!" }
    ]
  };
  res.json(mockTweets);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/hashtags', require('./routes/hashtagRoutes'));