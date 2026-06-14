import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Large multi-app port: rely on `npm run typecheck` (tsc) for type safety;
  // don't let inherited lint nits from ported code block production builds.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
