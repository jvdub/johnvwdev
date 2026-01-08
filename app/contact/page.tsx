export default function Contact() {
  return (
    <div className="flex flex-col gap-8">
      <section
        aria-label="Contact"
        className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
      >
        <h1 className="leading-tight">Contact</h1>
        <p className="mt-4 max-w-2xl text-lg text-fg-muted">
          The best way to reach me is on one of the platforms below.
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
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
            X
          </p>
          <p className="mt-2 text-base font-semibold text-fg">@jtvanwage</p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>

        <a
          href="https://www.linkedin.com/in/john-van-wagenen/"
          target="_blank"
          rel="noopener noreferrer me"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
            LinkedIn
          </p>
          <p className="mt-2 text-base font-semibold text-fg">
            John Van Wagenen
          </p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>

        <a
          href="https://github.com/jvdub"
          target="_blank"
          rel="noopener noreferrer me"
          className="rounded-lg border border-border bg-surface p-5 no-underline shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
            GitHub
          </p>
          <p className="mt-2 text-base font-semibold text-fg">@jvdub</p>
          <p className="mt-3 text-sm text-fg-muted">Open profile →</p>
        </a>
      </section>
    </div>
  );
}
