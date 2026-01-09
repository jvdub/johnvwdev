import { AtSign, Github, Linkedin, X } from "lucide-react";

import { BlueskyIcon } from "../../components/BlueskyIcon";

export default function Contact() {
  return (
    <div className="flex flex-col gap-8">
      <section
        aria-label="Contact"
        className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
      >
        <h1 className="leading-tight">Contact</h1>
        <p className="mt-4 max-w-2xl text-lg text-fg-muted">
          The best way to reach me is on one of the platforms or email below.
        </p>
      </section>

      <section
        aria-label="Social links"
        className="grid w-full gap-4 sm:grid-cols-3"
      >
        <a
          href="https://x.com/jtvanwage"
          target="_blank"
          rel="noopener noreferrer me"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
            <X className="h-4 w-4" aria-hidden="true" />
            <span>X</span>
          </div>
          <p className="mt-2 text-base font-semibold text-fg">@jtvanwage</p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>

        <a
          href="https://www.linkedin.com/in/john-van-wagenen/"
          target="_blank"
          rel="noopener noreferrer me"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span>LinkedIn</span>
          </div>
          <p className="mt-2 text-base font-semibold text-fg">
            John Van Wagenen
          </p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>

        <a
          href="https://github.com/jvdub"
          target="_blank"
          rel="noopener noreferrer me"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </div>
          <p className="mt-2 text-base font-semibold text-fg">@jvdub</p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>

        <a
          href="https://bsky.app/profile/jtvanwage.bsky.social"
          target="_blank"
          rel="noopener noreferrer me"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
            <BlueskyIcon className="h-4 w-4" />
            <span>BlueSky</span>
          </div>
          <p className="mt-2 text-base font-semibold text-fg">
            @jtvanwage.bsky.social
          </p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>

        <a
          href="mailto:johnvwdev@gmail.com"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-muted">
            <AtSign className="h-4 w-4" aria-hidden="true" />
            <span>Email</span>
          </div>
          <p className="mt-2 text-base font-semibold text-fg">
            johnvwdev@gmail.com
          </p>
          <p className="mt-3 text-sm text-fg-muted">Send email →</p>
        </a>
      </section>
    </div>
  );
}
