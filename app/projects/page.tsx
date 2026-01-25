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
          href="/projects/project-one"
          className="rounded-lg border border-border bg-surface p-5 shadow-elev hover:ring-2 hover:ring-blue-400 transition"
        >
          <h2 className="text-xl font-semibold tracking-tight">Project One</h2>
          <p className="mt-2 text-fg-muted">
            This portfolio website built with Next.js and TypeScript.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View details →
          </span>
        </Link>

        <Link
          href="/projects/system-health-mcp"
          className="rounded-lg border border-border bg-surface p-5 shadow-elev hover:ring-2 hover:ring-blue-400 transition"
        >
          <h2 className="text-xl font-semibold tracking-tight">
            System Health MCP
          </h2>
          <p className="mt-2 text-fg-muted">
            Model Context Protocol server for system health monitoring.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View details →
          </span>
        </Link>

        <Link
          href="/projects/city-code-mcp"
          className="rounded-lg border border-border bg-surface p-5 shadow-elev hover:ring-2 hover:ring-blue-400 transition"
        >
          <h2 className="text-xl font-semibold tracking-tight">
            City Code MCP
          </h2>
          <p className="mt-2 text-fg-muted">
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
