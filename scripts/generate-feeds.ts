import fs from "node:fs";
import path from "node:path";

import { getAllPosts } from "../lib/posts";
import { SITE_URL, canonicalForPath } from "../lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function rfc822DateFromIsoDate(dateIso: string): string {
  const date = new Date(`${dateIso}T00:00:00.000Z`);
  return date.toUTCString();
}

function writeFileEnsuringDir(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

type SitemapEntry = {
  pathname: string;
  lastmod: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

const STATIC_PATHS: string[] = ["/", "/about", "/blog", "/blog/tags", "/contact", "/projects"];

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const loc = canonicalForPath(entry.pathname);
      const lastmod = entry.lastmod;
      const changefreq = entry.changefreq;
      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
        changefreq ? `    <changefreq>${escapeXml(changefreq)}</changefreq>` : "",
        "  </url>",
      ].join("\n");
    })
    .map((block) => block.replace(/^\s*\n/gm, ""))
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function generateRssXml(posts: ReturnType<typeof getAllPosts>): string {
  const channelTitle = "John Van Wagenen";
  const channelLink = SITE_URL;
  const channelDescription = "Writing and projects by John Van Wagenen.";

  const mostRecentDate = posts.length > 0 ? posts[0].date : isoDateOnly(new Date());
  const lastBuildDate = rfc822DateFromIsoDate(mostRecentDate);

  const items = posts
    .map((post) => {
      const link = post.canonicalUrl?.trim()
        ? post.canonicalUrl.trim()
        : canonicalForPath(`/blog/${post.slug}`);

      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(rfc822DateFromIsoDate(post.date))}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(channelTitle)}</title>`,
    `    <link>${escapeXml(channelLink)}</link>`,
    `    <description>${escapeXml(channelDescription)}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

function main(): void {
  const posts = getAllPosts();

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags)),
  ).sort();

  const buildDate = isoDateOnly(new Date());
  const sitemapEntries: SitemapEntry[] = [
    ...STATIC_PATHS.map((pathname) => ({
      pathname,
      lastmod: buildDate,
      changefreq: pathname === "/" || pathname === "/blog" ? "weekly" : undefined,
    })),
    ...posts.map((post) => ({ pathname: `/blog/${post.slug}`, lastmod: post.date })),
    ...allTags.map((tag) => ({ pathname: `/blog/tags/${encodeURIComponent(tag)}`, lastmod: buildDate })),
  ];

  const sitemapXml = generateSitemapXml(sitemapEntries);
  const rssXml = generateRssXml(posts);

  const publicDir = path.join(process.cwd(), "public");
  writeFileEnsuringDir(path.join(publicDir, "sitemap.xml"), sitemapXml);
  writeFileEnsuringDir(path.join(publicDir, "rss.xml"), rssXml);

  // eslint-disable-next-line no-console
  console.log(
    `[generate-feeds] Wrote public/sitemap.xml (${sitemapEntries.length} routes) and public/rss.xml (${posts.length} posts)` ,
  );
}

main();
