import Link from "next/link";
import { ReactNode } from "react";

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
        <h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View on GitHub →
          </a>
          <Link
            href="/projects"
            className="text-sm text-fg-muted hover:underline"
          >
            ← Back to projects
          </Link>
        </div>
      </header>
      <div className="mdx-content space-y-6 sm:space-y-7">{children}</div>
    </article>
  );
}
