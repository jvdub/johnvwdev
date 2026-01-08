import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { compilePostMdx } from "../../../lib/mdx";
import { getAllPosts, getPostSourceBySlug } from "../../../lib/posts";
import { canonicalForPath } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { frontmatter } = getPostSourceBySlug(params.slug);

    const canonical =
      frontmatter.canonicalUrl && frontmatter.canonicalUrl.trim().length > 0
        ? frontmatter.canonicalUrl
        : canonicalForPath(`/blog/${params.slug}`);

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      alternates: {
        canonical,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  let postSource: ReturnType<typeof getPostSourceBySlug>;

  try {
    postSource = getPostSourceBySlug(params.slug);
  } catch {
    notFound();
  }

  const content = await compilePostMdx(postSource.source);

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="mb-2">{postSource.frontmatter.title}</h1>
        <div className="text-sm text-fg-muted">
          {postSource.frontmatter.date}
        </div>
      </header>

      <div className="space-y-5">{content}</div>
    </article>
  );
}
