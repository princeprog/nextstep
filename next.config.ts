import type { NextConfig } from "next"

import { siteConfig } from "./src/site-config"

// Validates the build-time site settings early, so a production build without a valid canonical origin fails.
void siteConfig

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
}

export default nextConfig

