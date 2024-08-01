const CACHE_NAME = 'movement-detector-cache-v1';
const urlsToCache = [
  '/test',
  '/test/index.html',
  '/test/manifest.json',
   '/test/icon.png',
  '/test/footsteps.png',
  
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
self.addEventListener('push1', (event) => {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: 'icon.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
// Create a notification with a unique tag
function showPersistentNotification(title, options) {
  self.registration.showNotification(title, options);
}

// Update notification with new content
function updateNotification(notificationId, options) {
  self.registration.getNotifications({ tag: notificationId }).then((notifications) => {
    if (notifications.length > 0) {
      notifications[0].close(); // Close the existing notification
    }
    self.registration.showNotification(options.title, options);
  });
}

// Handle push event or any other event to show or update notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: 'icon.png',
    tag: 'persistent-notification', // Unique tag for the notification
    renotify: true, // Allow updating the notification
  };
  updateNotification('persistent-notification', options);
});

