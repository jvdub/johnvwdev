export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function normalizeHeadingWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripMarkdownHeadingSyntax(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~]/g, "")
    .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, "$1");
}

export function normalizeHeadingText(value: string): string {
  return normalizeHeadingWhitespace(stripMarkdownHeadingSyntax(value));
}

export function slugifyHeading(value: string): string {
  const normalized = normalizeHeadingText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized.length > 0 ? normalized : "section";
}

export function createHeadingIdFactory() {
  const slugCounts = new Map<string, number>();

  return (headingText: string): string => {
    const baseSlug = slugifyHeading(headingText);
    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);
    return count === 0 ? baseSlug : `${baseSlug}-${count}`;
  };
}

export function extractTocHeadingsFromMdx(source: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const getHeadingId = createHeadingIdFactory();
  const lines = source.split(/\r?\n/);

  let inFencedCodeBlock = false;
  let fenceMarker: "```" | "~~~" | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inFencedCodeBlock) {
      const openingFence = trimmed.match(/^(```|~~~)/);
      if (openingFence) {
        inFencedCodeBlock = true;
        fenceMarker = openingFence[1] as "```" | "~~~";
        continue;
      }
    } else if (fenceMarker && trimmed.startsWith(fenceMarker)) {
      inFencedCodeBlock = false;
      fenceMarker = null;
      continue;
    } else {
      continue;
    }

    const headingMatch = line.match(/^\s{0,3}(##|###)\s+(.+?)\s*#*\s*$/);
    if (!headingMatch) {
      continue;
    }

    const level = headingMatch[1] === "##" ? 2 : 3;
    const text = normalizeHeadingText(headingMatch[2]);

    if (!text) {
      continue;
    }

    headings.push({
      level,
      text,
      id: getHeadingId(text),
    });
  }

  return headings;
}
