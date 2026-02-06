"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/**
 * OfflineIndicator displays a banner when the user loses network connectivity.
 * Shows automatically when offline, hides when back online.
 */
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    // Don't run on server
    if (typeof window === "undefined") return;

    // Set initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Keep showing for a moment to show "Back online" message
      setTimeout(() => setShowOffline(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Don't show anything if we haven't detected offline state yet
  if (!showOffline) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 text-sm font-medium text-center transition-colors ${
        isOnline
          ? "bg-green-600 text-white"
          : "bg-orange-600 text-white dark:bg-orange-700"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center gap-2">
        {!isOnline && <WifiOff size={16} />}
        <span>
          {isOnline
            ? "✓ Back online"
            : "You're offline. Some features may not be available."}
        </span>
      </div>
    </div>
  );
}
