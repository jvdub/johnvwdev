# Stories / Work Breakdown

This file is the shared, persistent backlog for building the site described in `SPEC.md`.

Conventions:

- Each story has an ID (`S01`, `S02`, …), a short title, and a checklist box.
- Keep scope tight: if a story grows, split it.
- Update status by editing the checkbox and adding notes under **Progress**.

Status legend:

- [ ] Not started
- [~] In progress
- [x] Done

---

## Foundation

### [x] S01 — Scaffold Next.js app (App Router + TypeScript)

**Goal:** Initialize the Next.js project in this repo.

**Deliverables**

- Next.js app created (App Router enabled, TypeScript enabled).
- Local dev command works.

**Done when**

- `npm run dev` starts and renders a default page.
- `app/` directory exists and routes render.

**Notes/constraints**

- Target is a fully static site (`next export`), but that’s configured in a later story.

**Progress**

-

### [x] S02 — Add Tailwind CSS

**Goal:** Tailwind works across `app/` routes.

**Deliverables**

- Tailwind installed and configured.
- Global styles via `app/globals.css`.

**Done when**

- Tailwind utilities render in the UI.
- `npm run build` succeeds.

**Progress**

-

### [x] S03 — Port existing theme tokens from index.html

**Goal:** Reuse the current palette and token naming from `index.html`.

**Deliverables**

- CSS variables defined for brand + theme tokens:
  - Brand: `--brand-navy #081a33`, `--brand-gold #caa64a`, `--brand-forest #0f2a1d`
  - Theme: `--bg`, `--bg2`, `--surface`, `--surface2`, `--text`, `--muted`, `--border`, `--shadow`, `--accent`, `--accent2`, `--success`, `--focus`
- Light and dark token sets.

**Done when**

- UI uses the variables (no new hard-coded colors beyond these tokens for v1).

**Progress**

- Added legacy CSS variables (dark default + light overrides) in app/globals.css and mapped Tailwind theme utilities to them.

### [x] S04 — Theme toggle (dark/light)

**Goal:** Allow switching themes; persist choice.

**Deliverables**

- Header toggle control.
- `data-theme="dark"|"light"` set on the root.
- Persist to `localStorage`.

**Done when**

- First load defaults to system preference.
- Toggle changes theme immediately.

**Progress**

- Added a header theme toggle.
- Sets `data-theme="dark"|"light"` on `<html>`.
- Persists theme to `localStorage` and defaults to system preference on first load.

### [x] S05 — Layout shell (header/nav/footer) + responsive base

**Goal:** Consistent layout across pages, readable on mobile/tablet/desktop.

**Deliverables**

- Shared layout with navigation links:
  - Home, Blog, About, Contact
- Content max width + typography defaults.

**Done when**

- No horizontal scrolling at common viewport widths.
- Navigation remains usable on mobile.

**Progress**

- Implemented shared header/nav/footer shell.
- Extracted `components/SiteHeader.tsx` and `components/SiteFooter.tsx`.
- Centralized max width + responsive padding in `app/layout.tsx`.
- Added minimal typography/link defaults in `app/globals.css`.

## Pages

### [x] S06 — Landing page (`/`)

**Goal:** Initial home page structure and copy.

**Deliverables**

- Hero/intro section.
- Links to Blog and projects (projects can be placeholders).

**Done when**

- Looks good in both themes and is readable on mobile.

**Progress**

- Implemented hero/intro section and added Blog + Projects links.
- Added Writing + Consulting preview sections to reduce “empty page” feel.
- Added optional headshot image in hero (expects `public/jvw_headshot.jpg`).

### [x] S19 — Projects section (`/projects`)

**Goal:** Add a dedicated Projects section to match navigation and landing links.

**Deliverables**

- Projects page (`/projects`) with placeholder list.
- Primary navigation includes Projects.

**Done when**

- `/projects` renders with the shared layout and looks good in both themes.

**Progress**

- Added `/projects` route with placeholder items and wired header + home links.

### [x] S07 — About page (`/about`)

**Goal:** About-me content page.

**Deliverables**

- About page content placeholder.

**Done when**

- Styled with the shared layout.

**Progress**

- Implemented About hero card using shared layout styling.
- Reused headshot image and added a short “Now” section (no links).

### [x] S08 — Contact page (`/contact`) with socials only

**Goal:** Provide a way to reach you without form/email handling.

**Deliverables**

- Social links (e.g., X, GitHub, LinkedIn — whichever you choose).

**Done when**

- No form submission or email workflow exists.

**Progress**

- Implemented socials-only Contact page with external links to X, LinkedIn, and GitHub (no form/email workflow).

## Blog (MDX)

### [x] S09 — Create blog content folder + sample post

**Goal:** Establish content conventions.

**Deliverables**

- `content/posts/` created.
- At least one published `.mdx` sample post with required frontmatter.

**Required frontmatter**

- `title` (string)
- `date` (ISO date string)
- `description` (string)
- `tags` (string[])
- `draft` (boolean; must be `false` on `main`)
- `heroImage` (string; path/URL; may be empty in v1)
- `canonicalUrl` (string; may be empty in v1)

**Done when**

- Content file(s) exist and match the schema.

