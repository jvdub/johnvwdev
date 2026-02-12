import {
  imageManifest,
  type ImageManifestEntry,
  type ImageVariant,
} from "./generated/image-manifest";

type ImageSourceSet = {
  avifSrcSet?: string;
  webpSrcSet?: string;
  fallbackSrcSet?: string;
  fallbackSrc: string;
  width?: number;
  height?: number;
};

const DEFAULT_IMAGE_SIZES = "(min-width: 1024px) 768px, 100vw";

function buildSrcSet(variants: ImageVariant[]): string {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
}

function getLargestVariant(variants: ImageVariant[]): ImageVariant | undefined {
  return variants.reduce<ImageVariant | undefined>((largest, variant) => {
    if (!largest || variant.width > largest.width) {
      return variant;
    }

    return largest;
  }, undefined);
}

export function getImageSources(src: string): ImageSourceSet | null {
  const entry: ImageManifestEntry | undefined = imageManifest[src];

  if (!entry) {
    return null;
  }

  const fallbackVariant = getLargestVariant(entry.fallback.variants);

  return {
    avifSrcSet: entry.avif.length > 0 ? buildSrcSet(entry.avif) : undefined,
    webpSrcSet: entry.webp.length > 0 ? buildSrcSet(entry.webp) : undefined,
    fallbackSrcSet:
      entry.fallback.variants.length > 0
        ? buildSrcSet(entry.fallback.variants)
        : undefined,
    fallbackSrc: fallbackVariant ? fallbackVariant.src : entry.original.src,
    width: entry.original.width,
    height: entry.original.height,
  };
}

export { DEFAULT_IMAGE_SIZES };
