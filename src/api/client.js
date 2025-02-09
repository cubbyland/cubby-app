const mockPosts = [
  {
    id: '1',
    title: 'Welcome Post',
    url: 'https://x.com/M7Bones/status/1888310566122307965',
    hashtags: ['#favorites'],
    isXPost: true,
    createdAt: new Date().toISOString()
  }
];

async function getPosts(hashtags) {
  const searchTags = hashtags.map(tag => 
    tag.toLowerCase().replace(/#/g, '').trim()
  );

  console.log('Search Tags:', searchTags);
  
  return mockPosts.filter(post => {
    const postTags = post.hashtags.map(tag => 
      tag.toLowerCase().replace(/#/g, '').trim()
    );
    console.log(`Post ${post.id} Tags:`, postTags);
    return searchTags.length === 0 || searchTags.every(st => postTags.includes(st));
  });
}

async function savePost(post) {
  const newPost = {
    ...post,
    hashtags: post.hashtags.map(tag => `#${tag}`),
    id: `post-${Date.now()}`,
    isXPost: /(twitter\.com|x\.com)/.test(post.url),
    createdAt: new Date().toISOString()
  };
  
  mockPosts.unshift(newPost);
  console.log('Saved Post:', newPost);
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