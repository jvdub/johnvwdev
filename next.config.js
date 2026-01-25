const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [remarkFrontmatter, remarkRemoveFrontmatter],
  },
});

const isProd = process.env.NODE_ENV === "production";

module.exports = withMDX({
  reactStrictMode: true,
  ...(isProd ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
});
