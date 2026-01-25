import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";

export default async function SystemHealthMcpPage() {
  const { frontmatter, source } = getProjectStoryBySlug("system-health-mcp");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
