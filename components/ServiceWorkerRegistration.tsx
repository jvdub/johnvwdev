"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "../lib/service-worker";

/**
 * ServiceWorkerRegistration component
 * Registers the service worker on mount
 * Must be a client component since it uses browser APIs
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production
    if (process.env.NODE_ENV !== "production") {
      console.log("[SW] Skipping registration in development");
      return;
    }

    registerServiceWorker({
      onSuccess: (registration) => {
        console.log("[SW] Registration successful", registration);
      },
      onUpdate: (registration) => {
        console.log("[SW] New version available. Refresh to update.");
        // Could show a toast/notification to the user here
        // For now, just log it
      },
      onError: (error) => {
        console.error("[SW] Registration error:", error);
      },
    });
  }, []);

  // This component doesn't render anything
  return null;
}
