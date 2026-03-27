const cacheName = 'accord-v20'; // Force new version
const assets = ['./', './index.html', './title.png', './manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== cacheName).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
