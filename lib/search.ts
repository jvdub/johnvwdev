import { getAllPosts } from "./posts";
import { getProjectStoryBySlug } from "./projects";

export type SearchableItem = {
  title: string;
  description: string;
  url: string;
  type: "post" | "project";
  tags?: string[];
  date?: string;
};

/**
 * Get all searchable content (blog posts and projects)
 * This runs at build time and can be used for client-side search
 */
export function getAllSearchableContent(): SearchableItem[] {
  const items: SearchableItem[] = [];

  // Add blog posts
  const posts = getAllPosts();
  posts.forEach((post) => {
    items.push({
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "post",
      tags: post.tags,
      date: post.date,
    });
  });

  // Add projects
  const projectSlugs = ["city-code-mcp", "johnvw-dev", "system-health-mcp"];
  projectSlugs.forEach((slug) => {
    try {
      const project = getProjectStoryBySlug(slug);
      items.push({
        title: project.frontmatter.title || slug,
        description: project.frontmatter.description || "",
        url: `/projects/${slug}`,
        type: "project",
      });
    } catch (error) {
      // Skip projects without story files
      console.warn(`Could not load project ${slug} for search index`);
    }
  });

  return items;
}
