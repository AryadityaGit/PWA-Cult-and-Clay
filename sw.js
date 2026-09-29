const CACHE_NAME = 'cult-clay-deferred-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Handles local background installation caching blocks
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepts connection checks to read directly from local system memory
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});