//Cacheamos todos nuestros archivos del index.html
//Invocamos los CDNS/librerias todo lo que usamos en el index.html
const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
];

const CACHE_NAME = "v1_cache_contador_react"

//SELF es como utilizar el THIS
//waitUntil() espera hasta que se ejecute y se pase el CACHE
//Eventos que se ejecuta cuando se INSTALA
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});


//Eventos que se ejecuta cuando se ACTIVA
//caches.keys manda a llamar a todos los CACHES
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return (
              cacheWhitelist.indexOf(cacheName) === -1 
              ? caches.delete(cacheName)
              : console.log('no ha borrado')
            );
          })
        );
      })
      .then(() => self.clients.claim())
  );
});


//Eventos que se ejecuta cuando es FETCH
//Se ejecuta para buscar una nueva version de los CDN
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(e.request);
    })
  );
});
