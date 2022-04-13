const CACHE_NAME = "version-0.1";
const urlsToCache = ['index.html', 'offline.html']
const self = this;

//Instalación SW
self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache)=> { 
               // console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
})
//Listen for requests
self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request)
            .then(()=>{
                return fetch(e.request)
            })
            .catch(()=> caches.match('offline.html'))
    )
})

//Activa SW
self.addEventListener('activete',(e)=>{
    const cacheWhileList = [];
    cacheWhileList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys()
            .then((cacheNames)=> Promise.all(
                cacheNames.map((cacheName)=> {
                    if(!cacheWhileList.includes(cacheName)){
                        return caches.delete(cacheName)
                    }
                })
            ))
    )
})
