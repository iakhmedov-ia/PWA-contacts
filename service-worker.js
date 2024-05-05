// console.log('sw inside');

const cacheName = "app_shell--v1"
const dynamicCacheName = "dynamic-cache-v1"
const assets = [
  '/',
  'index.html',
  'js/app.js',
  'js/common.js',
  'js/materialize.min.js',
  'css/styles.css',
  'css/materialize.min.css',
  'img/icons/contact.png',
  'pages/default.html',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
]

//cache size limit functions
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(() => {
          limitCacheSize(name, size);
        });
      }
    });
  });
};


//install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets).catch(error => {
        console.error('Failed to cache assets:', error);
      })
    })
  )
})

self.addEventListener('activate', event => {
  console.log('sw has been activated')

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
        .map(key => caches.delete(key)))
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(event.request.url, fetchRes.clone())
          limitCacheSize(dynamicCacheName, 5)
          return fetchRes
        })
      })
    }).catch(() => {
      if(event.request.url.indexOf('.html') > -1) {
        return caches.match('pages/default.html')
      }
    })
  )
})


