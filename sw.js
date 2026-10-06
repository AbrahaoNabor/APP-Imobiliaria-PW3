const CACHE_NAME = 'meu-pwa-v1';
const ARQUIVOS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalação: guarda os arquivos principais no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

// Ativação: apaga caches de versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes.filter((nome) => nome !== CACHE_NAME).map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

// Fetch: responde com o cache; se não tiver, busca na rede
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((resposta) => {
      return (
        resposta ||
        fetch(event.request).catch(() => caches.match('./index.html'))
      );
    })
  );
});
