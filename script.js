
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Handle notifications
function showNotification(title, message) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body: message,
        icon: 'icon.png'
      });
    });
  }
}

// Request notification permission
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

// Update notification function
function updateNotifications() {
  if (Notification.permission === 'granted') {
    showNotification('Movement Update', `Steps: ${stepCount}, Distance: ${totalDistance.toFixed(2)} meters`);
  }
}
// Function to send a message to the service worker
function sendMessageToSW(message) {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}

// Example function to update notification
function updateNotifications() {
  if (Notification.permission === 'granted') {
    sendMessageToSW({
      type: 'UPDATE_NOTIFICATION',
      title: 'Movement Update',
      message: `Steps: ${stepCount}, Distance: ${totalDistance.toFixed(2)} meters`
    });
  }
}

// Send periodic updates or trigger based on events
setInterval(updateNotifications, 6000000); // Update every minute
