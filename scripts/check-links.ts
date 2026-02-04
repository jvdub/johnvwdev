import { spawn } from "child_process";
import path from "path";

/**
 * Link checking script for CI/CD pipeline
 * - Fails on broken internal links
 * - Warns on broken external links
 * - Can be run locally and in CI
 */

const outDir = path.join(process.cwd(), "out");
const baseUrl = "http://localhost:3000";

console.log(`🔗 Starting link check on ${outDir}...`);
console.log(`📍 Base URL: ${baseUrl}\n`);

// Linkinator options
const args = [
  "--directory",
  outDir,
  "--recurse",
  "--timeout",
  "10000", // 10 second timeout for external links
  "--retry",
  "--retryErrors",
  "429,503", // Retry on rate limit and service unavailable
];

// Spawn linkinator process
const linkinator = spawn("npx", ["linkinator", ...args], {
  stdio: "inherit",
});

linkinator.on("close", (code) => {
  if (code === 0) {
    console.log(
      "\n✅ All links validated successfully (internal links OK, external links OK)"
    );
    process.exit(0);
  } else {
    console.error(
      "\n❌ Link validation failed - see errors above for details\n"
    );
    console.error(
      "NOTE: linkinator exits with code > 0 if any links are broken."
    );
    console.error("Failing build on broken links (internal or external).\n");
    process.exit(1);
  }
});

linkinator.on("error", (err) => {
  console.error("Failed to start linkinator:", err);
  process.exit(1);
});
