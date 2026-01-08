import Link from "next/link";
import type { Metadata } from "next";

import { getAllPosts } from "../../lib/posts";
import { canonicalForPath } from "../../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, AI, and building products.",
  alternates: {
    canonical: canonicalForPath("/blog"),
  },
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <section>
      <header className="mb-8">
        <h1 className="mb-2">Blog</h1>
        <p className="text-fg-muted">Notes on engineering, AI, and building.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-fg-muted">No posts yet.</p>
      ) : (
        <ul className="space-y-5">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-lg border border-border bg-surface px-5 py-4 text-left shadow-elev"
            >
              <div className="mb-1 text-sm text-fg-muted">{post.date}</div>
              <h2 className="mb-1 text-2xl font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-fg-muted">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
