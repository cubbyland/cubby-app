export const parseHashtags = (input) => {
    if (!input || typeof input !== 'string') return ['#favorite'];
    
    return [
      ...new Set(
        input
          .split(/[\s,]+/)
          .filter(tag => tag.trim())
          .map(tag => 
            tag.startsWith('#') 
              ? tag.toLowerCase().slice(0, 20) // Limit tag length
              : `#${tag.toLowerCase().slice(0, 19)}`
          )
      )
    ].slice(0, 5); // Max 5 tags per video
  };
  
  export const validateHashtagLimits = (hashtags, allVideos) => {
    const tagCounts = new Map();
    
    // Pre-count all existing hashtags
    allVideos.forEach(video => {
      video.hashtags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
  
    // Check new tags against limits
    hashtags.forEach(tag => {
      const currentCount = tagCounts.get(tag) || 0;
      if (currentCount >= 10) {
        throw new Error(`"${tag}" has reached 10 video limit`);
      }
      tagCounts.set(tag, currentCount + 1);
    });
  };
  
  export const getHashtagCounts = (videos) => {
    return videos.reduce((acc, video) => {
      video.hashtags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
  };