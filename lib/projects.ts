import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "app", "projects");

function getProjectDirs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => {
      const fullPath = path.join(PROJECTS_DIR, file);
      return fs.statSync(fullPath).isDirectory() && !file.startsWith(".");
    });
}

function detectProjectSlugCollisions(slugs: Array<{ slug: string; dirPath: string }>): void {
  const slugMap = new Map<string, string[]>();

  for (const { slug, dirPath } of slugs) {
    if (!slugMap.has(slug)) {
      slugMap.set(slug, []);
    }
    slugMap.get(slug)!.push(dirPath);
  }

  const collisions = Array.from(slugMap.entries())
    .filter(([_, dirPaths]) => dirPaths.length > 1);

  if (collisions.length > 0) {
    const conflictDetails = collisions
      .map(([slug, dirPaths]) => {
        const relativePaths = dirPaths.map((dp) => path.relative(process.cwd(), dp));
        return `  - Slug "${slug}":\n    ${relativePaths.map((p) => `• ${p}`).join("\n    ")}`;
      })
      .join("\n");

    throw new Error(
      `Project slug collision detected! Multiple project folders would create the same route:\n${conflictDetails}`,
    );
  }
}

export function getAllProjectSlugs(): string[] {
  const dirs = getProjectDirs();
  
  // Check for collisions - in this case directories themselves are the collision source
  const slugs = dirs.map((dir) => ({
    slug: dir,
    dirPath: path.join(PROJECTS_DIR, dir),
  }));
  
  detectProjectSlugCollisions(slugs);
  
  return dirs;
}

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
