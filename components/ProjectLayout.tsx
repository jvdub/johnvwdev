import Link from "next/link";
import { ReactNode } from "react";
import { getGithubRepoCardUrl } from "./getGithubRepoCardUrl";
import RepoCard from "./RepoCard";

interface ProjectLayoutProps {
  title: string;
  githubUrl: string;
  children: ReactNode;
}

export default function ProjectLayout({
  title,
  githubUrl,
  children,
}: ProjectLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
      <header className="mb-6 sm:mb-8">
        <Link
          href="/projects"
          className="mb-3 inline-block text-sm text-fg-muted hover:underline"
        >
          ← Back to projects
        </Link>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* GitHub Repo Card */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label="GitHub repository card"
          >
            <RepoCard githubUrl={githubUrl} />
          </a>
        </div>
      </header>
      <div className="mdx-content space-y-6 sm:space-y-7">{children}</div>
    </article>
  );
}
