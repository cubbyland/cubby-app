// Add proper event listener registration
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    clients.claim().catch(console.error)
  );
});

// Add empty fetch handler
self.addEventListener('fetch', () => {}); 