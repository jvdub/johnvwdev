/**
 * Service Worker registration utilities
 * Handles registration, updates, and lifecycle events
 */

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

/**
 * Register the service worker
 * Should be called from a client component after mount
 */
export function registerServiceWorker(config: ServiceWorkerConfig = {}) {
  if (typeof window === "undefined") {
    console.warn("[SW] Registration skipped: not in browser");
    return;
  }

  if (!("serviceWorker" in navigator)) {
    console.warn("[SW] Service workers not supported");
    return;
  }

  // Register on load to not impact page performance
  window.addEventListener("load", () => {
    const swUrl = "/sw.js";

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("[SW] Registered successfully");

        // Check for updates periodically
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New service worker available
              console.log("[SW] New version available");
              config.onUpdate?.(registration);
            }
          });
        });

        config.onSuccess?.(registration);
      })
      .catch((error) => {
        console.error("[SW] Registration failed:", error);
        config.onError?.(error);
      });
  });
}

/**
 * Unregister all service workers
 * Useful for development/debugging
 */
export async function unregisterServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();

  for (const registration of registrations) {
    await registration.unregister();
    console.log("[SW] Unregistered");
  }
}

/**
 * Check if service worker is supported
 */
export function isServiceWorkerSupported(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator;
}

/**
 * Get the current service worker registration
 */
export async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | undefined> {
  if (!isServiceWorkerSupported()) {
    return undefined;
  }

  return navigator.serviceWorker.getRegistration();
}