**Progress**

- Created `content/posts/` and added published sample post: `content/posts/demystifying-ai-in-engineering.mdx`.
- Added `content/drafts/` for in-progress writing (keeps drafts out of published posts folder).

### [x] S10 — Implement MDX/Markdown loading at build time

**Goal:** Parse frontmatter + compile MDX during build.

**Deliverables**

- Post loader utility:
  - Reads from `content/posts/`
  - Derives slug from filename
  - Sorts by date
  - Excludes drafts (`draft: true`)
- MDX compilation setup.

**Done when**

- Build succeeds and loader returns correct data.

**Progress**

- Added post loader utility in `lib/posts.ts` (reads `content/posts/`, derives slug, validates required frontmatter, filters drafts, sorts by date).
- Added MDX compilation helper in `lib/mdx.tsx` using `next-mdx-remote/rsc`.
- Build-time loader + MDX compilation are in place and `npm run build` succeeds.

### [x] S11 — Blog index page (`/blog`)

**Goal:** List published posts.

**Deliverables**

- List view sorted by date desc.
- Each item shows title, date, description.

**Done when**

- Only non-draft posts appear.
- Links go to the correct slug routes.

**Progress**

- Implemented `/blog` list view (published posts only) with title/date/description and links to slug pages.

### [x] S12 — Blog article pages (`/blog/[slug]`)

**Goal:** Render each post as a static page.

**Deliverables**

- Static params generation from posts.
- Article layout (header + content) optimized for reading.

**Done when**

- Published posts render correctly.
- Unknown slug returns 404 behavior.

**Progress**

- Added `app/blog/[slug]/page.tsx` with `generateStaticParams`, MDX rendering, and 404 for unknown slugs.

## Static export + minimal SEO

### [x] S13 — Minimal metadata (title + description + canonical)

**Goal:** Baseline metadata without going deep on SEO.

**Deliverables**

- Per-page metadata.
- Blog post metadata sourced from frontmatter.
- Canonical uses `canonicalUrl` if set; otherwise site URL + path.

**Done when**

- Pages have correct `<title>` and `<meta name="description">`.

**Progress**

- Added `/blog` and per-post metadata sourced from frontmatter.
- Canonical uses `canonicalUrl` if set; otherwise site URL + path.

### [x] S14 — Generate `sitemap.xml` and `rss.xml` at build time

**Goal:** Required outputs are produced for published posts.

**Deliverables**

- `sitemap.xml` generated (published routes only).
- `rss.xml` generated (published posts only).

**Done when**

- After export, these exist in the static output directory.

**Progress**

- Added build-time generator script (`npm run generate:feeds`) that writes `public/sitemap.xml` (static routes + published posts) and `public/rss.xml` (published posts only).
- Wired generation into `prebuild` so `npm run build` always produces the files.

### [x] S15 — Wire Google Analytics

**Goal:** Include GA using existing measurement id.

**Deliverables**

- GA script wiring for `G-43P9QM2K0N` using a static-export-friendly approach.

**Done when**

- Script is present in built HTML.

**Progress**

- Wired GA gtag loader + init scripts in `app/layout.tsx` for measurement ID `G-43P9QM2K0N`.
- Verified measurement ID appears in built output HTML.

### [x] S16 — Configure static export (`next export`)

**Goal:** Ensure the site exports as fully static.

**Deliverables**

- Next config uses `output: "export"`.
- All routes are compatible with export.

**Done when**

- `npm run build` produces a static export output.
- Pages can be served from a static host.

**Progress**

- Updated `next.config.js` to use `output: "export"` with `images.unoptimized` and `trailingSlash`.
- Verified `npm run build` generates a static `out/` directory containing exported routes.

## Final polish (v1)

### [x] S17 — Responsive readability pass

**Goal:** Satisfy SPEC responsiveness acceptance criteria.

**Deliverables**

- Tune typography/spacing for mobile/tablet/desktop.
- Ensure nav works well on small screens.

**Done when**

- No horizontal scrolling on common viewport widths.
- Blog articles are comfortable to read on phones.

**Progress**

- Tuned base typography for headings (smaller on mobile, scales at `sm`).
- Improved blog article readability with responsive font size/leading and slightly roomier content spacing.
- Added overflow guards for long URLs/words and made code blocks horizontally scrollable to prevent page-level horizontal scrolling.
- Made header nav more resilient on small screens (min-width handling + better tap targets).

### [ ] S20 — GA SPA pageview tracking

**Goal:** Record page views on client-side navigation (App Router).

**Deliverables**

- Client-side route change tracking that triggers a GA pageview on pathname/search changes.
- Uses the existing measurement ID `G-43P9QM2K0N` (no additional GA properties).
- Keeps static-export compatibility (no server-only dependencies).

**Done when**

- Navigating between routes (e.g., `/` → `/blog` → `/about`) triggers a page view event per navigation.

**Progress**

-

### [ ] S18 — Update README runbook

**Goal:** Make the repo self-serve for future sessions/agents.

**Deliverables**

- Document:
  - Install
  - `dev`, `build`, `export`
  - How to add a post + required frontmatter fields

**Done when**

- A new contributor can run the site and add a post using README alone.

**Progress**

-
