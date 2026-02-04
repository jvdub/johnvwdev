# Risks & Mitigations

This document tracks potential risks for the personal website project, organized by category and severity.

**Risk Levels:**

- 🔴 **High:** Likely to occur or high impact if it does
- 🟡 **Medium:** Moderate likelihood or impact
- 🟢 **Low:** Unlikely or low impact

---

## Performance Risks

### 🟡 Unoptimized Images

**Risk:** Next.js image optimization disabled (`unoptimized: true` in config).

**Impact:** Large images could slow page load, especially on mobile/slow connections.

**Mitigation:**

- Verify all images are reasonably sized before upload
- Consider re-enabling Next.js image optimization for static export
- Add image size/format guidelines to content authoring docs
- Implement lazy loading for below-fold images

**Status:** Acceptable for current traffic; monitor performance

---

### 🟡 No Resource Hints for Third-Party Services

**Risk:** Missing `preconnect` for Google Analytics and other external resources.

**Impact:** Delayed loading of analytics and potential rendering delays.

**Mitigation:**

- Add `<link rel="preconnect">` for `google-analytics.com` and `googletagmanager.com`
- Add `dns-prefetch` as fallback
- Consider loading GA asynchronously with low priority

**Status:** Low impact; can be optimized later

---

### 🟢 Scalability of Blog Listing Page

**Risk:** Loading all blog posts on single page will slow down as content grows.

**Impact:** Poor UX and performance with 50+ posts on one page.

**Mitigation:**

- Implement pagination (planned in ROADMAP)
- Set reasonable page size (10-15 posts)
- Monitor page load times as content grows

**Status:** Not an issue yet (only 5 posts); pagination planned

---

## Maintenance Risks

### 🔴 No Redirect Management

**Risk:** Renaming posts/projects breaks existing URLs with no redirect mechanism.

**Impact:** Broken external links, lost SEO value, poor user experience.

**Mitigation:**

- Document that renames should be avoided (or done with care)
- Implement `redirectFrom` frontmatter field (planned in ROADMAP)
- Generate redirect rules for Amplify hosting
- Monitor 404s in analytics to catch broken links

**Status:** Accepted risk; mitigations planned

---

### 🟡 No Broken Link Checking

**Risk:** Internal or external links break over time without detection.

**Impact:** Poor UX, appears unmaintained, hurts SEO.

**Mitigation:**

- Add link checker to CI/CD (planned in ROADMAP)
- Manually audit links periodically
- Set up monitoring for 404 errors

**Status:** Manual audits only; automation planned

---

### 🟡 Slug Collision Risk

**Risk:** Two posts with same filename create routing conflicts.

**Impact:** Build errors or unpredictable routing behavior.

**Mitigation:**

- Implement slug collision detection (planned in ROADMAP - high priority)
- Use descriptive, unique filenames
- Test build locally before pushing

**Status:** Mitigated by careful naming; need automated detection

---

### 🟡 Outdated Dependencies

**Risk:** Dependencies fall behind, accumulating security vulnerabilities.

**Impact:** Security issues, compatibility problems, harder to update later.

**Current State:**

- TypeScript at 5.2.2 (current is 5.7+)
- Other dependencies may be outdated

**Mitigation:**

- Regular dependency updates (planned in ROADMAP)
- Set up Dependabot or Renovate for automated PRs
- Review and test updates monthly
- Run `npm audit` regularly

**Status:** Known issue; schedule regular updates

---

### 🟢 No Lock File Verification in Build

**Risk:** Build might use different dependency versions than intended.

**Impact:** Inconsistent builds, unexpected behavior in production.

**Mitigation:**

- Use `npm ci` instead of `npm install` in CI/CD
- Commit `package-lock.json` to repository
- Verify lock file integrity in build scripts

**Status:** Using `package-lock.json`; verify CI uses `npm ci`

---

## Data & Content Risks

### 🟡 Draft Posts Leaking to Production

**Risk:** Posts marked `draft: true` could be published accidentally.

**Impact:** Incomplete or unpolished content visible to visitors.

**Mitigation:**

- Filter drafts in `getAllPosts()` (currently implemented)
- Add automated test verifying drafts are excluded
- Use git branches for draft work
- Add visual warning in dev mode when viewing drafts

**Status:** Implemented but not tested; need automated verification

---

### 🟡 No Backup/Rollback Strategy

**Risk:** Bad deploy or content mistake with no easy rollback.

**Impact:** Downtime or incorrect content until fixed and redeployed.

**Mitigation:**

- Git is primary backup (all content in repo)
- Document Amplify rollback procedure
- Test rollback process
- Keep previous builds accessible in Amplify console
- Use git tags for releases

**Status:** Git provides backup; formalize rollback process

---

### 🟢 RSS Feed & Sitemap Accuracy

**Risk:** Generated feeds don't include all published posts or include drafts.

**Impact:** RSS subscribers miss content; search engines have incomplete index.

**Mitigation:**

- Validate RSS feed with W3C validator (planned in ROADMAP)
- Automated test to verify sitemap includes all published posts
- Manual spot-check after deploys

**Status:** Generation working; need validation

---

### 🟢 Canonical URL Inconsistencies

**Risk:** Some posts might not have canonical URLs set properly.

**Impact:** SEO confusion, duplicate content issues.

