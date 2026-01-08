import "./globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "John Van Wagenen",
    template: "%s | John Van Wagenen",
  },
};

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
        <SiteHeader />
        <main className="mx-auto w-full max-w-content flex-1 px-4 py-8 sm:py-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
