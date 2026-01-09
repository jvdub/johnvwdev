export function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-fg shadow-elev hover:bg-surface2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      aria-label="Toggle theme"
    >
      <span className="text-fg-muted">Theme:&nbsp;</span>
      <span className="font-medium" data-theme-value />
    </button>
  );
}
