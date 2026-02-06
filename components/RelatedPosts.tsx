import Link from "next/link";
import type { Post } from "../lib/posts";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <aside className="mt-12 border-t border-border pt-8 sm:pt-10">
      <h2 className="mb-6 text-xl font-semibold sm:text-2xl">Related Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-border p-4 transition-all hover:border-text hover:bg-surface-hover no-underline sm:p-5"
            >
              <h3 className="mb-2 font-medium text-text">{post.title}</h3>
              <p className="mb-3 text-sm text-fg-muted line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-xs text-fg-muted">
                <span>{post.date}</span>
                <span className="rounded-full bg-surface-hover px-2 py-1">
                  {post.tags.length} {post.tags.length === 1 ? "tag" : "tags"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
