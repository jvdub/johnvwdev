import Link from "next/link";
import type { Metadata } from "next";
import { ResponsiveImage } from "../../../../components/ResponsiveImage";
import { notFound } from "next/navigation";

import { getAllPosts } from "../../../../lib/posts";
import { canonicalForPath, SITE_URL } from "../../../../lib/site";
import { TagList } from "../../../../components/Tag";
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
            {filteredPosts.length === 1 ? "post" : "posts"}.
          </p>
        </header>

        <ul className="space-y-5">
          {filteredPosts.map((post) => (
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
                      <ResponsiveImage
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
                  <div className="mb-1 text-sm text-fg-muted">{post.date}</div>
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
      </section>
    </>
  );
}
