import type { Metadata } from "next";
import { ResponsiveImage } from "../../../components/ResponsiveImage";
import { notFound } from "next/navigation";

import { compilePostMdx } from "../../../lib/mdx";
import {
  getAllPosts,
  getPostSourceBySlug,
  getRelatedPosts,
} from "../../../lib/posts";
import { extractTocHeadingsFromMdx } from "../../../lib/toc";
import { formatReadingTime } from "../../../lib/reading-time";
import { AUTHOR_HANDLE, canonicalForPath, SITE_URL } from "../../../lib/site";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "../../../lib/json-ld";

import { ShareLinks } from "../../../components/ShareLinks";
import { ReadingProgressBar } from "../../../components/ReadingProgressBar";
import { TagList } from "../../../components/Tag";
import { RelatedPosts } from "../../../components/RelatedPosts";
import { TableOfContents } from "../../../components/TableOfContents";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { frontmatter } = getPostSourceBySlug(slug);

    const canonical =
      frontmatter.canonicalUrl && frontmatter.canonicalUrl.trim().length > 0
        ? frontmatter.canonicalUrl
        : canonicalForPath(`/blog/${slug}`);

    const imageUrl = frontmatter.heroImage?.startsWith("http")
      ? frontmatter.heroImage
      : `${canonicalForPath(frontmatter.heroImage)}`;

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      alternates: {
        canonical,
      },
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        url: canonical,
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
        siteName: "John Van Wagenen",
        publishedTime: frontmatter.date,
        tags: frontmatter.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: frontmatter.title,
        description: frontmatter.description,
        images: [imageUrl],
        creator: AUTHOR_HANDLE,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  let postSource: ReturnType<typeof getPostSourceBySlug>;

  const { slug } = await params;

  try {
    postSource = getPostSourceBySlug(slug);
  } catch {
    notFound();
  }

  const tocHeadings = extractTocHeadingsFromMdx(postSource.source);
  const content = await compilePostMdx(postSource.source, { addHeadingIds: true });
  const heroImage = postSource.frontmatter.heroImage.trim();
  const canonical =
    postSource.frontmatter.canonicalUrl &&
    postSource.frontmatter.canonicalUrl.trim().length > 0
      ? postSource.frontmatter.canonicalUrl
      : canonicalForPath(`/blog/${slug}`);

  const relatedPosts = getRelatedPosts(slug);

  // Generate JSON-LD inline to avoid wrapper divs
  const imageUrl = heroImage?.startsWith("http")
    ? heroImage
    : `${SITE_URL}${heroImage}`;

  const articleSchema = generateArticleSchema({
    title: postSource.frontmatter.title,
    description: postSource.frontmatter.description,
    url: canonical,
    imageUrl,
    datePublished: postSource.frontmatter.date,
    dateModified: postSource.frontmatter.date,
    keywords: postSource.frontmatter.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: postSource.frontmatter.title },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />
      <div className="print-hide">
        <ReadingProgressBar
          colorClass="bg-green-700"
          targetSelector="#post-content"
        />
      </div>
      <div className="print-hide hidden xl:block">
        <div
          className="fixed top-24 z-30 w-64 max-h-[calc(100vh-7rem)] overflow-y-auto"
          style={{
            left: "max(1rem, calc((100vw - var(--max)) / 2 - 16rem - 0.75rem))",
          }}
        >
          <TableOfContents headings={tocHeadings} variant="desktop-only" />
        </div>
      </div>
      <article
        id="post-content"
        className="mx-auto max-w-content text-base leading-7 sm:text-lg sm:leading-8"
      >
        <header className="mb-6 sm:mb-8">
          {heroImage.length > 0 ? (
            <div className="mb-5 overflow-hidden rounded-xl border border-border bg-surface shadow-elev">
              <div className="relative aspect-[16/9]">
                <ResponsiveImage
                  src={heroImage}
                  alt={postSource.frontmatter.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
          <h1 className="mb-2">{postSource.frontmatter.title}</h1>
          <div className="text-sm text-fg-muted">
            {postSource.frontmatter.date} · {formatReadingTime(postSource.readingTimeMinutes)}
          </div>
          <p className="print-only print-post-url">
            URL: <a href={canonical}>{canonical}</a>
          </p>
          <div className="mt-4">
            <TagList tags={postSource.frontmatter.tags} />
          </div>
          <ShareLinks
            url={canonical}
            title={postSource.frontmatter.title}
            handle={AUTHOR_HANDLE}
            className="mt-4 print-hide"
          />
          <div className="print-hide mt-4 xl:hidden">
            <TableOfContents headings={tocHeadings} variant="mobile-only" />
          </div>
        </header>

        <div className="mdx-content space-y-6 sm:space-y-7">{content}</div>
      </article>

      <div className="print-hide mx-auto max-w-content">
        <RelatedPosts posts={relatedPosts} />
      </div>
    </>
  );
}
