# Roadmap

This document outlines planned features and enhancements for the personal website. Items are organized by priority and implementation complexity.

**Status Legend:**

- 🔴 Not Started
- 🟡 In Progress
- 🟢 Completed

---

## High Priority

### Search Functionality �

**Description:** Client-side search to help visitors find blog posts and project content.

**Implementation Options:**

- Fuse.js for lightweight fuzzy search ✅ (implemented)
- Pagefind for static site search indexing
- FlexSearch for fast in-memory search

**Acceptance Criteria:**

- Search bar accessible from main navigation ✅
- Results show post title, excerpt, and relevance ✅
- Keyboard navigable (arrow keys, enter to select) ✅
- Works with both blog posts and project pages ✅

**Completed:** February 5, 2026

---

### Tag/Category Filtering 🟢

**Description:** Enable filtering blog posts by tags (already collected in frontmatter but not displayed).

**Tasks:**

- Display tags on blog post pages ✅
- Create tag index/listing page at `/blog/tags` ✅
- Add tag-based filtering on `/blog` page ✅ (static tag pages at `/blog/tags/[tag]`)
- Generate tag pages at `/blog/tags/[tag]` or use client-side filtering ✅ (static generation with `generateStaticParams`)
- Update sitemap generation to include tag pages ✅

**Acceptance Criteria:**

- Tags visible on individual posts and blog index ✅
- Clicking a tag filters/navigates to posts with that tag ✅
- Tag pages have proper SEO metadata ✅

**Completed:** February 5, 2026

**Implementation Details:**

- Created [components/Tag.tsx](components/Tag.tsx) with `Tag` and `TagList` components
- Updated [app/blog/page.tsx](app/blog/page.tsx) to display tags and link to `/blog/tags`
- Created [app/blog/tags/page.tsx](app/blog/tags/page.tsx) with tag index showing all tags with post counts
- Created [app/blog/tags/[tag]/page.tsx](app/blog/tags/%5Btag%5D/page.tsx) for static generation of individual tag pages
- Updated sitemap generation script to include all tag pages
- All pages are 100% static with no runtime dependencies

---

### Code Syntax Highlighting 🔴

**Description:** Add syntax highlighting for code blocks in blog posts.

**Implementation Options:**

- Shiki (modern, VS Code themes)
- Prism.js (lightweight, popular)
- Highlight.js (simple, works well with MDX)

**Tasks:**

- Choose and integrate syntax highlighter
- Add language-specific styling
- Support theme-aware code blocks (dark/light mode)
- Test with all languages used in blog posts

**Acceptance Criteria:**

- Code blocks properly highlighted with language detection
- Syntax highlighting matches site theme (dark/light)
- Common languages supported (TypeScript, JavaScript, Python, bash, etc.)

---

### Slug Collision Detection �

**Description:** Prevent duplicate filenames from creating conflicting routes.

**Tasks:**

- Add validation in `getAllPosts()` to detect duplicate slugs ✅
- Fail build if collision detected ✅
- Log helpful error message with conflicting file paths ✅
- Extend to projects if/when more projects are added ✅

**Acceptance Criteria:**

- Build fails with clear error if duplicate slugs exist ✅
- Error message identifies both conflicting files ✅
- No runtime issues from slug conflicts ✅

**Completed:** February 5, 2026

**Implementation Details:**

- Added `detectSlugCollisions()` validation helper in [lib/posts.ts](lib/posts.ts) that checks for duplicate post slugs before processing
- Updated `getAllPosts()` to run collision detection early; lists all conflicting files with relative paths
- Extended functionality to projects with `getAllProjectSlugs()` and `detectProjectSlugCollisions()` in [lib/projects.ts](lib/projects.ts)
- Error messages clearly identify the slug and all files creating that slug
- Bill fails at build time with clear error diagnostics if any collisions are detected
- No performance impact; validation runs once at build time

---

## Medium Priority

### Blog Pagination 🔴

**Description:** Split blog listing into pages as content grows (currently showing all posts on one page).

**Tasks:**

- Add pagination component
- Create `/blog/page/[number]` routes or use client-side pagination
- Decide page size (10-15 posts per page recommended)
- Update sitemap to include pagination pages
- Add prev/next navigation
- Handle SEO (canonical URLs, rel=prev/next)

**Acceptance Criteria:**

- Blog index shows limited posts per page
- Pagination controls clear and accessible
- URL structure supports direct linking to page numbers
- First page is `/blog`, subsequent pages are `/blog/page/2`, etc.

---

### Related Posts �

**Description:** Show similar articles at the end of blog posts based on shared tags or content.

**Tasks:**

- Implement similarity algorithm (tag overlap or semantic similarity) ✅
- Design related posts component (3-5 recommendations) ✅
- Add to blog post layout ✅
- Ensure related posts are from published content only ✅ (filtered via `getAllPosts()`)
- Optimize for static generation (pre-compute at build time) ✅

**Acceptance Criteria:**

