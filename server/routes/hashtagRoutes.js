import express from 'express';
const router = express.Router();
import db from '../database'; // Adjust based on your DB setup

router.get('/:hashtag', async (req, res) => {
  try {
    const { hashtag } = req.params;
    
    const count = await db.videos.count({
      where: {
        hashtags: {
          has: hashtag
        }
      }
    });

    res.json({
      hashtag,
      count,
      limitReached: count >= 10
    });
    
  } catch (error) {
    console.error('Hashtag check error:', error);
    res.status(500).json({ error: 'Failed to check hashtag limit' });
  }
});

export default router;