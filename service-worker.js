/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-d6698e9';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./druhe-1.html","./druhe-2.html","./druhe-3.html","./druhe-4.html","./druhe-5.html","./druhe-6.html","./druhe.html","./favicon.png","./index.html","./manifest.json","./osoby.html","./predmluva.html","./prvni-1.html","./prvni-2.html","./prvni-3.html","./prvni-4.html","./prvni-5.html","./prvni.html","./treti-1.html","./treti-2.html","./treti-3.html","./treti.html","./zivot.html","./images/jednani_druhe.mp4","./images/jednani_prvni.mp4","./images/jednani_treti.mp4","./images/titulni.mp4","./style/style.min.css","./scripts/bundle.js","./fonts/spectral/SIL Open Font License.txt","./fonts/spectral/Spectral-Bold.woff2","./fonts/spectral/Spectral-BoldItalic.woff2","./fonts/spectral/Spectral-Medium.woff2","./fonts/spectral/Spectral-MediumItalic.woff2","./fonts/space/AUTHORS.txt","./fonts/space/CONTRIBUTORS.txt","./fonts/space/OFL.txt","./fonts/space/variable/SpaceGroteskVariable.ttf","./fonts/space/variable/SpaceGroteskVariable.woff2","./fonts/space/webfont/SpaceGrotesk-Bold.woff","./fonts/space/webfont/SpaceGrotesk-Bold.woff2","./fonts/space/webfont/SpaceGrotesk-Light.woff","./fonts/space/webfont/SpaceGrotesk-Light.woff2","./fonts/space/webfont/SpaceGrotesk-Medium.woff","./fonts/space/webfont/SpaceGrotesk-Medium.woff2","./fonts/space/webfont/SpaceGrotesk-Regular.woff","./fonts/space/webfont/SpaceGrotesk-Regular.woff2","./fonts/space/webfont/SpaceGrotesk-SemiBold.woff","./fonts/space/webfont/SpaceGrotesk-SemiBold.woff2"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
