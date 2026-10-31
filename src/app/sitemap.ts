import type { MetadataRoute } from "next"

import { INDEXABLE_ROUTES, siteConfig } from "@/site-config"

export const dynamic = "force-static"

/** Lists only indexable public routes, and only in production builds with a canonical origin. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable || !siteConfig.origin) {
    return []
  }
  return INDEXABLE_ROUTES.map((route) => ({
    url: siteConfig.origin + route,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }))
}

