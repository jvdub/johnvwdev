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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const cardHeight = 150; // px, adjust to match actual card

  return (
    <div
      className={className}
      style={{ position: "relative", minHeight: cardHeight, marginTop: 8 }}
      aria-label={alt}
    >
      {!loaded && (
        <div
          style={{
            height: cardHeight,
            // borderRadius removed
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
      {mounted && (
        <img
          src={getGithubRepoCardUrl(githubUrl)}
          alt={alt}
          style={{
            maxWidth: "100%",
            // borderRadius removed
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: loaded ? "block" : "none",
          }}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