- Related posts appear at end of each blog post ✅
- Recommendations are relevant (shared tags or similar content) ✅
- Gracefully handles posts with no matches ✅ (component returns null if no related posts)
- No performance impact on build time ✅

**Completed:** February 5, 2026

**Implementation Details:**

- Created `getRelatedPosts(slug)` utility function in [lib/posts.ts](lib/posts.ts) that calculates tag overlap similarity
- Created [components/RelatedPosts.tsx](components/RelatedPosts.tsx) component displaying 3-5 related posts in card format
- Added RelatedPosts component to [app/blog/[slug]/page.tsx](app/blog/%5Bslug%5D/page.tsx)
- Algorithm sorts by shared tag count, then by publication date
- Handles edge cases: posts with no tags, only one post available, etc.
- All static generation with no runtime performance impact

---

### JSON-LD Structured Data �

**Description:** Add Schema.org markup for better search engine understanding.

**Tasks:**

- Add Article schema to blog posts ✅
- Add Person schema to about page ✅
- Add WebSite schema to homepage ✅
- Add BreadcrumbList schema for navigation ✅
- Validate with Google's Rich Results Test

**Acceptance Criteria:**

- JSON-LD scripts present in page head ✅
- Validates without errors in Rich Results Test (to be tested)
- Includes all required and recommended properties ✅
- Blog posts have article metadata (author, publish date, etc.) ✅

**Completed:** February 5, 2026

**Implementation Details:**

- Created [lib/json-ld.tsx](lib/json-ld.tsx) with utility functions for generating Schema.org structured data
- Added `generateArticleSchema()`, `generatePersonSchema()`, `generateWebSiteSchema()`, and `generateBreadcrumbSchema()` utilities
- Updated [app/blog/[slug]/page.tsx](app/blog/%5Bslug%5D/page.tsx) to include Article and BreadcrumbList schemas
- Updated [app/about/page.tsx](app/about/page.tsx) to include Person and BreadcrumbList schemas
- Updated [app/page.tsx](app/page.tsx) to include WebSite schema with SearchAction
- Added BreadcrumbList schemas to all major pages: blog index, tag pages, projects, and contact
- All structured data is statically generated at build time for optimal performance
- Person schema includes education (alumni) and social media links (sameAs)
- Article schema includes keywords (tags), publication dates, and proper author/publisher information

---

### Reading Time Estimates 🔴

**Description:** Display estimated reading time on blog posts.

**Tasks:**

- Calculate word count from MDX content
- Use standard reading speed (200-250 words/minute)
- Display on blog index and post pages
- Round to nearest minute (show "< 1 min" for very short posts)

**Acceptance Criteria:**

- Reading time visible on blog index cards
- Reading time shown near publish date on post pages
- Calculation accurate and reasonable

---

### Copy Code Button 🔴

**Description:** Add "Copy" button to code blocks for easy copying.

**Tasks:**

- Create CopyButton component
- Integrate with code block rendering
- Add visual feedback (copied confirmation)
- Handle keyboard accessibility
- Style to match site theme

**Acceptance Criteria:**

- Copy button appears on hover/focus of code blocks
- Click copies code to clipboard
- Visual confirmation shown ("Copied!")
- Works on mobile (tap to copy)
- Keyboard accessible

---

### Table of Contents 🔴

**Description:** Auto-generate TOC for longer blog posts from heading structure.

**Tasks:**

- Parse MDX headings to build TOC structure
- Create TOC component with anchor links
- Add smooth scrolling to headings
- Make sticky on desktop, collapsible on mobile
- Highlight current section while scrolling

**Acceptance Criteria:**

- TOC shows h2 and h3 headings
- Links scroll smoothly to sections
- Current section highlighted
- Responsive design (mobile-friendly)

---

## Low Priority

### Scroll to Top Button 🔴

**Description:** Floating button to quickly return to top of long pages.

**Tasks:**

- Create ScrollToTop component
- Show/hide based on scroll position
- Add smooth scroll behavior
- Style to match site design
- Make accessible (keyboard + screen reader)

---

### Print Stylesheet 🔴

**Description:** Optimize blog posts for printing/PDF generation.

**Tasks:**

- Add print-specific CSS
- Hide navigation, footer, share buttons when printing
- Ensure code blocks and images print well
- Add page break controls for long posts
- Include post URL in printed version

---

### Keyboard Navigation Enhancements 🔴

**Description:** Improve keyboard accessibility throughout site.

**Tasks:**

- Add skip-to-content link
- Improve focus indicators (more visible)
- Test tab order on all pages
- Add keyboard shortcuts for common actions
- Ensure all interactive elements are keyboard accessible

---

### Offline Support �

**Description:** Enable basic offline reading with service worker.

**Tasks:**

- Implement service worker for static assets ✅
- Cache blog posts for offline reading ✅
- Show offline indicator when network unavailable ✅
- Handle cache invalidation on updates ✅
- Test offline functionality ✅

