import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { compilePostMdx } from "../../../lib/mdx";
import { getAllPosts, getPostSourceBySlug } from "../../../lib/posts";
import { AUTHOR_HANDLE, canonicalForPath } from "../../../lib/site";

import { ShareLinks } from "../../../components/ShareLinks";
import { ReadingProgressBar } from "../../../components/ReadingProgressBar";
import { TagList } from "../../../components/Tag";

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

  const content = await compilePostMdx(postSource.source);
  const heroImage = postSource.frontmatter.heroImage.trim();
  const canonical =
    postSource.frontmatter.canonicalUrl &&
    postSource.frontmatter.canonicalUrl.trim().length > 0
      ? postSource.frontmatter.canonicalUrl
      : canonicalForPath(`/blog/${slug}`);

  return (
    <>
      <ReadingProgressBar
        colorClass="bg-green-700"
        targetSelector="#post-content"
      />
      <article
        id="post-content"
        className="mx-auto max-w-3xl text-base leading-7 sm:text-lg sm:leading-8"
      >
        <header className="mb-6 sm:mb-8">
          {heroImage.length > 0 ? (
            <div className="mb-5 overflow-hidden rounded-xl border border-border bg-surface shadow-elev">
              <div className="relative aspect-[16/9]">
                <Image
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
            {postSource.frontmatter.date}
          </div>
          <div className="mt-4">
            <TagList tags={postSource.frontmatter.tags} />
          </div>
          <ShareLinks
            url={canonical}
            title={postSource.frontmatter.title}
            handle={AUTHOR_HANDLE}
            className="mt-4"
          />
        </header>

        <div className="mdx-content space-y-6 sm:space-y-7">{content}</div>
      </article>
    </>
  );
}
