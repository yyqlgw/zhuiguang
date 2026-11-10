const CACHE = 'zhuiguang-0af7bdab96';
const ASSETS = ['./', './index.html', './photos.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const isAudio = u => /\.mp3$/.test(new URL(u, self.location).pathname);
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // 页面导航：先请求网络拿最新版，失败再回退缓存（离线可用）
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => {});
      return resp;
    }).catch(() => caches.match('./index.html').then(hit => hit || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(resp => {
    const copy = resp.clone();
    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    return resp;
  }).catch(() => caches.match('./index.html'))));
});
