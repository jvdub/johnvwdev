import Link from "next/link";

export default function Projects() {
  return (
    <div className="flex flex-col gap-8">
      <header className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
        <h1>Projects</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          A lightweight list for now. Individual project pages can come later.
        </p>
        <p className="mt-4">
          <Link href="/" className="text-sm">
            ← Back to home
          </Link>
        </p>
      </header>

      <section aria-label="Project list" className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-5 shadow-elev">
          <h2 className="text-xl font-semibold tracking-tight">Project One</h2>
          <p className="mt-2 text-fg-muted">Coming soon.</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5 shadow-elev">
          <h2 className="text-xl font-semibold tracking-tight">Project Two</h2>
          <p className="mt-2 text-fg-muted">Coming soon.</p>
        </div>
      </section>
    </div>
  );
}
