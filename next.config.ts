import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Large multi-app port: rely on `npm run typecheck` (tsc) for type safety;
  // don't let inherited lint nits from ported code block production builds.
  eslint: { ignoreDuringBuilds: true },
  // Serve each vendored strandhoot SPA's index.html at its clean directory path
  // (Next 404s a bare public/ directory). The app's router then matches "/".
  async rewrites() {
    return [
      { source: "/strandhoots/tir-criteria-a", destination: "/strandhoots/tir-criteria-a/index.html" },
      { source: "/strandhoots/magnetism-crit-c", destination: "/strandhoots/magnetism-crit-c/index.html" },
      { source: "/strandhoots/lab-report-criteria-b", destination: "/strandhoots/lab-report-criteria-b/index.html" },
    ]
  },
};

export default nextConfig;
