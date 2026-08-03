const CACHE_NAME = 'primeiro-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(networkResponse => {
        // Optionally cache new resources
        return caches.open(CACHE_NAME).then(cache => {
          try {
            cache.put(event.request, networkResponse.clone());
          } catch (e) {
            // ignore opaque responses
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback to cache for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
