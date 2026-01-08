import "./globals.css";

import type { ReactNode } from "react";

import { ThemeToggle } from "../components/ThemeToggle";

export const metadata = { title: "John Van Wagenen" };

const THEME_INIT_SCRIPT = `(() => {
  try {
    const key = "theme";
    const stored = window.localStorage.getItem(key);
    const hasStored = stored === "light" || stored === "dark";
    const system = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = hasStored ? stored : system;
    document.documentElement.dataset.theme = theme;
  } catch {
    // ignore
  }
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-content items-center justify-end px-4 py-3">
            <ThemeToggle />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
