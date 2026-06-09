import fs from "node:fs";
import path from "node:path";

import { getAllPosts } from "../lib/posts";
import { getAllProjectRedirects } from "../lib/projects";

type RedirectEntry = {
  source: string;
  target: string;
  status: 301;
  kind: "post" | "project";
  slug: string;
};

function writeFileEnsuringDir(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function ensureTrailingSlash(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function normalizeComparable(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function expandSourceVariants(source: string): string[] {
  if (source === "/") return ["/"];
  const trimmed = source.replace(/\/+$/, "");
  const withTrailing = `${trimmed}/`;

  const variants = new Set<string>();
  variants.add(source);
  variants.add(trimmed);
  variants.add(withTrailing);

  return Array.from(variants);
}

function createRedirectEntries(): RedirectEntry[] {
  const entries: RedirectEntry[] = [];
  const actualSourceMap = new Map<string, string>();
  const comparableSourceMap = new Map<string, string>();

  const addEntry = (source: string, target: string, kind: RedirectEntry["kind"], slug: string) => {
    const normalizedTarget = ensureTrailingSlash(target);
    const comparableSource = normalizeComparable(source);
    const comparableTarget = normalizeComparable(normalizedTarget);

    const existingComparableTarget = comparableSourceMap.get(comparableSource);
    if (existingComparableTarget && existingComparableTarget !== comparableTarget) {
      throw new Error(
        `Redirect conflict detected for '${source}': ${existingComparableTarget} vs ${comparableTarget}.`,
      );
    }
    comparableSourceMap.set(comparableSource, comparableTarget);

    if (normalizeComparable(source) === comparableTarget) {
      return;
    }

    if (actualSourceMap.has(source)) return;
    actualSourceMap.set(source, normalizedTarget);

    entries.push({
      source,
      target: normalizedTarget,
      status: 301,
      kind,
      slug,
    });
  };

  const posts = getAllPosts();
  for (const post of posts) {
    const redirectFrom = post.redirectFrom ?? [];
    const target = `/blog/${post.slug}`;

    for (const source of redirectFrom) {
      for (const variant of expandSourceVariants(source)) {
        addEntry(variant, target, "post", post.slug);
      }
    }
  }

  const projects = getAllProjectRedirects();
  for (const project of projects) {
    const redirectFrom = project.redirectFrom ?? [];
    const target = `/projects/${project.slug}`;

    for (const source of redirectFrom) {
      for (const variant of expandSourceVariants(source)) {
        addEntry(variant, target, "project", project.slug);
      }
    }
  }

  return entries.sort((a, b) => a.source.localeCompare(b.source));
}

function main(): void {
  const entries = createRedirectEntries();

  const publicDir = path.join(process.cwd(), "public");
  const mapPath = path.join(publicDir, "redirects-map.json");
  writeFileEnsuringDir(mapPath, `${JSON.stringify(entries, null, 2)}\n`);

  const customRules = entries.map(({ source, target, status }) => ({
    source,
    target,
    status: String(status),
  }));
  const customRulesPath = path.join(
    process.cwd(),
    "infra",
    "amplify",
    "custom-rules.json",
  );
  writeFileEnsuringDir(customRulesPath, `${JSON.stringify(customRules, null, 2)}\n`);

  // eslint-disable-next-line no-console
  console.log(
    `[generate-redirects] Wrote public/redirects-map.json and infra/amplify/custom-rules.json (${entries.length} redirects)`,
  );
}

main();
