import { ReactNode } from "react";

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * ExternalLink component for secure external links.
 *
 * Automatically adds rel="noopener noreferrer" to prevent:
 * - noopener: Prevents the new page from accessing the window.opener property
 * - noreferrer: Prevents the browser from sending the Referer header
 *
 * These attributes are crucial for security when opening links in a new tab.
 * This component enforces consistent security patterns across the site.
 *
 * Usage:
 * ```tsx
 * <ExternalLink href="https://example.com" target="_blank">
 *   Link text
 * </ExternalLink>
 * ```
 *
 * For additional rel attributes (like "me" for social profiles),
 * pass them via the rel prop and they will be merged with the security attributes.
 */
export function ExternalLink({
  href,
  children,
  rel,
  ...props
}: ExternalLinkProps) {
  // Merge rel attributes, ensuring noopener and noreferrer are always present
  const secureRel = rel ? `${rel} noopener noreferrer` : "noopener noreferrer";

  return (
    <a href={href} rel={secureRel} {...props}>
      {children}
    </a>
  );
}
