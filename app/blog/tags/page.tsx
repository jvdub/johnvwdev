import Link from "next/link";
import type { Metadata } from "next";

import { getAllPosts } from "../../../lib/posts";
import { canonicalForPath, SITE_URL } from "../../../lib/site";
import { generateBreadcrumbSchema, renderJsonLd } from "../../../lib/json-ld";

export const metadata: Metadata = {
  title: "Tags - Blog",
  description: "Browse blog posts by tag.",
  alternates: {
    canonical: canonicalForPath("/blog/tags"),
  },
};

export default function TagsPage() {
  const posts = getAllPosts();

  // Count posts per tag
  const tagCounts = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  // Sort tags alphabetically
  const sortedTags = Array.from(tagCounts.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "Tags" },
  ]);

  return (
    <>
      {renderJsonLd(breadcrumbSchema)}
      <section>
        <header className="mb-8">
          <nav className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span>Tags</span>
          </nav>
          <h1 className="mb-2">Browse by Tag</h1>
          <p className="text-fg-muted">
            Explore {posts.length} blog {posts.length === 1 ? "post" : "posts"}{" "}
            across {sortedTags.length}{" "}
            {sortedTags.length === 1 ? "tag" : "tags"}.
          </p>
        </header>

        {sortedTags.length === 0 ? (
          <p className="text-fg-muted">No tags yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/blog/tags/${encodeURIComponent(tag)}`}
                className="group rounded-lg border border-border bg-surface px-5 py-4 shadow-elev transition-all hover:shadow-lg"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h2
                    className="text-lg font-semibold group-hover:underline"
                    style={{ color: "var(--text)" }}
                  >
                    {tag}
                  </h2>
                  <span
                    className="shrink-0 text-sm font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    {count} {count === 1 ? "post" : "posts"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
