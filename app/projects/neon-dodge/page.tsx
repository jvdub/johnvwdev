import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";
import type { Metadata } from "next";
import { SITE_URL, canonicalForPath } from "../../../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getProjectStoryBySlug("neon-dodge");
  const title = frontmatter.title || "Neon Dodge";
  const description =
    "A neon-styled dodge game focused on quick reflexes, movement, and survival.";
  const canonical = canonicalForPath("/projects/neon-dodge");
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

export default async function NeonDodgePage() {
  const { frontmatter, source } = getProjectStoryBySlug("neon-dodge");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
