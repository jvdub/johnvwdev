export const BLOG_POSTS_PER_PAGE = 10;

export function getBlogTotalPagesFromCount(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / BLOG_POSTS_PER_PAGE));
}
