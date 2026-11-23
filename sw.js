const CACHE_NAME = "transit-charts-pub-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/app.js",
  "./js/config.js",
  "./js/calculos.js",
  "./js/plugin-mensual.js",
  "./js/orbitas.js",
  "./img/icon-192.png",
  "./img/icon-512.png",
  "./img/mi-logo.png",
  "./img/apple-touch-icon.png",
  "./img/icon-maskable-512.png",
  "./src/swisseph.js",
  "./wasm/swisseph.js",
  "./wasm/swisseph.wasm",
  "./wasm/swisseph.data"
];

// Instala el Service Worker y guarda los archivos
self.addEventListener("install", event => {
  self.skipWaiting(); // Fuerza la actualización inmediata
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activa el Service Worker y borra los cachés viejos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cache);
            return caches.delete(cache); // Elimina versiones anteriores (v1, v2, v3...)
          }
        })
      );
    })
  );
  self.clients.claim(); // Toma el control de la página inmediatamente
});

// Intercepta las peticiones: primero el caché; lo que se descarga por primera vez (por ejemplo Chart.js) también se guarda
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copia = res.clone(); caches.open(CACHE_NAME).then(c => c.put(event.request, copia)); }
        return res;
      });
    })
  );
});
