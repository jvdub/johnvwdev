"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  measurementId: string;
};

export function GaPageView({ measurementId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string | null>(null);
  const isFirstRef = useRef(true);
  const isDev = process.env.NODE_ENV !== "production";

  const search = searchParams.toString();
  const path = search ? `${pathname}?${search}` : pathname;

  useEffect(() => {
    if (!measurementId) return;
    if (typeof window === "undefined") return;

    // Avoid duplicate sends for the initial page load; GA already records it via the
    // initial `gtag('config', ...)` in the document head.
    if (isFirstRef.current) {
      isFirstRef.current = false;
      lastPathRef.current = path;
      return;
    }

    if (lastPathRef.current === path) return;
    lastPathRef.current = path;

    const gtag = (window as unknown as { gtag?: (...args: any[]) => void })
      .gtag;
    if (typeof gtag !== "function") return;

    gtag("config", measurementId, {
      page_path: path,
      page_location: window.location.href,
    });

    if (isDev) {
      // Helpful local verification: open DevTools Console and navigate between routes.
      console.debug("[ga] pageview", {
        measurementId,
        page_path: path,
        page_location: window.location.href,
      });
    }
  }, [measurementId, path]);

  return null;
}
