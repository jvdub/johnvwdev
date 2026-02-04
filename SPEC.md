# Personal Site + Blog (Next.js, Static Export)

## Summary

Build a personal website for blog posts and projects using Next.js (App Router) and TypeScript, exported as a fully static site via `next export` (no server-side runtime). Blog content is authored as Markdown/MDX files committed to the repo.

## Goals

- Landing page
- Blog list page
- Individual article pages (MDX/Markdown)
- About page
- Contact page (social links only; no email/form handling yet)
- Tailwind CSS styling with dark/light mode
- Reuse the existing color system from `index.html`
- Minimal SEO metadata to start + generated `sitemap.xml` and RSS
- Google Analytics wired up (existing GA measurement id: `G-43P9QM2K0N`)

## Non-Goals (for initial version)

- Authentication
- Server-side rendering, ISR, or any runtime server functionality
- CMS integration (content is file-based)
- Search, tags/categories, pagination, related posts, 301 management
- Contact form submissions / emailing
- Rigorous ops/validation/CI checks

## Technical Decisions

- Framework: Next.js with App Router
- Language: TypeScript
- Rendering: static export only (`output: "export"`)
- Styling: Tailwind CSS
- Content: repo-hosted Markdown/MDX files
- URLs: lowercase, no trailing slashes, no dates in the URL

## IA / Routes

- `/` — Landing
- `/blog` — Blog index
- `/blog/[slug]` — Blog article
- `/about` — About me
- `/contact` — Contact + socials

## Content Model

### Post File Location

- Store posts in `content/posts/` (flat folder for v1).
- File extension: `.mdx` preferred; `.md` allowed.

### Frontmatter (Required)

Each post must define the following frontmatter fields:

- `title` (string)
- `date` (ISO date string; used for sorting and display)
- `description` (string; used on `/blog` and basic meta)
- `tags` (string[]; stored now, not necessarily displayed in v1)
- `draft` (boolean; should be `false` in `main`)
- `heroImage` (string; path/URL; optional for v1 display but reserved)
- `canonicalUrl` (string; optional; used for canonical meta if present)

Notes:

- Draft posts are managed via git branches; `main` contains published posts only.
- The site should not generate pages for `draft: true` posts.

### Slugs

**Decision (v1):** derive `slug` from filename (e.g. `content/posts/my-post.mdx` -> `my-post`).

#### Tradeoffs: filename-derived vs explicit slug

- Filename-derived (chosen):
  - Pros: simplest authoring; no duplicate “source of truth”; renames are obvious in git; fewer frontmatter mistakes.
  - Cons: renaming the file changes the URL (SEO/permalinks); harder to reorganize folders later without URL changes.
- Explicit `slug` in frontmatter:
  - Pros: stable URLs even if filenames change; enables reorganizing content without breaking links.
  - Cons: now you have two identifiers to keep consistent; risk of duplicate slugs; requires validation to avoid collisions.

**Future option:** if/when you care about permalinks and 301s, switch to explicit `slug` + add a `redirectFrom` list (and generate redirects at the hosting layer).

## Rendering & MDX

- Posts are compiled at build time only.
- MDX is unrestricted (authors can include arbitrary MDX/HTML). This is acceptable because content is trusted (repo-only).
- Add basic Markdown ergonomics (headings, lists, links, code blocks). Syntax highlighting and other enhancements can be deferred.

## Theming / Design

### Color System (must match current `index.html`)

Reuse the existing tokens:

- Brand: `--brand-navy` `#081a33`, `--brand-gold` `#caa64a`, `--brand-forest` `#0f2a1d`
- Theme variables: `--bg`, `--bg2`, `--surface`, `--surface2`, `--text`, `--muted`, `--border`, `--shadow`, `--accent`, `--accent2`, `--success`, `--focus`

Implementation guidance (v1):

- Keep these as CSS variables in `app/globals.css` (or equivalent).
- Tailwind should consume them either via theme extension (preferred) or via arbitrary values like `bg-[var(--bg)]`.

### Dark/Light Mode

- Support dark and light themes.
- Theme switching approach (v1): set `data-theme="dark" | "light"` on the root element and persist preference in `localStorage`.
- Respect system preference on first load.

### Typography

- Choose a readable, writing-forward layout with a max content width and comfortable line height.
- Do not introduce new fonts; start with system fonts.

## SEO (Minimal v1)

- Set per-page `<title>` and `<meta name="description">`.
- Blog posts use `title` and `description`.
- Only published posts are indexable; anything not published should not be generated.
- Generate:
  - `sitemap.xml`
  - RSS feed (e.g. `/rss.xml`)
  - `robots.txt` appropriate for production
- Canonicals:
  - Use `canonicalUrl` if present, otherwise the site URL + path.

## Analytics

- Include Google Analytics using the existing measurement id `G-43P9QM2K0N`.
- Load GA script in a way compatible with static export (e.g., `next/script`).

## Export & Hosting Notes (Amplify)

- Build output must be fully static.
- Next config must use `output: "export"`.
- Avoid server-only Next.js features (server actions, runtime API routes, dynamic rendering).
- Ensure routes and assets work when served from a static host.

## Acceptance Criteria

- Visiting `/` shows the landing content and navigation to Blog/About/Contact.
- `/blog` lists posts sorted by date descending.
- `/blog/[slug]` renders the MDX/Markdown content for that post.
- `/about` contains about-me content.
- `/contact` contains social links (no form submission).
- Site supports dark/light mode and uses the existing color palette.
- Site is readable and usable on mobile, tablet, and desktop (responsive typography and layout; navigation remains accessible without horizontal scrolling at common viewport widths).
- Static export completes successfully.
- `sitemap.xml` and RSS feed are generated at build time.

## Status & Future Development

**Current Status:** Initial build complete ✅

All v1 acceptance criteria met. The site is live and functional with:
- Blog with MDX support
- Projects section
- Dark/light theme
- Static export
- SEO basics (sitemap, RSS, metadata)
- Google Analytics

**Future Enhancements:** See [ROADMAP.md](ROADMAP.md) for planned features and improvements organized by priority.

**Risk Management:** See [RISKS.md](RISKS.md) for identified risks and mitigation strategies.
