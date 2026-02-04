import { createHash } from "crypto";

/**
 * Generate SHA-256 hash of a script content for CSP script-src directive.
 * Returns the hash in the format required for CSP: 'sha256-<base64hash>'
 */
export function generateScriptHash(scriptContent: string): string {
  const hash = createHash("sha256").update(scriptContent).digest("base64");
  return `sha256-${hash}`;
}

/**
 * Build a CSP meta tag content attribute value.
 * Supports common directives and their allowlist.
 */
export interface CSPDirectives {
  "default-src"?: string[];
  "script-src"?: string[];
  "style-src"?: string[];
  "img-src"?: string[];
  "font-src"?: string[];
  "connect-src"?: string[];
  "frame-src"?: string[];
  "frame-ancestors"?: string[];
  "object-src"?: string[];
  "base-uri"?: string[];
  "form-action"?: string[];
  "upgrade-insecure-requests"?: string[];
  "worker-src"?: string[];
  "manifest-src"?: string[];
}

export function buildCSPContent(directives: CSPDirectives): string {
  return Object.entries(directives)
    .map(([key, values]) => {
      if (!values) return null;
      // Some directives like upgrade-insecure-requests don't need values
      if (values.length === 0) return key;
      return `${key} ${values.join(" ")}`;
    })
    .filter(Boolean)
    .join("; ");
}
