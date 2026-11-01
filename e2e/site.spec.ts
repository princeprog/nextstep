import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

const PAGES = [
  { path: "/", h1: /Keep your job search/ },
  { path: "/features/", h1: "What NextStep does today" },
  { path: "/privacy/", h1: "Privacy policy" },
  { path: "/terms/", h1: "Terms of use" },
]
const OPERATOR_EMAIL = "alprincellavan2019@gmail.com"

test("every public route loads directly from static files", async ({ page }) => {
  for (const { path, h1 } of PAGES) {
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    await expect(page.getByRole("heading", { level: 1, name: h1 })).toBeVisible()
  }
  const redirected = await page.goto("/features")
  expect(redirected?.url()).toMatch(/\/features\/$/)
  const missing = await page.goto("/no-such-page/")
  expect(missing?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1, name: "This page took a different path." })).toBeVisible()
})

test("content and navigation work with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1, name: /Keep your job search/ })).toBeVisible()
  await expect(page.getByText("Not publicly hosted yet.").first()).toBeVisible()
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Features" }).click()
  await expect(page).toHaveURL(/\/features\/$/)
  await expect(page.getByRole("heading", { level: 1, name: "What NextStep does today" })).toBeVisible()
  await page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Privacy" }).click()
  await expect(page.getByRole("heading", { level: 1, name: "Privacy policy" })).toBeVisible()
  await expect(page.getByRole("link", { name: OPERATOR_EMAIL }).first()).toHaveAttribute("href", "mailto:" + OPERATOR_EMAIL)
  await page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Terms" }).click()
  await expect(page.getByRole("heading", { level: 1, name: "Terms of use" })).toBeVisible()
  await expect(page.getByRole("link", { name: OPERATOR_EMAIL }).first()).toHaveAttribute("href", "mailto:" + OPERATOR_EMAIL)
  await context.close()
})

test("pages load without console errors or failed requests, including the router's prefetches", async ({ page }) => {
  const problems: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text())
  })
  page.on("response", (response) => {
    if (response.status() >= 400) problems.push(response.status() + " " + response.url())
  })
  for (const { path } of PAGES) {
    await page.goto(path, { waitUntil: "networkidle" })
  }
  expect(problems).toEqual([])
})

test("pages pass automated accessibility checks", async ({ page }) => {
  for (const path of ["/", "/features/", "/privacy/", "/terms/", "/no-such-page/"]) {
    await page.goto(path)
    await page.waitForTimeout(1800) // let the entrance (the home page's hero explanation runs about 1.5 s) finish before measuring contrast
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze()
    expect(results.violations, path).toEqual([])
  }
})

test("the home page's scroll stories pass accessibility checks in their finished state", async ({ page }) => {
  // At the top of the page, scenes further down wait in their starting state, and axe can't measure contrast off
  // screen. With reduced motion every scene rests in its finished state; each section is scanned while it's in view.
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  for (const heading of ["hero-title", "sort-title", "stories-title", "how-title", "hood-title", "faq-title", "closing-title"]) {
    await page.locator("#" + heading).scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    const results = await new AxeBuilder({ page })
      .include("section:has(#" + heading + ")")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze()
    expect(results.violations, heading).toEqual([])
  }
})

test("keyboard users can skip to content and see focus", async ({ page }) => {
  await page.goto("/")
  await page.keyboard.press("Tab")
  const skip = page.getByRole("link", { name: "Skip to content" })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press("Enter")
  await expect(page.locator("#main")).toBeFocused()
  await page.keyboard.press("Tab")
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle)
  expect(outline).toBe("solid")
})

test("layouts fit 320 px with reduced motion and load nothing from other origins", async ({ page }) => {
  const external: string[] = []
  page.on("request", (request) => {
    if (!request.url().startsWith("http://localhost:3001")) external.push(request.url())
  })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.setViewportSize({ width: 320, height: 740 })
  for (const path of ["/", "/features/", "/privacy/", "/terms/", "/no-such-page/"]) {
    await page.goto(path)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
  expect(external).toEqual([])
})