**Acceptance Criteria:**

- Service worker caches static assets and pages ✅
- Network-first strategy for blog posts (fresh content when online) ✅
- Cache-first strategy for static assets (faster loading) ✅
- Offline indicator appears when network is lost ✅
- Indicator shows "Back online" message when reconnected ✅
- Offline fallback page shown for uncached pages ✅
- Old caches automatically cleaned up on service worker update ✅

**Completed:** February 5, 2026

**Implementation Details:**

- Created [public/sw.js](public/sw.js) service worker with cache-first and network-first strategies
- Implemented automatic cache versioning and cleanup of old caches
- Created [public/offline.html](public/offline.html) fallback page with auto-retry on reconnection
- Built [components/OfflineIndicator.tsx](components/OfflineIndicator.tsx) to show network status
- Created [lib/service-worker.ts](lib/service-worker.ts) with registration utilities
- Added [components/ServiceWorkerRegistration.tsx](components/ServiceWorkerRegistration.tsx) client component
- Updated [app/layout.tsx](app/layout.tsx) to include service worker registration and offline indicator
- Service worker only registers in production builds
- CSP headers already include `worker-src: 'self'` for service worker support
- All features work with static export build output

---

### Web Vitals Tracking 🟢

**Description:** Send Core Web Vitals to analytics for performance monitoring.

**Tasks:**

- Integrate web-vitals library
- Send metrics to Google Analytics
- Track LCP, FID, CLS, TTFB
- Set up dashboards/alerts for regressions
- Monitor and optimize based on data

**Completed:** February 6, 2026

**Implementation Details:**

- Added [components/WebVitalsReporter.tsx](components/WebVitalsReporter.tsx) to collect Core Web Vitals
- Sends `gtag('event', metric.name, ...)` events to the existing GA4 property
- Tracks LCP, FID, CLS, and TTFB with CLS scaled to an integer for GA
- Wired reporter into [app/layout.tsx](app/layout.tsx) so it runs on all pages

---

### Code Footnotes Support 🔴

**Description:** Add support for footnotes in blog posts (common in technical writing).

**Tasks:**

- Add remark plugin for footnotes
- Style footnotes to match site theme
- Add back-references from footnotes to text
- Test with various footnote patterns

---

### Image Enhancements 🟢

**Description:** Improve image handling with captions and zoom functionality.

**Tasks:**

- Create MDX image component with caption support ✅
- Add click-to-zoom functionality ✅
- Support image galleries/carousels ✅
- Add loading states for images ✅
- Optimize alt text enforcement ✅

**Completed:** February 6, 2026

**Implementation Details:**

- Added `MdxImage` and `MdxGallery` MDX components with caption, zoom, and gallery support
- Wired MDX compilation to use the new image and gallery components
- Added global styles for image frames, loading shimmer, and zoom overlay
- Documented MDX usage in README

---

### Rich Embeds 🔴

**Description:** Support embedding external content (YouTube, CodePen, GitHub Gists, Tweets).

**Tasks:**

- Create embed components for each platform
- Add MDX support for embed syntax
- Implement privacy-friendly embeds (click to load)
- Style embeds to match site theme
- Handle embed failures gracefully

---

### Callouts/Admonitions 🔴

**Description:** Add styled info boxes for warnings, tips, notes in blog posts.

**Tasks:**

- Create Callout MDX component
- Support multiple types (info, warning, tip, danger)
- Add icons for each type
- Style to match site theme
- Document usage for content authoring

---

### 404 Page Enhancement 🟢

**Description:** Make 404 page more helpful with search and navigation suggestions.

**Tasks:**

- Add search functionality to 404 page
- Show recent blog posts
- Add navigation links
- Suggest similar pages based on URL
- Track 404s in analytics

**Completed:** February 9, 2026

---

### Redirect Management 🔴

**Description:** Handle URL changes when posts/projects are renamed.

**Tasks:**

- Add `redirectFrom` field to frontmatter
- Generate redirects at build time (Amplify format)
- Create redirect mapping file
- Document redirect process in SPEC
- Test redirect functionality

---

### RSS Feed Validation 🔴

**Description:** Ensure RSS feed conforms to spec and validates.

**Tasks:**

- Run feed through W3C validator
- Fix any validation errors
- Add missing recommended fields
- Test in various feed readers
- Document feed URL prominently

---

### Dependency Updates 🔴

**Description:** Regular maintenance of project dependencies.

**Tasks:**

- Update TypeScript to latest stable (5.7+)
- Update Next.js to latest
- Update all dependencies with `npm outdated`
- Run `npm audit` and fix vulnerabilities
- Set up Dependabot or Renovate for automated PRs
- Test thoroughly after updates

---

## Completed Features

_(This section will track completed items as they're implemented)_

---

## Notes

- Features marked 🔴 are not started
- Update status as work progresses
- Add completion dates when features are finished
- Link to PRs/commits for implemented features
- Review and reprioritize quarterly
