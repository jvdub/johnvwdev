import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

import { getAllPosts } from "../../lib/posts";
import { canonicalForPath, SITE_URL } from "../../lib/site";
import { TagList } from "../../components/Tag";
import { generateBreadcrumbSchema, renderJsonLd } from "../../lib/json-ld";

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
      {renderJsonLd(breadcrumbSchema)}
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
          <ul className="space-y-5">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="rounded-lg border border-border bg-surface px-5 py-4 text-left shadow-elev"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  {post.heroImage.trim().length > 0 ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block sm:w-56"
                      aria-label={post.title}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border bg-bg">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 640px) 224px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  ) : null}

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-sm text-fg-muted">
                      {post.date}
                    </div>
                    <h2 className="mb-1 text-2xl font-semibold tracking-tight">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-fg-muted">{post.description}</p>
                    <div className="mt-3">
                      <TagList tags={post.tags} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
