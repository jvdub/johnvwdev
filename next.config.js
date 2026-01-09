/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  reactStrictMode: true,
  // Keep dev server experience intact while still producing a fully static export
  // for builds.
  ...(isProd ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
