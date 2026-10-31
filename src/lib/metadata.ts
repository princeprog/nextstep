import type { Metadata } from "next"

import { siteConfig } from "@/site-config"

export const SITE_NAME = "NextStep"

export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "NextStep — Keep your job search moving." }

/** Route metadata: unique title and description, canonical URL when an origin is configured, noindex outside production. */
export function pageMetadata({
  title,
  description,
  path,
  indexable = true,
}: {
  title: string
  description: string
  path: string
  indexable?: boolean
}): Metadata {
  const index = siteConfig.indexable && indexable
  return {
    title,
    description,
    alternates: siteConfig.canonical ? { canonical: path } : undefined,
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { type: "website", siteName: SITE_NAME, title, description, url: path, locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  }
}

