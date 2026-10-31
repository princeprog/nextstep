import type { MetadataRoute } from "next"

import { siteConfig } from "@/site-config"

export const dynamic = "force-static"

/** Crawling stays allowed everywhere so crawlers can read each page's noindex in preview and local builds. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteConfig.indexable && siteConfig.origin ? siteConfig.origin + "/sitemap.xml" : undefined,
  }
}

