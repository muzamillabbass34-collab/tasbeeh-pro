const CACHE_NAME = "tasbeeh-v1";

const urlsToCache = [
"/",
"index.html",
"style.css",
"script.js",
"beep.mp3"
];// INSTALL EVENT
self.addEventListener("install", function (event) {

event.waitUntil(
caches.open(CACHE_NAME).then(function (cache) {
return cache.addAll(urlsToCache);
})
);

});// ACTIVATE EVENT (AUTO UPDATE)
self.addEventListener("activate", function (event) {

event.waitUntil(
caches.keys().then(function (cacheNames) {

  return Promise.all(
    cacheNames.map(function (cache) {

      // delete old cache
      if (cache !== CACHE_NAME) {
        return caches.delete(cache);
      }

    })
  );

})

);

});// FETCH EVENT (OFFLINE + FAST LOAD)
self.addEventListener("fetch", function (event) {

event.respondWith(

caches.match(event.request).then(function (response) {

  // return cached file if found
  if (response) {
    return response;
  }

  // otherwise fetch from internet
  return fetch(event.request);

})

);

});