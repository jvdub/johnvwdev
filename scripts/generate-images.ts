import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

import type { ImageManifestEntry, ImageVariant } from "../lib/generated/image-manifest";

const PROJECT_ROOT = process.cwd();
const PUBLIC_ROOT = path.join(PROJECT_ROOT, "public");
const IMAGES_ROOT = path.join(PUBLIC_ROOT, "images");
const OUTPUT_ROOT_IMAGES = path.join(IMAGES_ROOT, "generated");
const OUTPUT_ROOT_PUBLIC = path.join(PUBLIC_ROOT, "generated");
const MANIFEST_PATH = path.join(
  PROJECT_ROOT,
  "lib",
  "generated",
  "image-manifest.ts",
);

const SUPPORTED_EXTS = new Set([".png", ".jpg", ".jpeg"]);
const OUTPUT_WIDTHS = [480, 768, 1024, 1280, 1600];

function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

async function collectImages(dir: string, baseDir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const resolvedPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const relativeDir = path.relative(baseDir, resolvedPath);
      const normalizedRelativeDir = toPosixPath(relativeDir);

      if (
        normalizedRelativeDir === "generated" ||
        normalizedRelativeDir.startsWith("generated/") ||
        normalizedRelativeDir === "images/generated" ||
        normalizedRelativeDir.startsWith("images/generated/")
      ) {
        continue;
      }

      const nested = await collectImages(resolvedPath, baseDir);
      results.push(...nested);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTS.has(ext)) {
      results.push(resolvedPath);
    }
  }

  return results;
}

function buildOutputPath(
  outputRoot: string,
  relativeDir: string,
  baseName: string,
  width: number,
  format: string,
): string {
  return path.join(outputRoot, relativeDir, `${baseName}-${width}.${format}`);
}

function buildPublicSrc(
  publicPrefix: string,
  relativeDir: string,
  baseName: string,
  width: number,
  format: string,
): string {
  const relativePath = path.join(
    publicPrefix,
    relativeDir,
    `${baseName}-${width}.${format}`,
  );

  return `/${toPosixPath(relativePath)}`;
}

function variantFor(
  publicPrefix: string,
  relativeDir: string,
  baseName: string,
  width: number,
  height: number,
  format: string,
): ImageVariant {
  return {
    src: buildPublicSrc(publicPrefix, relativeDir, baseName, width, format),
    width,
    height,
  };
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function isUpToDate(sourcePath: string, outputPath: string) {
  try {
    const [sourceStat, outputStat] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(outputPath),
    ]);

    return outputStat.mtimeMs >= sourceStat.mtimeMs;
  } catch {
    return false;
  }
}

async function resizeAndWrite(
  sourcePath: string,
  outputPath: string,
  width: number,
  format: "avif" | "webp" | "jpg" | "png",
) {
  if (await isUpToDate(sourcePath, outputPath)) {
    return;
  }

  const pipeline = sharp(sourcePath).resize({ width, withoutEnlargement: true });

  switch (format) {
    case "avif":
      await pipeline.avif({ quality: 50 }).toFile(outputPath);
      break;
    case "webp":
      await pipeline.webp({ quality: 75 }).toFile(outputPath);
      break;
    case "jpg":
      await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(outputPath);
      break;
    case "png":
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(outputPath);
      break;
  }
}

async function generateVariants(
  sourcePath: string,
  outputRoot: string,
  publicPrefix: string,
  relativeDir: string,
  baseName: string,
  width: number,
  height: number,
  format: "avif" | "webp" | "jpg" | "png",
): Promise<ImageVariant> {
  const outputPath = buildOutputPath(
    outputRoot,
    relativeDir,
    baseName,
    width,
    format,
  );
  await ensureDir(path.dirname(outputPath));
  await resizeAndWrite(sourcePath, outputPath, width, format);

  return variantFor(publicPrefix, relativeDir, baseName, width, height, format);
}

