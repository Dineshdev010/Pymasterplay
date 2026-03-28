// Lightweight runtime caching to speed up repeat visits and improve resilience.
// We keep the scope intentionally narrow: only same-origin static assets and SPA navigations.

const CACHE_VERSION = "pymaster-static-v3";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.png",
  "/og-image.png",
  "/placeholder.svg",
  "/fonts/inter-latin-400.woff2",
  "/fonts/inter-latin-500.woff2",
  "/fonts/inter-latin-600.woff2",
  "/fonts/inter-latin-700.woff2",
  "/fonts/jetbrains-mono-latin-400.woff2",
  "/fonts/jetbrains-mono-latin-600.woff2",
  "/fonts/jetbrains-mono-latin-700.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(CORE_ASSETS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isNavigate = req.mode === "navigate";
  const dest = req.destination; // script|style|image|font|document|...

  // SPA navigation: return cached shell, then network fallback.
  if (isNavigate) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match("/");
        try {
          const fresh = await fetch(req);
          // Keep the shell reasonably fresh.
          cache.put("/", fresh.clone()).catch(() => undefined);
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // Static assets: cache-first.
  if (dest === "script" || dest === "style" || dest === "image" || dest === "font") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match(req);
        if (cached) return cached;
        const fresh = await fetch(req);
        // Only cache successful responses.
        if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => undefined);
        return fresh;
      })()
    );
    return;
  }

  // Default: network-first (do not aggressively cache API-like requests).
  event.respondWith(fetch(req));
});