**Mitigation:**

- Default to site URL + path when `canonicalUrl` empty (currently implemented)
- Validate canonical URLs are absolute
- Audit all posts for canonical URL correctness

**Status:** Logic implemented; need content audit

---

## Accessibility & Standards Risks

### 🟡 Color Contrast Compliance

**Risk:** Color combinations might not meet WCAG AA/AAA standards.

**Impact:** Site difficult to read for users with vision impairments.

**Mitigation:**

- Audit color contrast with tools (Chrome DevTools, Lighthouse)
- Test dark theme especially (gold on dark blue)
- Adjust colors if needed to meet WCAG AA minimum
- Document color contrast ratios

**Status:** Needs audit; appears acceptable but not verified

---

### 🟡 Link Text Clarity for Screen Readers

**Risk:** Generic link text like "Open profile →" lacks context.

**Impact:** Screen reader users don't know link destination without surrounding context.

**Mitigation:**

- Add `aria-label` with descriptive text
- Or restructure link text to be more descriptive
- Use `sr-only` spans for additional context
- Audit all links for clarity

**Status:** Some links need improvement (e.g., contact page)

---

### 🟢 Heading Hierarchy

**Risk:** Improper h1→h2→h3 nesting breaks document structure.

**Impact:** Confusing for screen readers, poor SEO, accessibility issues.

**Mitigation:**

- Audit all pages for heading hierarchy
- Ensure single h1 per page
- No skipped heading levels
- Use semantic HTML

**Status:** Appears correct; needs formal audit

---

### 🟢 Alt Text for Images

**Risk:** Hero images or other images lack meaningful alt text.

**Impact:** Screen readers can't describe images; SEO impact.

**Mitigation:**

- Validate all images have alt text
- Add meaningful descriptions (not just filenames)
- Create authoring guidelines for alt text
- Add linting/validation for missing alt text

**Status:** Needs audit and enforcement

---

## Edge Cases & UX Risks

### 🟢 Timezone Display Confusion

**Risk:** Post dates use UTC but don't show timezone to readers.

**Impact:** Users in different timezones might see unexpected dates.

**Mitigation:**

- Post dates are already pinned to UTC midnight for stability
- Consider adding timezone indicator if international audience
- Document date handling in content authoring guide

**Status:** Current approach acceptable; revisit if needed

---

### 🟢 Empty State Handling

**Risk:** Pages like `/blog` or `/projects` with no content show broken/empty UI.

**Impact:** Poor UX, appears broken.

**Mitigation:**

- Add empty state components ("No posts yet")
- Test with empty content directories
- Show helpful message encouraging return later

**Status:** Unlikely but should add graceful handling

---

### 🟢 Long Content Stress Testing

**Risk:** Very long posts, titles, or tag names might break layout.

**Impact:** Overlapping text, broken responsive design.

**Mitigation:**

- Test with extremely long content
- Add CSS overflow handling
- Truncate with ellipsis where appropriate
- Set reasonable max-widths

**Status:** Appears robust but not stress-tested

---

### 🟢 Special Characters in Slugs

**Risk:** Filenames with special characters might create invalid URLs.

**Impact:** Broken links, routing errors, encoding issues.

**Mitigation:**

- Document filename conventions (lowercase, hyphens only)
- Add slug sanitization if needed
- Test with various filename patterns
- Validate slugs at build time

**Status:** Following conventions; add validation for safety

---

## Deployment & Infrastructure Risks

### 🟡 Trailing Slash Inconsistency

**Risk:** Config sets `trailingSlash: true` but internal links might not match.

**Impact:** Redirect loops, duplicate URLs, SEO confusion.

**Mitigation:**

- Audit all internal links for trailing slashes
- Use Next.js `<Link>` component consistently
- Test that all routes work with and without trailing slash
- Validate in Amplify that redirects work correctly

**Status:** Config set; need link audit

---

### 🟢 Build Failures Without Notification

**Risk:** Build fails in Amplify but not immediately noticed.

**Impact:** Outdated content stays live; new posts don't publish.

**Mitigation:**

- Set up Amplify build notifications (email/Slack)
- Monitor build status regularly
- Set up health checks or uptime monitoring
- Test builds locally before pushing

**Status:** Monitor Amplify console; formalize notifications

---

### 🟢 No Environment-Specific Configuration

**Risk:** Same config for dev and production could cause issues.

**Impact:** Dev-only features leak to production; hard to debug.

**Mitigation:**

- Use `process.env.NODE_ENV` checks where needed
- Document environment variables
- Test production builds locally before deploying

**Status:** Simple static site; low risk

---

## Action Items Summary

**Immediate Actions Needed:**

1. Implement CSP headers
2. Add slug collision detection
3. Audit external links for security attributes
4. Set up dependency update schedule
5. Add automated test for draft exclusion

**Short-Term (1-3 months):**

1. Run accessibility audit (color contrast, alt text, headings)
2. Implement redirect management
3. Add link checking to CI/CD
4. Update TypeScript and major dependencies
5. Validate RSS feed and sitemap

**Long-Term Monitoring:**

1. Watch page performance as content grows
2. Monitor 404 errors in analytics
3. Review and update risks quarterly
4. Track Web Vitals if traffic increases

---

**Last Updated:** February 3, 2026
**Next Review:** May 2026
