type RedirectFromValue = string | string[] | undefined | null;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export function normalizeRedirectFrom(value: unknown, context: string): string[] {
  if (value === undefined || value === null) return [];

  const list = typeof value === "string" ? [value] : isStringArray(value) ? value : null;
  if (!list) {
    throw new Error(
      `Invalid frontmatter for ${context}: 'redirectFrom' must be a string or string[].`,
    );
  }

  const cleaned = list.map((entry) => entry.trim());
  for (const entry of cleaned) {
    if (!entry) {
      throw new Error(
        `Invalid frontmatter for ${context}: 'redirectFrom' entries cannot be empty.`,
      );
    }
    if (isAbsoluteUrl(entry)) {
      throw new Error(
        `Invalid frontmatter for ${context}: 'redirectFrom' must be a path, not a full URL (${entry}).`,
      );
    }
    if (!entry.startsWith("/")) {
      throw new Error(
        `Invalid frontmatter for ${context}: 'redirectFrom' must start with '/'.`,
      );
    }
  }

  return cleaned;
}
