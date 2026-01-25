import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export function getProjectStoryBySlug(slug: string): {
  slug: string;
  frontmatter: Record<string, any>;
  source: string;
} {
  const storyPath = path.join(process.cwd(), "app", "projects", slug, "story.mdx");
  if (!fs.existsSync(storyPath)) {
    throw new Error(`Project story not found for slug '${slug}'.`);
  }
  const raw = fs.readFileSync(storyPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data,
    source: content,
  };
}
