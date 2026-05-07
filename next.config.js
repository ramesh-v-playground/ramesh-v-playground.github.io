/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — produces an /out directory of plain HTML, JS, and CSS.
  // GitHub Pages serves those files directly. No Node, no API routes.
  output: 'export',

  // Repo is `ramesh-v-playground.github.io` (a user site), so it serves from `/`.
  // If you ever rename to a project repo, set `basePath: '/repo-name'` here.

  // Pages serves files as `/about/index.html`, not `/about`. This adds the slash.
  trailingSlash: true,

  // GitHub Pages doesn't support Next.js's image optimization endpoint;
  // disable it so <Image> tags work with raw paths.
  images: { unoptimized: true },

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: { mdxRs: true },
};

module.exports = nextConfig;
