const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/twitter-oembed', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&theme=dark`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Proxy server running on port 3001'));
