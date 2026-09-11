const CACHE='ped-nutrition-pwa-0.4.27-20260911';
const OFFLINE='./index.html?offline=0423';
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin) return;
  // Always go to network for navigation and app code. This prevents Safari from reviving old UI.
  if(e.request.mode==='navigate' || /\/(index\.html|app\.js|styles\.css|manifest\.webmanifest|sw\.js)$/.test(u.pathname)){
    e.respondWith(fetch(e.request,{cache:'no-store'}));
    return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
