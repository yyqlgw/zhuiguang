const CACHE = 'zhuiguang-6ae01c890b';
const AUDIO_CACHE = 'zhuiguang-audio-v1';     // 音频单独缓存，发版不重下
const ASSETS = ['./', './index.html', './photos.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const isAudio = u => /\.mp3$/.test(new URL(u, self.location).pathname);
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== AUDIO_CACHE)
      .map(k => caches.delete(k))))
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
  // 音频：长期缓存优先，只下载一次
  if (isAudio(req.url)) {
    e.respondWith(caches.open(AUDIO_CACHE).then(c => c.match(req).then(hit => hit ||
      fetch(req).then(resp => { c.put(req, resp.clone()).catch(() => {}); return resp; }))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(resp => {
    const copy = resp.clone();
    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    return resp;
  }).catch(() => caches.match('./index.html'))));
});
