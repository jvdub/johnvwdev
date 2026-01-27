import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";
import type { Metadata } from "next";
import { SITE_URL, canonicalForPath } from "../../../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getProjectStoryBySlug("system-health-mcp");
  const title = frontmatter.title || "System Health MCP";
  const description =
    "Model Context Protocol server for system health monitoring.";
  const canonical = canonicalForPath("/projects/system-health-mcp");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "John Van Wagenen",
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator: "@jtvanwage",
    },
  };
}

export default async function SystemHealthMcpPage() {
  const { frontmatter, source } = getProjectStoryBySlug("system-health-mcp");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
