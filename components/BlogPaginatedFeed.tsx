"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import type { Post } from "../lib/posts";
import {
  BLOG_POSTS_PER_PAGE,
  getBlogTotalPagesFromCount,
} from "../lib/blog-pagination";
import { BlogPagination } from "./BlogPagination";
import { BlogPostList } from "./BlogPostList";

type BlogPaginatedFeedProps = {
  posts: Post[];
  basePath?: string;
};

function parsePage(rawPage: string | null): number {
  if (!rawPage) {
    return 1;
  }

  const parsed = Number.parseInt(rawPage, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function BlogPaginatedFeed({
  posts,
  basePath = "/blog",
}: BlogPaginatedFeedProps) {
  const searchParams = useSearchParams();
  const requestedPage = parsePage(searchParams.get("page"));
  const totalPages = getBlogTotalPagesFromCount(posts.length);
  const currentPage = Math.min(requestedPage, totalPages);

  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
    const end = start + BLOG_POSTS_PER_PAGE;
    return posts.slice(start, end);
  }, [posts, currentPage]);

  return (
    <>
      <BlogPostList posts={visiblePosts} />
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hrefForPage={(page) =>
          page === 1 ? basePath : `${basePath}?page=${page}`
        }
      />
    </>
  );
}
