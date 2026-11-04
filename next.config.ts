import type { NextConfig } from "next";

// The site is served from github.io/KasimeduCatch. Set this to "" for a custom domain.
const basePath = "/KasimeduCatch";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
