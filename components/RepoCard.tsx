"use client";
import React, { useState, useEffect } from "react";
import { getGithubRepoCardUrl } from "./getGithubRepoCardUrl";

interface RepoCardProps {
  githubUrl: string;
  alt?: string;
  className?: string;
}

export default function RepoCard({
  githubUrl,
  alt = "GitHub repository card",
  className,
}: RepoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cardHeight = 150; // px, adjust to match actual card

  // Extract repo name from URL for fallback
  const match = githubUrl.match(/github.com\/(.+?)\/(.+?)(?:$|\/)/);
  const repoName = match ? match[2] : "Repository";
  const username = match ? match[1] : "";

  return (
    <div
      className={className}
      style={{ position: "relative", minHeight: cardHeight, marginTop: 8 }}
      aria-label={alt}
    >
      {!loaded && !error && (
        <div
          style={{
            height: cardHeight,
            background: "#e5e7eb", // Tailwind gray-200
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      )}

      {error && (
        <div
          className="rounded-lg border border-border bg-surface p-4 shadow-elev"
          style={{ minHeight: cardHeight }}
        >
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-fg">{repoName}</div>
            <div className="text-sm text-fg-muted">
              {username && `@${username}`}
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-sm text-accent">
              View on GitHub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {mounted && !error && (
        <img
          src={getGithubRepoCardUrl(githubUrl)}
          alt={alt}
          style={{
            maxWidth: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: loaded ? "block" : "none",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
