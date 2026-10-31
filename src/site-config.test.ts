import { describe, expect, it } from "vitest"

import { resolveSiteConfig } from "./site-config"

describe("site build configuration", () => {
  it("lets local builds omit the canonical origin and CTA links", () => {
    const config = resolveSiteConfig({})
    expect(config).toMatchObject({ env: "local", origin: null, canonical: false, indexable: false, appUrl: null, demoUrl: null })
  })

  it("requires a public https origin for production", () => {
    expect(() => resolveSiteConfig({ SITE_ENV: "production" })).toThrow(/SITE_PUBLIC_ORIGIN is required/)
    expect(() => resolveSiteConfig({ SITE_ENV: "production", SITE_PUBLIC_ORIGIN: "http://nextstep.example.com" })).toThrow(/https/)
    expect(() => resolveSiteConfig({ SITE_ENV: "production", SITE_PUBLIC_ORIGIN: "https://localhost" })).toThrow(/public/)
    expect(() => resolveSiteConfig({ SITE_ENV: "production", SITE_PUBLIC_ORIGIN: "https://nextstep.example.com/blog" })).toThrow(/without a path/)
    const config = resolveSiteConfig({ SITE_ENV: "production", SITE_PUBLIC_ORIGIN: "https://nextstep.example.com/" })
    expect(config).toMatchObject({ origin: "https://nextstep.example.com", canonical: true, indexable: true })
  })

  it("rejects local or unsafe CTA links in production but allows local links in local builds", () => {
    const production = { SITE_ENV: "production", SITE_PUBLIC_ORIGIN: "https://nextstep.example.com" }
    expect(() => resolveSiteConfig({ ...production, PUBLIC_DEMO_URL: "http://localhost:3000/demo" })).toThrow(/PUBLIC_DEMO_URL/)
    expect(() => resolveSiteConfig({ ...production, PUBLIC_APP_URL: "javascript:alert(1)" })).toThrow(/PUBLIC_APP_URL/)
    expect(resolveSiteConfig({ PUBLIC_DEMO_URL: "http://localhost:3000/demo" }).demoUrl).toBe("http://localhost:3000/demo")
  })

  it("keeps preview builds out of search results", () => {
    const config = resolveSiteConfig({ SITE_ENV: "preview", SITE_PUBLIC_ORIGIN: "https://preview.example.com" })
    expect(config).toMatchObject({ indexable: false, canonical: true })
    expect(() => resolveSiteConfig({ SITE_ENV: "staging" })).toThrow(/SITE_ENV/)
  })
})

