// embedHelpers.js

/**
 * Extracts video ID or slug from a valid x.com video URL.
 * @param {string} url - The URL to extract data from.
 * @returns {string | null} - The extracted ID or slug, or null if invalid.
 */
// export const extractVideoID = (url) => {
//   try {
//     const matches = url.match(/^https:\/\/x\.com\/(.+)/);
//     return matches ? matches[1] : null;
//   } catch {
//     return null;
//   }
// };

/**
 * Generates embed HTML for a given video URL.
 * @param {string} url - The x.com video URL.
 * @returns {string} - Embed HTML for the video.
 */
// export const generateEmbedHTML = (url) => {
//   const videoID = extractVideoID(url);
//   if (!videoID) return "";
//   return `<iframe src="https://x.com/embed/${videoID}" frameborder="0" allowfullscreen></iframe>`;
// };
