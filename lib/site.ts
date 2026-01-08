const DEFAULT_SITE_URL = "https://johnvw.dev";

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);

export function canonicalForPath(pathname: string): string {
  const base = SITE_URL;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
