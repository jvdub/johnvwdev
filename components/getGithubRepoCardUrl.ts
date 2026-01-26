// Utility to generate GitHub Readme Stats repo card URL from a GitHub repo URL
export function getGithubRepoCardUrl(githubUrl: string, theme: string = "radical") {
  // Example: https://github.com/jvdub/system-health-mcp
  const match = githubUrl.match(/github.com\/(.+?)\/(.+?)(?:$|\/)/);
  if (!match) return "";
  const username = match[1];
  const repo = match[2];
  return `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}&theme=${theme}`;
}