import { useEffect } from 'react';

export const useHashtagLimits = (videos) => {
  // Track hashtag usage and warn/block when approaching limits
  useEffect(() => {
    const hashtagCounts = videos.reduce((acc, video) => {
      video.hashtags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    
    // Logic to handle limit warnings
  }, [videos]);
};