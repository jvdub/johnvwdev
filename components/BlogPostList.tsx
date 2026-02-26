import Link from "next/link";

import { formatReadingTime } from "../lib/reading-time";
import type { Post } from "../lib/posts";
import { ResponsiveImage } from "./ResponsiveImage";
import { TagList } from "./Tag";

type BlogPostListProps = {
  posts: Post[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
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
              <div className="mb-1 text-sm text-fg-muted">
                {post.date} · {formatReadingTime(post.readingTimeMinutes)}
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
  );
}
