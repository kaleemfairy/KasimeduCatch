import type { NextConfig } from "next";

// Served from the root of www.kasimeducatch.in. Use "/KasimeduCatch" to serve from github.io/KasimeduCatch instead.
const basePath = "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
