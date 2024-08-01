const CACHE_NAME = 'movement-detector-cache-v1';
const urlsToCache = [
  '/test',
  '/test/index.html',
  '/test/manifest.json',
   '/icon.png',
  '/footsteps.png',
  
  '/test/script.js'   // if you have a separate JS file
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Push event for notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.message,
   
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
