"use client";

import { useEffect, useState } from "react";

type MdxImageProps = {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  zoom?: boolean;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
  align?: "left" | "center" | "right";
};

function normalizeText(value: string | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

export function MdxImage({
  src,
  alt,
  title,
  caption,
  zoom = true,
  priority = false,
  decorative = false,
  className,
  align = "center",
}: MdxImageProps) {
  const resolvedSrc = normalizeText(src);
  const resolvedAlt = normalizeText(alt);
  const resolvedCaption = normalizeText(caption) || normalizeText(title);

  if (resolvedSrc.length === 0) {
    throw new Error("MDX image is missing a src attribute.");
  }

  if (!decorative && resolvedAlt.length === 0) {
    throw new Error(`MDX image is missing alt text for src "${resolvedSrc}".`);
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const allowZoom = zoom === true;

  useEffect(() => {
    if (!isZoomed) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed]);

  const figureClassName = [
    "mdx-image-figure",
    `mdx-image-align-${align}`,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageElement = (
    <img
      src={resolvedSrc}
      alt={decorative ? "" : resolvedAlt}
      aria-hidden={decorative ? true : undefined}
      className="mdx-image"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsLoaded(true)}
    />
  );

  return (
    <figure className={figureClassName}>
      <div className="mdx-image-frame" data-loaded={isLoaded}>
        {allowZoom ? (
          <button
            type="button"
            className="mdx-image-button"
            onClick={() => setIsZoomed(true)}
            aria-label={
              resolvedAlt.length > 0
                ? `Zoom image: ${resolvedAlt}`
                : "Zoom image"
            }
          >
            {imageElement}
          </button>
        ) : (
          imageElement
        )}
        <div className="mdx-image-skeleton" aria-hidden="true" />
      </div>
      {resolvedCaption.length > 0 ? (
        <figcaption className="mdx-image-caption">{resolvedCaption}</figcaption>
      ) : null}

      {isZoomed ? (
        <div
          className="mdx-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={resolvedAlt.length > 0 ? resolvedAlt : "Zoomed image"}
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="mdx-zoom-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="mdx-zoom-close"
              aria-label="Close image zoom"
              onClick={() => setIsZoomed(false)}
            >
              Close
            </button>
            <img
              src={resolvedSrc}
              alt={decorative ? "" : resolvedAlt}
              aria-hidden={decorative ? true : undefined}
              className="mdx-zoom-image"
            />
            {resolvedCaption.length > 0 ? (
              <div className="mdx-zoom-caption">{resolvedCaption}</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </figure>
  );
}

export type { MdxImageProps };
