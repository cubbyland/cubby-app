let mockPosts = [
  {
    id: '1',
    title: 'Welcome Post',
    url: 'https://x.com/M7Bones/status/1888310566122307965',
    hashtags: ['#favorites'],
    isXPost: true,
    createdAt: new Date().toISOString()
  }
];

async function getPosts() {
  return [...mockPosts];
}

async function savePost(post) {
  const newPost = {
    ...post,
    hashtags: post.hashtags.map(tag => `#${tag.replace(/#/g, '')}`),
    id: `post-${Date.now()}`,
    isXPost: /(twitter\.com|x\.com)/.test(post.url),
    createdAt: new Date().toISOString()
  };
  
  console.log('[API] Saving post:', JSON.parse(JSON.stringify(newPost)));
  mockPosts = [newPost, ...mockPosts];
  return newPost;
}

function validateXPost(url) {
  const pattern = /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/\w+\/status\/\d+/;
  return pattern.test(url);
}

// Single API object declaration
const api = {
  getPosts,
  savePost,
  validateXPost
};

export default api;

export async function getAllPosts() {
  return mockPosts;
}