async function generateManifest() {
  await ensureDir(OUTPUT_ROOT_IMAGES);
  await ensureDir(OUTPUT_ROOT_PUBLIC);

  const manifest: Record<string, ImageManifestEntry> = {};
  const files = await collectImages(PUBLIC_ROOT, PUBLIC_ROOT);

  for (const filePath of files) {
    const relativeToPublic = path.relative(PUBLIC_ROOT, filePath);
    const relativeDir = path.dirname(relativeToPublic);
    const normalizedRelativeDir = relativeDir === "." ? "" : relativeDir;
    const baseName = path.parse(filePath).name;

    if (
      normalizedRelativeDir === "generated" ||
      normalizedRelativeDir.startsWith("generated/") ||
      normalizedRelativeDir === "images/generated" ||
      normalizedRelativeDir.startsWith("images/generated/")
    ) {
      continue;
    }

    const isImagesSource = relativeToPublic.startsWith("images/");
    const outputRoot = isImagesSource ? OUTPUT_ROOT_IMAGES : OUTPUT_ROOT_PUBLIC;
    const publicPrefix = isImagesSource ? "images/generated" : "generated";
    const outputRelativeDir = isImagesSource
      ? path.dirname(path.relative(IMAGES_ROOT, filePath))
      : relativeDir;
    const normalizedOutputDir =
      outputRelativeDir === "." ? "" : outputRelativeDir;

    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) {
      continue;
    }

    const maxWidth = metadata.width;
    const aspectRatio = metadata.height / metadata.width;
    const effectiveWidths = OUTPUT_WIDTHS.filter((width) => width <= maxWidth);

    if (effectiveWidths.length === 0) {
      effectiveWidths.push(maxWidth);
    }

    const hasAlpha = Boolean(metadata.hasAlpha);
    const fallbackFormat: "jpg" | "png" = hasAlpha ? "png" : "jpg";

    const avifVariants: ImageVariant[] = [];
    const webpVariants: ImageVariant[] = [];
    const fallbackVariants: ImageVariant[] = [];

    for (const width of effectiveWidths) {
      const height = Math.round(width * aspectRatio);

      avifVariants.push(
        await generateVariants(
          filePath,
          outputRoot,
          publicPrefix,
          normalizedOutputDir,
          baseName,
          width,
          height,
          "avif",
        ),
      );

      webpVariants.push(
        await generateVariants(
          filePath,
          outputRoot,
          publicPrefix,
          normalizedOutputDir,
          baseName,
          width,
          height,
          "webp",
        ),
      );

      fallbackVariants.push(
        await generateVariants(
          filePath,
          outputRoot,
          publicPrefix,
          normalizedOutputDir,
          baseName,
          width,
          height,
          fallbackFormat,
        ),
      );
    }

    const publicSrc = `/${toPosixPath(relativeToPublic)}`;

    manifest[publicSrc] = {
      original: {
        src: publicSrc,
        width: metadata.width,
        height: metadata.height,
      },
      fallback: {
        format: fallbackFormat,
        variants: fallbackVariants,
      },
      webp: webpVariants,
      avif: avifVariants,
      hasAlpha,
    };
  }

  const manifestContent = `export type ImageVariant = {\n  src: string;\n  width: number;\n  height: number;\n};\n\nexport type ImageManifestEntry = {\n  original: ImageVariant;\n  fallback: {\n    format: \"jpg\" | \"png\";\n    variants: ImageVariant[];\n  };\n  webp: ImageVariant[];\n  avif: ImageVariant[];\n  hasAlpha: boolean;\n};\n\nexport const imageManifest: Record<string, ImageManifestEntry> = ${JSON.stringify(
    manifest,
    null,
    2,
  )};\n`;

  await fs.writeFile(MANIFEST_PATH, manifestContent, "utf-8");
}

generateManifest().catch((error) => {
  console.error("Failed to generate image variants", error);
  process.exit(1);
});
