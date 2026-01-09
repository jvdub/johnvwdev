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

const GA_MEASUREMENT_ID = "G-43P9QM2K0N";

const THEME_INIT_SCRIPT = `(() => {
  try {
    // Avoid double-binding in case this script ever runs again.
    if (window.__jvwThemeInit) return;
    window.__jvwThemeInit = true;

    const key = "theme";
    const isTheme = (v) => v === "light" || v === "dark";

    const readStored = () => {
      try {
        const v = window.localStorage.getItem(key);
        return isTheme(v) ? v : null;
      } catch {
        return null;
      }
    };

    const getSystem = () =>
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const apply = (theme) => {
      document.documentElement.dataset.theme = theme;

      const toggles = document.querySelectorAll("[data-theme-toggle]");
      toggles.forEach((btn) => {
        try {
          btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
          btn.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
          );
          const value = btn.querySelector("[data-theme-value]");
          if (value) value.textContent = theme;
        } catch {
          // ignore
        }
      });
    };

    const setStored = (theme) => {
      try {
        window.localStorage.setItem(key, theme);
      } catch {
        // ignore
      }
    };

    const initial = readStored() ?? getSystem();
    apply(initial);

    const onClick = (event) => {
      const target = event.target;
      const btn = target && target.closest ? target.closest("[data-theme-toggle]") : null;
      if (!btn) return;

      const current = document.documentElement.dataset.theme;
      const normalized = isTheme(current) ? current : (readStored() ?? getSystem());
      const next = normalized === "dark" ? "light" : "dark";
      apply(next);
      setStored(next);
    };

    // Use event delegation so buttons added later still work.
    document.addEventListener("click", onClick);
  } catch {
    // ignore
  }
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
          }}
        />
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
