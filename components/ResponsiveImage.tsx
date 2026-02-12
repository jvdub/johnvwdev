import React from "react";

import { DEFAULT_IMAGE_SIZES, getImageSources } from "../lib/image-variants";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

function buildFillStyle(style: React.CSSProperties | undefined) {
  return {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    ...style,
  } satisfies React.CSSProperties;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  fill = false,
  width,
  height,
  style,
}: ResponsiveImageProps) {
  const imageSources = getImageSources(src);
  const resolvedSizes = sizes ?? DEFAULT_IMAGE_SIZES;
  const resolvedStyle = fill ? buildFillStyle(style) : style;
  const resolvedWidth = fill ? undefined : (width ?? imageSources?.width);
  const resolvedHeight = fill ? undefined : (height ?? imageSources?.height);

  if (!imageSources) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        sizes={resolvedSizes}
        width={resolvedWidth}
        height={resolvedHeight}
        style={resolvedStyle}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  }

  return (
    <picture>
      {imageSources.avifSrcSet ? (
        <source
          type="image/avif"
          srcSet={imageSources.avifSrcSet}
          sizes={resolvedSizes}
        />
      ) : null}
      {imageSources.webpSrcSet ? (
        <source
          type="image/webp"
          srcSet={imageSources.webpSrcSet}
          sizes={resolvedSizes}
        />
      ) : null}
      <img
        src={imageSources.fallbackSrc}
        srcSet={imageSources.fallbackSrcSet}
        sizes={resolvedSizes}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={alt}
        className={className}
        style={resolvedStyle}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
