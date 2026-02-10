import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { normalizeRedirectFrom } from "./redirects";

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  heroImage: string;
  canonicalUrl: string;
  redirectFrom?: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function assertFrontmatter(slug: string, data: unknown): PostFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error(`Invalid frontmatter for post '${slug}': expected object.`);
  }

  const record = data as Record<string, unknown>;

  const requiredString = (key: keyof PostFrontmatter) => {
    const value = record[key as string];
    if (typeof value !== "string") {
      throw new Error(
        `Invalid frontmatter for post '${slug}': '${String(key)}' must be a string.`,
      );
    }
    return value;
  };

  const title = requiredString("title");
  const date = requiredString("date");
  const description = requiredString("description");
  const heroImage = requiredString("heroImage");
  const canonicalUrl = requiredString("canonicalUrl");

  const draftValue = record.draft;
  if (typeof draftValue !== "boolean") {
    throw new Error(`Invalid frontmatter for post '${slug}': 'draft' must be boolean.`);
  }

  const tagsValue = record.tags;
  if (!Array.isArray(tagsValue) || tagsValue.some((t) => typeof t !== "string")) {
    throw new Error(
      `Invalid frontmatter for post '${slug}': 'tags' must be a string[].`,
    );
  }

  const redirectFrom = normalizeRedirectFrom(record.redirectFrom, `post '${slug}'`);

  // Basic sanity check; ISO date string expected (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}/.test(date)) {
    throw new Error(
      `Invalid frontmatter for post '${slug}': 'date' must be an ISO date string (YYYY-MM-DD).`,
    );
  }

  return {
    title,
    date,
    description,
    tags: tagsValue,
    draft: draftValue,
    heroImage,
    canonicalUrl,
    ...(redirectFrom.length > 0 ? { redirectFrom } : {}),
  };
}

export function getPostFilePaths(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map((filename) => path.join(POSTS_DIR, filename));
}

export function slugFromPostFilename(filename: string): string {
  return filename.replace(/\.(md|mdx)$/, "");
}

function detectSlugCollisions(posts: Array<{ slug: string; filePath: string }>): void {
  const slugMap = new Map<string, string[]>();

  for (const post of posts) {
    if (!slugMap.has(post.slug)) {
      slugMap.set(post.slug, []);
    }
    slugMap.get(post.slug)!.push(post.filePath);
  }

  const collisions = Array.from(slugMap.entries())
    .filter(([_, filePaths]) => filePaths.length > 1);

  if (collisions.length > 0) {
    const conflictDetails = collisions
      .map(([slug, filePaths]) => {
        const relativePaths = filePaths.map((fp) => path.relative(process.cwd(), fp));
        return `  - Slug "${slug}":\n    ${relativePaths.map((p) => `• ${p}`).join("\n    ")}`;
      })
      .join("\n");

    throw new Error(
      `Slug collision detected! Multiple files would create the same route:\n${conflictDetails}`,
    );
  }
}

export function getAllPosts(): Post[] {
  const filePaths = getPostFilePaths();

  // First, detect slug collisions before processing
  const slugCollisionCheck = filePaths.map((filePath) => ({
    slug: slugFromPostFilename(path.basename(filePath)),
    filePath,
  }));
  detectSlugCollisions(slugCollisionCheck);

  const posts: Post[] = filePaths
    .map((filePath) => {
      const filename = path.basename(filePath);
      const slug = slugFromPostFilename(filename);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      const frontmatter = assertFrontmatter(slug, data);

      return {
        slug,
        ...frontmatter,
      };
    })
    .filter((post) => post.draft === false)
    .sort((a, b) => {
      // Prefer ISO date strings; fall back to Date parsing.
      if (a.date === b.date) return 0;
      return a.date < b.date ? 1 : -1;
    });

  return posts;
}

export function getPostSourceBySlug(slug: string): {
  slug: string;
  frontmatter: PostFrontmatter;
  source: string;
} {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) {
    throw new Error(`Post not found for slug '${slug}'.`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = assertFrontmatter(slug, data);

  return {
    slug,
    frontmatter,
    source: content,
  };
}

/**
 * Get related posts based on shared tags.
 * Returns up to 5 posts with the most tag overlap, excluding the current post.
 */
export function getRelatedPosts(currentSlug: string, maxResults: number = 5): Post[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);

  if (!currentPost || currentPost.tags.length === 0) {
    return [];
  }

  const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()));

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const postTags = new Set(post.tags.map((t) => t.toLowerCase()));
      const sharedTags = Array.from(currentTags).filter((tag) => postTags.has(tag));
      const similarityScore = sharedTags.length;

      return {
        post,
        similarityScore,
        sharedTags,
      };
    })
    .filter((item) => item.similarityScore > 0)
    .sort((a, b) => {
      // Sort by similarity score (descending), then by date (newest first)
      if (b.similarityScore !== a.similarityScore) {
        return b.similarityScore - a.similarityScore;
      }
      return a.post.date < b.post.date ? 1 : -1;
    })
    .slice(0, maxResults)
    .map((item) => item.post);

  return relatedPosts;
}
