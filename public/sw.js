// Minimal valid service worker
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// Dummy fetch handler
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
}); 