import type { NextConfig } from "next"

import { siteConfig } from "./src/site-config"

// Validates the build-time site settings early, so a production build without a valid canonical origin fails.
void siteConfig

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    // Inline each page's CSS into its HTML, so first paint waits on no stylesheet requests. The CSS is small, so the
    // extra HTML bytes cost less than a round trip on a mobile connection (pnpm perf, Lighthouse "render-blocking").
    inlineCss: true,
    // With CSS inlined, smaller chunks add no first-load requests, so let Turbopack split CSS by route: each page
    // inlines only the styles it imports, and the home page's italic font is not preloaded on other pages.
    cssChunking: { type: "graph", requestCost: 1000 },
  },
}

export default nextConfig

