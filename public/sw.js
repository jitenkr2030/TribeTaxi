const CACHE_NAME = 'tribetaxi-v1';
const urlsToCache = [
  '/',
  '/rider/dashboard',
  '/driver/dashboard',
  '/admin/dashboard',
  '/rural',
  '/industrial',
  '/safety',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/logo.svg'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Not in cache - fetch from network
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response since it's a stream
            var responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for offline ride bookings
self.addEventListener('sync', event => {
  if (event.tag === 'ride-booking') {
    event.waitUntil(
      // Sync offline ride bookings
      syncOfflineBookings()
    );
  }
});

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('TribeTaxi', options)
  );
});

// Function to sync offline bookings
async function syncOfflineBookings() {
  try {
    // Get offline bookings from IndexedDB
    const offlineBookings = await getOfflineBookings();
    
    // Sync each booking with the server
    for (const booking of offlineBookings) {
      await syncBooking(booking);
    }
    
    // Clear synced bookings from IndexedDB
    await clearSyncedBookings();
  } catch (error) {
    console.error('Error syncing offline bookings:', error);
  }
}

// Mock functions for offline booking sync
function getOfflineBookings() {
  return new Promise((resolve) => {
    // In a real implementation, this would query IndexedDB
    resolve([]);
  });
}

function syncBooking(booking) {
  return new Promise((resolve) => {
    // In a real implementation, this would send the booking to the server
    console.log('Syncing booking:', booking);
    resolve();
  });
}

function clearSyncedBookings() {
  return new Promise((resolve) => {
    // In a real implementation, this would clear synced bookings from IndexedDB
    resolve();
  });
}