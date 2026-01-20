import { Linkedin, X } from "lucide-react";

import { BlueskyIcon } from "./BlueskyIcon";

type Props = {
  url: string;
  title: string;
  handle: string;
  className?: string;
};

function encode(value: string): string {
  return encodeURIComponent(value);
}

export function ShareLinks({ url, title, handle, className }: Props) {
  const shareText = `${title} ${handle}`;

  const xHref = `https://x.com/intent/tweet?url=${encode(url)}&text=${encode(
    shareText,
  )}`;
  const blueskyHref = `https://bsky.app/intent/compose?text=${encode(
    `${shareText} ${url}`,
  )}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encode(
    url,
  )}`;

  const itemClassName =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-fg shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

  return (
    <div className={className} aria-label="Share">
      <div className="flex items-center gap-2">
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="Share on X"
          className={itemClassName}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </a>

        <a
          href={blueskyHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Bluesky"
          title="Share on Bluesky"
          className={itemClassName}
        >
          <BlueskyIcon className="h-4 w-4" />
        </a>

        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
          className={itemClassName}
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
