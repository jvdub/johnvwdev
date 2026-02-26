"use client";

import { useEffect, useMemo, useState } from "react";

import type { TocHeading } from "../lib/toc";

type Props = {
  headings: TocHeading[];
  variant?: "auto" | "mobile-only" | "desktop-only";
};

const TOC_COLLAPSIBLE_ID = "post-toc-panel";

export function TableOfContents({ headings, variant = "auto" }: Props) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

  useEffect(() => {
    setActiveId(headings[0]?.id ?? "");
    setIsMobileOpen(false);
  }, [headings]);

  useEffect(() => {
    if (headingIds.length === 0) {
      return;
    }

    const observedHeadings = headingIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    if (observedHeadings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          const nextId = visibleEntries[0].target.id;
          setActiveId(nextId);
          return;
        }

        const passedHeadings = observedHeadings.filter(
          (heading) => heading.getBoundingClientRect().top <= 120,
        );

        if (passedHeadings.length > 0) {
          setActiveId(passedHeadings[passedHeadings.length - 1].id);
        }
      },
      {
        root: null,
        rootMargin: "-80px 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    observedHeadings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [headingIds]);

  if (headings.length === 0) {
    return null;
  }

  const mobileClassName =
    variant === "auto" ? "md:hidden" : variant === "mobile-only" ? "" : "hidden";
  const desktopClassName =
    variant === "auto"
      ? "hidden md:block"
      : variant === "desktop-only"
        ? "block"
        : "hidden";

  const tocList = (
    <ol className="space-y-2">
      {headings.map((heading) => {
        const isActive = heading.id === activeId;

        return (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              onClick={() => setIsMobileOpen(false)}
              aria-current={isActive ? "location" : undefined}
              className={[
                "block rounded-md px-2 py-1 text-sm no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                isActive ? "bg-surface-2 text-fg" : "text-fg-muted hover:text-fg",
              ].join(" ")}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <aside aria-label="Table of contents" className="rounded-lg border border-border bg-surface p-4 shadow-elev">
      <div className={mobileClassName}>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm font-semibold text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-controls={TOC_COLLAPSIBLE_ID}
        >
          <span>Table of contents</span>
          <span className="text-xs text-fg-muted">{isMobileOpen ? "Hide" : "Show"}</span>
        </button>

        <div id={TOC_COLLAPSIBLE_ID} hidden={!isMobileOpen} className="mt-2 border-t border-border pt-3">
          {tocList}
        </div>
      </div>

      <div className={desktopClassName}>
        <h2 className="mb-3 text-sm font-semibold text-fg">Table of contents</h2>
        {tocList}
      </div>
    </aside>
  );
}
