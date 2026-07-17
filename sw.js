const CACHE_NAME = 'sif-ss-android-v4.2';

// 1. Archivos locales indispensables (Críticos para la aplicación)
const LOCAL_ASSETS = [
  './',
  './index.html',
  './manual_usuario.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg'
];

// 2. Librerías externas y CDNs (Se precargan para que funcionen 100% offline en terreno sin internet)
const EXTERNAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[SIF SS Android] Instalando caché offline autónoma v4.0...');
      // Guardar todos los archivos locales críticos
      await cache.addAll(LOCAL_ASSETS);

      // Guardar de forma segura cada librería CDN externa para que esté disponible sin señal
      for (const url of EXTERNAL_ASSETS) {
        try {
          const resp = await fetch(url, { mode: 'cors' });
          if (resp && (resp.status === 200 || resp.type === 'opaque')) {
            await cache.put(url, resp);
          }
        } catch (e) {
          console.warn('[SIF SS Android] Aviso de precarga CDN (se intentará en runtime):', url);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SIF SS Android] Eliminando caché antigua:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. CDNs externas, iconos FontAwesome y Fuentes (Cache-First para carga instantánea y autónoma sin internet)
  if (url.origin.includes('cdnjs.cloudflare.com') || url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          console.warn('[SIF SS Android Offline] Librería o fuente en caché offline requerida:', event.request.url);
        });
      })
    );
    return;
  }

  // 2. Archivos Locales de la aplicación (Network-First: Actualiza en línea, si no hay internet opera 100% desde caché)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
