// validation.js

/**
 * Validates if the input link is a valid x.com video URL.
 * @param {string} link - The URL to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidVideoURL = (link) => {
    const validPattern = /^https:\/\/x\.com\/.+/;
    return validPattern.test(link.trim());
  };
  
  /**
   * Checks if the maximum number of videos (10) is reached.
   * @param {number} currentCount - The current number of videos.
   * @returns {boolean} - True if limit is reached, false otherwise.
   */
  export const isMaxVideosReached = (currentCount) => {
    return currentCount >= 10;
  };
  