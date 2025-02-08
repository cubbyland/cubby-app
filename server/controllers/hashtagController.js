exports.checkHashtagLimit = (req, res) => {
    const { hashtag } = req.params;
    // Database query to count videos with this hashtag
    const count = db.videos.count({ hashtags: hashtag });
    res.json({ hashtag, count, limitReached: count >= 10 });
  };