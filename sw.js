/* Service worker Si Kasir: agar aplikasi bisa dibuka offline. Taruh satu folder dengan file HTML. */
const C='si-kasir-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{const u=e.data&&e.data.cache;if(u)e.waitUntil(caches.open(C).then(c=>c.add(u)).catch(()=>{}))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})
.catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match(self.registration.scope):undefined)||Response.error())))});
