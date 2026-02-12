import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";
import type { Metadata } from "next";
import { canonicalForPath } from "../../../lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = getProjectStoryBySlug("jvw-resolutions");
  const title = frontmatter.title || "JVW Resolutions";
  const description = "Personal resolutions tracker project.";
  const canonical = canonicalForPath("/projects/jvw-resolutions");
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

export default async function JvwResolutionsPage() {
  const { frontmatter, source } = getProjectStoryBySlug("jvw-resolutions");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
