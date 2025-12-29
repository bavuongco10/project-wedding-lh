const CACHE_NAME = 'wedding-lh-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/lh/1.jpeg',
  '/lh/2.jpeg',
  '/lh/3.jpeg',
  '/lh/4.jpeg',
  '/lh/5.jpeg',
  '/lh/heart.svg',
  '/lh/song.mp3',
  '/vite.svg'
]

// Cache strategies
const CACHE_FIRST_PATTERNS = [
  /\.(?:jpg|jpeg|png|gif|svg|webp|mp3|mp4|woff|woff2|ttf|eot)$/i,
  /\/lh\//i
]

const NETWORK_FIRST_PATTERNS = [
  /\.(?:js|css|html)$/i,
  /^\/$/,
  /\/index\.html$/
]

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files')
        return cache.addAll(ASSETS_TO_CACHE)
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error)
      })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
  return self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return
  }

  const url = new URL(event.request.url)
  const pathname = url.pathname

  // Determine cache strategy
  const isCacheFirst = CACHE_FIRST_PATTERNS.some(pattern => pattern.test(pathname))
  const isNetworkFirst = NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(pathname))

  if (isCacheFirst) {
    // Cache First: Check cache, then network
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
              }
              const responseToCache = response.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache)
              })
              return response
            })
        })
    )
  } else if (isNetworkFirst) {
    // Network First: Try network, fallback to cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              // If fetch fails and we have an HTML request, return cached index.html
              if (event.request.headers.get('accept')?.includes('text/html')) {
                return caches.match('/index.html')
              }
            })
        })
    )
  } else {
    // Default: Try cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
              }
              const responseToCache = response.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache)
              })
              return response
            })
        })
    )
  }
})

