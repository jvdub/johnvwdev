"use client";

import { MdxImage, type MdxImageProps } from "./MdxImage";

type GalleryImage = MdxImageProps & {
  src: string;
};

type MdxGalleryProps = {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  variant?: "grid" | "carousel";
  zoom?: boolean;
  className?: string;
};

export function MdxGallery({
  images,
  columns = 2,
  variant = "grid",
  zoom = true,
  className,
}: MdxGalleryProps) {
  if (!Array.isArray(images) || images.length === 0) {
    throw new Error(
      "MDX gallery requires an images array with at least one image.",
    );
  }

  const variantClass =
    variant === "carousel" ? "mdx-gallery-carousel" : "mdx-gallery-grid";

  const columnClass = variant === "grid" ? `mdx-gallery-cols-${columns}` : "";

  const galleryClassName = [
    "mdx-gallery",
    columnClass,
    variantClass,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={galleryClassName}>
      {images.map((image, index) => (
        <MdxImage
          key={`${image.src}-${index}`}
          {...image}
          zoom={image.zoom ?? zoom}
          className="mdx-gallery-item"
        />
      ))}
    </div>
  );
}

export type { MdxGalleryProps };
