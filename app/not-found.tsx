import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-8">
      <section className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
        <h1 className="leading-tight">Page not found</h1>
        <p className="mt-4 max-w-2xl text-fg-muted">
          The page you’re looking for doesn’t exist (or may have moved).
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Read the blog
          </Link>
        </div>
      </section>
    </div>
  );
}
