import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";
import type { Metadata } from "next";
import { canonicalForPath } from "../../../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getProjectStoryBySlug("agent-command");
  const title = frontmatter.title || "Agentic Command";
  const description =
    "A desktop command center for running and monitoring multiple interactive AI agent sessions.";
  const canonical = canonicalForPath("/projects/agent-command");
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

export default async function AgentCommandPage() {
  const { frontmatter, source } = getProjectStoryBySlug("agent-command");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
