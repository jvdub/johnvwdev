"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getCurrentTheme(): Theme {
  const dataTheme = document.documentElement.dataset.theme;
  if (dataTheme === "light" || dataTheme === "dark") return dataTheme;
  return readStoredTheme() ?? getSystemTheme();
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore (private mode, disabled storage, etc.)
  }
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(getCurrentTheme());
  }, []);

  const nextTheme: Theme | null = theme
    ? theme === "dark"
      ? "light"
      : "dark"
    : null;

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-fg shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      aria-pressed={theme === "dark"}
      aria-label={
        theme
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      onClick={() => {
        const current = theme ?? getCurrentTheme();
        const updated: Theme = current === "dark" ? "light" : "dark";
        setTheme(updated);
        setThemeState(updated);
      }}
    >
      <span className="text-fg-muted">Theme:&nbsp;</span>
      <span className="font-medium">{theme ?? "…"}</span>
    </button>
  );
}
