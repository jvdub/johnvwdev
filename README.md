# johnvwdev

Personal site built with Next.js (App Router) + TypeScript + Tailwind, exported as a fully static site.

## Quickstart

### Install

```bash
npm install
```

### Run locally (dev)

```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:3000`).

### Build (static export)

```bash
npm run build
```

Notes:

- `prebuild` runs `npm run generate:feeds` to update `public/sitemap.xml` and `public/rss.xml`.
- The static export output is written to the `out/` directory.

### Serve the exported site locally

```bash
npm run serve
```

This serves `out/` via `npx serve`.

## Adding a blog post

Published posts live in `content/posts/` as `.mdx` files.

### 1) Create a new MDX file

Create a file in `content/posts/`:

- Filename becomes the slug.
  - Example: `content/posts/my-new-post.mdx` → slug is `my-new-post`

### 2) Add required frontmatter

Every post must include this frontmatter schema:

- `title` (string)
- `date` (ISO date string)
- `description` (string)
- `tags` (string[])
- `draft` (boolean)
- `heroImage` (string; path/URL; may be empty)
- `canonicalUrl` (string; may be empty)

Minimal template:

```mdx
---
title: "My New Post"
date: "2026-01-08"
description: "One or two sentences that summarize the post."
tags: ["tag-one", "tag-two"]
draft: false
heroImage: ""
canonicalUrl: ""
---

Your content here.
```

### 3) Drafts vs published

- If `draft: true`, the post is excluded from the blog index and static generation.
- Draft writing can also live in `content/drafts/` (kept out of the published posts folder).

### 4) Verify

```bash
npm run build
```

If it builds cleanly, the post should be available at:

- `/blog/<slug>/` in the exported site
