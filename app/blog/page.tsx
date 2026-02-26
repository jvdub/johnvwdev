import Link from "next/link";
import type { Metadata } from "next";

import { BlogPaginatedFeed } from "../../components/BlogPaginatedFeed";
import { getAllPosts } from "../../lib/posts";
import { canonicalForPath, SITE_URL } from "../../lib/site";
import { generateBreadcrumbSchema, JsonLd } from "../../lib/json-ld";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, AI, and building products.",
  alternates: {
    canonical: canonicalForPath("/blog"),
  },
};

export default function Blog() {
  const posts = getAllPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema-blog" />
      <section>
        <header className="mb-8">
          <h1 className="mb-2">Blog</h1>
          <p className="text-fg-muted">
            Notes on engineering, AI, and building.
          </p>
          <p className="mt-2 text-sm">
            <Link href="/blog/tags" className="text-brand hover:underline">
              Browse by tag →
            </Link>
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-fg-muted">No posts yet.</p>
        ) : (
          <BlogPaginatedFeed posts={posts} />
        )}
      </section>
    </>
  );
}
