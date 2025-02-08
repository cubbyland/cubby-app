const mockPosts = [
  {
    id: 'm7bones-post',
    title: 'Sample Post 1',
    url: 'https://x.com/M7Bones/status/1888310566122307965',
    hashtags: ['#favorites', '#music'],
    isXPost: true
  },
  {
    id: 'meme-post',
    title: 'Sample Post 2',
    url: 'https://x.com/naiivememe/status/1888077633843511697', 
    hashtags: ['#favorites', '#memes'],
    isXPost: true
  }
];

// Add post validation
const validateXPost = (url) => {
  const pattern = /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/\w+\/status\/\d+/;
  return pattern.test(url);
};

export const api = {
  async getProfile() {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        posts: [], // Start empty for testing
        hashtags: []
      }), 1000);
    });
  },

  async savePost(post) {
    if (post.isXPost && !validateXPost(post.url)) {
      throw new Error('Invalid X post URL format');
    }
    console.log('Saving post:', post);
    return { success: true };
  },

  async getPosts(hashtags) {
    return mockPosts.filter(post => 
      hashtags.every(tag => 
        post.hashtags.includes(tag.toLowerCase())
      )
    );
  }
}; 