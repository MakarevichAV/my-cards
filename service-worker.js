const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/src/index.html',
    '/src/index.css',
    '/src/index.js',
    '/src/images/logo.svg',
    '/src/images/max-logo.svg',
    '/icons/logo.svg',
    '/icons/max-logo.svg'
];

self.addEventListener('install', function (event) {
    // Установка сервисного работника и кэширование всех необходимых ресурсов
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    // Попытка извлечь ресурс из кэша
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Ресурс найден в кэше, возвращаем его
                if (response) {
                    return response;
                }
                // Ресурс не найден в кэше, делаем запрос к сети
                return fetch(event.request);
            })
    );
});