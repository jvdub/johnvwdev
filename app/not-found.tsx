import type { Metadata } from "next";
import Link from "next/link";

import { Search } from "../components/Search";
import { NotFoundSupport } from "../components/NotFoundSupport";
import { getAllSearchableContent } from "../lib/search";
import { getAllPosts } from "../lib/posts";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

const QUICK_LINKS = [
  {
    href: "/",
    label: "Home",
    description: "Return to the homepage and start fresh.",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Browse all articles and recent writing.",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Explore featured case studies and builds.",
  },
  {
    href: "/about",
    label: "About",
    description: "Learn more about John and his background.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Reach out if you need help finding something.",
  },
] as const;

function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export default function NotFound() {
  const searchItems = getAllSearchableContent();
  const recentPosts = getAllPosts().slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <section className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="leading-tight">Page not found</h1>
            <p className="mt-4 max-w-2xl text-fg-muted">
              The page you’re looking for doesn’t exist (or may have moved).
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <Search items={searchItems} />
          </div>
        </div>

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

      <NotFoundSupport items={searchItems} />

      <section aria-label="Recent posts" className="w-full">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2>Recent posts</h2>
            <Link href="/blog" className="text-sm">
              See all →
            </Link>
          </div>
          <div className="mt-3 h-1 w-12 rounded bg-accent" aria-hidden="true" />
          <p className="mt-4 text-fg-muted">
            Start with a recent article or browse the full archive.
          </p>

          <ul className="mt-6 grid gap-3" aria-label="Recent articles">
            {recentPosts.map((post) => (
              <li
                key={post.slug}
                className="rounded-md border border-border bg-surface-2 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
                  {formatPostDate(post.date)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-1 block font-medium text-fg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-sm text-fg-muted">{post.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Quick links" className="w-full">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2>Quick links</h2>
            <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">
              Top destinations
            </span>
          </div>
          <div className="mt-3 h-1 w-12 rounded bg-accent" aria-hidden="true" />
          <p className="mt-4 text-fg-muted">
            Jump to a core section of the site.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-border bg-surface-2 p-4 no-underline shadow-elev hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <p className="text-sm font-semibold text-fg">{item.label}</p>
                <p className="mt-1 text-sm text-fg-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
