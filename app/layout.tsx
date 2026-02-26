import "./globals.css";

import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { GaPageView } from "../components/GaPageView";
import { WebVitalsReporter } from "../components/WebVitalsReporter";
import { ServiceWorkerRegistration } from "../components/ServiceWorkerRegistration";
import { OfflineIndicator } from "../components/OfflineIndicator";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { SITE_URL } from "../lib/site";
import { buildCSPContent } from "../lib/csp-utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "John Van Wagenen",
  description: "Personal site and engineering blog by John Van Wagenen.",
  manifest: "/manifest.webmanifest",
  title: {
    default: "John Van Wagenen",
    template: "%s | John Van Wagenen",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JohnVW",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#081a33" },
  ],
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

const GA_CONFIG_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`;

// Build CSP directive
// Note: 'unsafe-inline' is required for Next.js-generated inline scripts in static export.
const cspContent = buildCSPContent({
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'", // Required for Next.js inline scripts in static export
    "https://www.googletagmanager.com",
  ],
  "style-src": ["'self'", "'unsafe-inline'"], // Required for Tailwind
  "img-src": [
    "'self'",
    "data:",
    "https://github-readme-stats.vercel.app", // For GitHub repo cards
    "https://www.google-analytics.com", // GA tracking pixel
  ],
  "font-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://analytics.google.com", // GA4 endpoint
  ],
  "frame-src": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "upgrade-insecure-requests": [], // Auto-upgrade HTTP to HTTPS
  "worker-src": ["'self'"],
  "manifest-src": ["'self'"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: GA_CONFIG_SCRIPT,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content-link">
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <GaPageView measurementId={GA_MEASUREMENT_ID} />
        </Suspense>
        <WebVitalsReporter />
        <ServiceWorkerRegistration />
        <OfflineIndicator />
        <SiteHeader />
        <main
          id="main-content"
          className="mx-auto w-full max-w-content flex-1 px-4 py-8 sm:py-10"
        >
          {children}
        </main>
        <ScrollToTopButton />
        <SiteFooter />
      </body>
    </html>
  );
}
