import Link from "next/link";

import { ThemeToggle } from "./ThemeToggle";
import { Search } from "./Search";
import { getAllSearchableContent } from "../lib/search";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const searchItems = getAllSearchableContent();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-content px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

          <div className="flex flex-1 items-center gap-3">
            <div className="flex-1">
              <Search items={searchItems} />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
