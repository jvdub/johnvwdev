import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllPosts } from "../../../../lib/posts";
import { canonicalForPath, SITE_URL } from "../../../../lib/site";
import { getBlogTotalPagesFromCount } from "../../../../lib/blog-pagination";
import { BlogPaginatedFeed } from "../../../../components/BlogPaginatedFeed";
import { generateBreadcrumbSchema, JsonLd } from "../../../../lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags)),
  ).sort();

  return allTags.map((tag) => ({
    tag: tag,
  }));
}

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);

  return {
    title: `Posts tagged with "${tag}" - Blog`,
    description: `Browse blog posts tagged with "${tag}".`,
    alternates: {
      canonical: canonicalForPath(`/blog/tags/${encodeURIComponent(tag)}`),
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getAllPosts();

  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  if (filteredPosts.length === 0) {
    notFound();
  }

  const totalPages = getBlogTotalPagesFromCount(filteredPosts.length);
  const encodedTag = encodeURIComponent(tag);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "Tags", url: `${SITE_URL}/blog/tags` },
    { name: tag },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} id={`breadcrumb-schema-tag-${tag}`} />
      <section>
        <header className="mb-8">
          <nav className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog/tags" className="hover:underline">
              Tags
            </Link>
            <span className="mx-2">/</span>
            <span>{tag}</span>
          </nav>
          <h1 className="mb-2">Posts tagged with &quot;{tag}&quot;</h1>
          <p className="text-fg-muted">
            Showing {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"} across {totalPages}{" "}
            {totalPages === 1 ? "page" : "pages"}.
          </p>
        </header>

        <BlogPaginatedFeed
          posts={filteredPosts}
          basePath={`/blog/tags/${encodedTag}`}
        />
      </section>
    </>
  );
}
