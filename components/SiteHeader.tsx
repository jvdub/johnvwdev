import Link from "next/link";

import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-fg no-underline hover:text-fg"
          >
            John Van Wagenen
          </Link>

          <nav
            aria-label="Primary"
            className="min-w-0 flex flex-wrap gap-x-4 gap-y-2"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="-mx-1 -my-1 rounded-md px-1 py-1 text-sm text-fg-muted no-underline hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
