/**
 * Build-time settings for the static site. Nothing here is secret; all values end up in public HTML.
 *
 * SITE_ENV            local | preview | production (default local)
 * SITE_PUBLIC_ORIGIN  canonical origin, e.g. https://nextstep.example.com (required for production)
 * PUBLIC_APP_URL      where "Create your workspace" points (optional)
 * PUBLIC_DEMO_URL     where "Try the demo" points (optional)
 *
 * Missing CTA URLs render an honest availability note instead of a link.
 */

export type SiteEnv = "local" | "preview" | "production"

export type SiteConfig = {
  env: SiteEnv
  origin: string | null
  /** Used to resolve absolute URLs in metadata; falls back to the local preview server. */
  metadataBase: string
  /** Only production pages may be indexed. Preview and local builds emit noindex. */
  indexable: boolean
  canonical: boolean
  appUrl: string | null
  demoUrl: string | null
}

const LOCAL_FALLBACK = "http://localhost:3001"

function isLocalHost(url: URL) {
  return ["localhost", "127.0.0.1", "[::1]", "0.0.0.0"].includes(url.hostname)
}

function parseOrigin(raw: string | undefined, env: SiteEnv): string | null {
  const value = raw?.trim()
  if (!value) {
    if (env === "production") {
      throw new Error("SITE_PUBLIC_ORIGIN is required for production builds (for example https://nextstep.example.com).")
    }
    return null
  }
  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new Error("SITE_PUBLIC_ORIGIN is not a valid URL: " + value)
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("SITE_PUBLIC_ORIGIN must use http or https: " + value)
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_PUBLIC_ORIGIN must be an origin without a path, query, or fragment: " + value)
  }
  if (env === "production" && (url.protocol !== "https:" || isLocalHost(url))) {
    throw new Error("SITE_PUBLIC_ORIGIN must be a public https origin for production builds: " + value)
  }
  return url.origin
}

function parseCta(name: string, raw: string | undefined, env: SiteEnv): string | null {
  const value = raw?.trim()
  if (!value) {
    return null
  }
  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new Error(name + " is not a valid URL: " + value)
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(name + " must use http or https: " + value)
  }
  if (env === "production" && (url.protocol !== "https:" || isLocalHost(url))) {
    throw new Error(name + " must be a public https URL for production builds: " + value)
  }
  return url.toString()
}

export function resolveSiteConfig(env: Record<string, string | undefined>): SiteConfig {
  const siteEnv = (env.SITE_ENV?.trim() || "local") as SiteEnv
  if (!["local", "preview", "production"].includes(siteEnv)) {
    throw new Error("SITE_ENV must be local, preview, or production. Received: " + env.SITE_ENV)
  }
  const origin = parseOrigin(env.SITE_PUBLIC_ORIGIN, siteEnv)
  return {
    env: siteEnv,
    origin,
    metadataBase: origin ?? LOCAL_FALLBACK,
    indexable: siteEnv === "production",
    canonical: origin !== null,
    appUrl: parseCta("PUBLIC_APP_URL", env.PUBLIC_APP_URL, siteEnv),
    demoUrl: parseCta("PUBLIC_DEMO_URL", env.PUBLIC_DEMO_URL, siteEnv),
  }
}

export const siteConfig = resolveSiteConfig(process.env)

/** Public routes that may appear in the production sitemap. The privacy draft is excluded until reviewed. */
export const INDEXABLE_ROUTES = ["/", "/features/"] as const

