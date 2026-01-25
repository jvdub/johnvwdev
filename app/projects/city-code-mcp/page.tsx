import ProjectLayout from "../../../components/ProjectLayout";
import { compilePostMdx } from "../../../lib/mdx";
import { getProjectStoryBySlug } from "../../../lib/projects";

export default async function CityCodeMcpPage() {
  const { frontmatter, source } = getProjectStoryBySlug("city-code-mcp");
  const content = await compilePostMdx(source);
  return (
    <ProjectLayout title={frontmatter.title} githubUrl={frontmatter.githubUrl}>
      {content}
    </ProjectLayout>
  );
}
