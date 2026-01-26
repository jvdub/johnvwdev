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
        <Link
          href="/projects/johnvw-dev"
          className="rounded-lg border border-border bg-surface p-5 shadow-elev hover:ring-2 hover:ring-blue-400 transition no-underline"
        >
          <h2 className="text-xl font-semibold tracking-tight no-underline">
            johnvw.dev
          </h2>
          <p className="mt-2 text-fg-muted no-underline">
            This portfolio website built with Next.js and TypeScript.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View details →
          </span>
        </Link>

        <Link
          href="/projects/system-health-mcp"
          className="rounded-lg border border-border bg-surface p-5 shadow-elev hover:ring-2 hover:ring-blue-400 transition no-underline"
        >
          <h2 className="text-xl font-semibold tracking-tight no-underline">
            System Health MCP
          </h2>
          <p className="mt-2 text-fg-muted no-underline">
            Model Context Protocol server for system health monitoring.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View details →
          </span>
        </Link>

        <Link
          href="/projects/city-code-mcp"
          className="rounded-lg border border-border bg-surface p-5 shadow-elev hover:ring-2 hover:ring-blue-400 transition no-underline"
        >
          <h2 className="text-xl font-semibold tracking-tight no-underline">
            City Code MCP
          </h2>
          <p className="mt-2 text-fg-muted no-underline">
            Model Context Protocol server for city code and ordinance data.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View details →
          </span>
        </Link>
      </section>
    </div>
  );
}
