"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

import type { SearchableItem } from "../lib/search";

type NotFoundSupportProps = {
  items: SearchableItem[];
  maxSuggestions?: number;
};

function buildQuery(pathname: string): string {
  if (!pathname) return "";

  const normalized = pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/[/]+/g, " ")
    .trim();

  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

export function NotFoundSupport({
  items,
  maxSuggestions = 5,
}: NotFoundSupportProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const fullPath = search ? `${pathname}?${search}` : pathname;
  const eventSentRef = useRef(false);
  const query = useMemo(() => buildQuery(pathname), [pathname]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description", "tags", "url"],
        threshold: 0.35,
        includeScore: true,
      }),
    [items],
  );

  const suggestions = useMemo(() => {
    if (!query) return [];
    return fuse
      .search(query)
      .slice(0, maxSuggestions)
      .map((result) => result.item);
  }, [fuse, query, maxSuggestions]);

  useEffect(() => {
    if (eventSentRef.current) return;
    eventSentRef.current = true;

    if (typeof window === "undefined") return;
    const gtag = (window as { gtag?: (...args: any[]) => void }).gtag;
    if (typeof gtag !== "function") return;

    gtag("event", "not_found", {
      page_path: fullPath,
      page_location: window.location.href,
      page_referrer: document.referrer,
      non_interaction: true,
    });
  }, [fullPath]);

  return (
    <section
      aria-label="Suggested pages"
      className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2>Closest matches</h2>
        <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">
          Based on the URL
        </span>
      </div>
      <div className="mt-3 h-1 w-12 rounded bg-accent" aria-hidden="true" />
      <p className="mt-4 text-fg-muted">
        If the link was mistyped or moved, these are the closest matches we
        could find.
      </p>

      {suggestions.length === 0 ? (
        <p className="mt-6 text-sm text-fg-muted">
          No close matches yet. Try the search above or jump to one of the quick
          links below.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3" aria-label="Suggested pages">
          {suggestions.map((item) => (
            <li
              key={item.url}
              className="rounded-md border border-border bg-surface-2 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={item.url}
                    className="block font-medium text-fg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    {item.title}
                  </Link>
                  {item.description && (
                    <p className="mt-1 text-sm text-fg-muted">
                      {item.description}
                    </p>
                  )}
                </div>
                <span
                  className="shrink-0 rounded-full bg-surface-hover px-2 py-1 text-xs font-medium text-fg-muted"
                  aria-label={`Type: ${item.type}`}
                >
                  {item.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
