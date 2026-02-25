import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";
import type { Metadata } from "next";
import { SITE_URL, canonicalForPath } from "../../../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getProjectStoryBySlug("asteroids-evolved");
  const title = frontmatter.title || "Asteroids Evolved";
  const description = "An evolved take on the classic Asteroids arcade game.";
  const canonical = canonicalForPath("/projects/asteroids-evolved");
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

export default async function AsteroidsEvolvedPage() {
  const { frontmatter, source } = getProjectStoryBySlug("asteroids-evolved");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
