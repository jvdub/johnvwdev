// Service Worker for offline support
// Version 1.0.0
const CACHE_VERSION = "v1";
const CACHE_NAME = `johnvw-dev-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/about/",
  "/blog/",
  "/contact/",
  "/projects/",
  "/globals.css",
  "/offline.html",
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, falling back to network (good for static assets)
  CACHE_FIRST: "cache-first",
  // Network first, falling back to cache (good for dynamic content)
  NETWORK_FIRST: "network-first",
  // Network only (for API calls, etc.)
  NETWORK_ONLY: "network-only",
};

// Determine cache strategy based on request
function getCacheStrategy(request) {
  const url = new URL(request.url);

  // Static assets: cache first
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/) ||
    url.pathname.startsWith("/_next/static/")
  ) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Blog posts and pages: network first (so updates are shown quickly)
  if (
    url.pathname.startsWith("/blog/") ||
    url.pathname.startsWith("/projects/") ||
    url.pathname === "/" ||
    url.pathname === "/about/" ||
    url.pathname === "/contact/"
  ) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // External requests: network only
  if (url.origin !== self.location.origin) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }

  // Default: network first
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Install event: cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching static assets");
        return cache
          .addAll(STATIC_ASSETS.filter((url) => url !== "/offline.html"))
          .catch((err) => {
            // Don't fail install if some assets fail to cache
            console.error("[SW] Failed to cache some assets:", err);
          });
      })
      .then(() => {
        console.log("[SW] Installation complete");
        // Activate immediately
        return self.skipWaiting();
      }),
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (name) => name.startsWith("johnvw-dev-") && name !== CACHE_NAME,
            )
            .map((name) => {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            }),
        );
      })
      .then(() => {
        console.log("[SW] Activation complete");
        // Take control of all clients immediately
        return self.clients.claim();
      }),
  );
});

// Fetch event: implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const strategy = getCacheStrategy(request);

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request));
      break;
    case CACHE_STRATEGIES.NETWORK_ONLY:
      event.respondWith(fetch(request));
      break;
    default:
      event.respondWith(networkFirst(request));
  }
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error("[SW] Cache-first fetch failed:", error);
    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      const offlinePage = await cache.match("/offline.html");
      if (offlinePage) {
        return offlinePage;
      }
    }
    throw error;
  }
}

// Network-first strategy
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("[SW] Network failed, trying cache:", request.url);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      const offlinePage = await cache.match("/offline.html");
      if (offlinePage) {
        return offlinePage;
      }
    }

    throw error;
  }
}

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
