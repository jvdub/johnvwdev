import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "../lib/posts";

function formatPostDate(date: string): string {
  // Frontmatter dates are ISO (YYYY-MM-DD). Pin to UTC midnight for stability.
  const parsed = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      <section
        aria-label="Intro"
        className="w-full rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="leading-tight">
              <span className="text-xl font-semibold text-fg-muted sm:text-2xl">
                Hi, I’m
              </span>{" "}
              John Van Wagenen
            </h1>
            <p className="mt-4 text-lg text-fg-muted">
              I build software and lead teams. Currently focused on the
              pragmatic path from traditional full-stack to AI-integrated
              systems.
            </p>
          </div>

          <div className="shrink-0">
            <Image
              src="/jvw_headshot.jpg"
              alt="Headshot of John Van Wagenen"
              width={112}
              height={112}
              sizes="(min-width: 640px) 112px, 96px"
              className="h-24 w-24 rounded-full border border-border bg-surface-2 object-cover shadow-elev sm:h-28 sm:w-28"
              priority
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Read the blog
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg no-underline shadow-elev hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Contact
          </Link>
        </div>
      </section>

      <section aria-label="Blog" className="w-full">
        <div className="rounded-lg border border-border bg-surface p-6 shadow-elev sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2>Blog</h2>
            <Link href="/blog" className="text-sm">
              See all →
            </Link>
          </div>
          <div className="mt-3 h-1 w-12 rounded bg-accent" aria-hidden="true" />
          <p className="mt-4 text-fg-muted">
            A blog-first space for pragmatic notes, project write-ups, and
            occasional deep dives.
          </p>

          <ul className="mt-6 grid gap-3" aria-label="Recent articles">
            {latestPosts.map((post) => (
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
    </div>
  );
}
