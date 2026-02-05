"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { SearchableItem } from "../lib/search";

type SearchProps = {
  items: SearchableItem[];
};

export function Search({ items }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect OS
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Initialize Fuse.js
  const fuse = useRef(
    new Fuse(items, {
      keys: ["title", "description", "tags"],
      threshold: 0.3,
      includeScore: true,
    }),
  );

  // Update fuse index when items change
  useEffect(() => {
    fuse.current = new Fuse(items, {
      keys: ["title", "description", "tags"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [items]);

  // Handle search
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(0);
      return;
    }

    const searchResults = fuse.current.search(query);
    const resultItems = searchResults.slice(0, 8).map((result) => result.item);
    setResults(resultItems);
    setIsOpen(true);
    setSelectedIndex(0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          window.location.href = results[selectedIndex].url;
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ color: 'var(--muted)' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search posts and projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query && results.length > 0) {
              setIsOpen(true);
            }
          }}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
          }}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border px-2 py-0.5 text-xs sm:inline-block"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface2)',
            color: 'var(--muted)',
          }}
        >
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>
      </div>

      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-2 max-h-96 w-full overflow-auto rounded-lg border shadow-lg"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
          }}
        >
          {results.map((item, index) => (
            <Link
              key={item.url}
              href={item.url}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className={`block border-b px-4 py-3 no-underline transition-colors last:border-b-0`}
              style={{
                borderBottomColor: 'var(--border)',
                backgroundColor: index === selectedIndex ? 'var(--surface2)' : 'var(--surface)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-medium" style={{ color: 'var(--text)' }}>
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="mt-1 line-clamp-2 text-sm" style={{ color: 'var(--muted)' }}>
                      {item.description}
                    </div>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded px-2 py-0.5 text-xs"
                          style={{
                            backgroundColor: 'var(--bg2)',
                            color: 'var(--muted)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="shrink-0 rounded px-2 py-0.5 text-xs font-medium" style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)',
                }}>
                  {item.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border px-4 py-8 text-center shadow-lg"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            No results found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
