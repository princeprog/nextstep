import { spawnSync } from "node:child_process"

import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

// The main e2e build has no call-to-action URLs. This file rebuilds out/ with both of them, the way production will
// look once the app is hosted; the running static server picks up the new files. It runs after the other tests as the
// "configured" project in playwright.config.ts.
const APP_URL = "https://app.nextstep.example.com/register"
const DEMO_URL = "https://app.nextstep.example.com/demo"
const PATHS = ["/", "/features/", "/privacy/", "/terms/"]

test.describe.configure({ mode: "serial" })

test.beforeAll(() => {
  test.setTimeout(180_000)
  const build = spawnSync("pnpm run build", {
    env: { ...process.env, PUBLIC_APP_URL: APP_URL, PUBLIC_DEMO_URL: DEMO_URL },
    encoding: "utf8",
    shell: true,
  })
  expect(build.status, build.stdout + build.stderr).toBe(0)
})

test("calls to action link to the configured app and demo", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Not publicly hosted yet.")).toHaveCount(0)
  await expect(page.getByRole("main").getByRole("link", { name: "Create your workspace" }).first()).toHaveAttribute("href", APP_URL)
  await expect(page.getByRole("banner").getByRole("link", { name: "Try the demo" })).toHaveAttribute("href", DEMO_URL)
})

test("the header demo button keeps its compact style, and pages fit 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto("/")
  // The header's compact button styles must win over the global .button styles, which once loaded after them and made
  // the button full size. Compare computed styles: the rendered height also depends on how each platform rasterizes
  // the font, which decides whether the label wraps at narrow widths.
  const style = await page
    .getByRole("banner")
    .getByRole("link", { name: "Try the demo" })
    .evaluate((element) => {
      const computed = getComputedStyle(element)
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize)
      return { fontSize: parseFloat(computed.fontSize) / root, minHeight: parseFloat(computed.minHeight) / root }
    })
  expect(style.fontSize).toBeCloseTo(0.9, 2)
  expect(style.minHeight).toBeCloseTo(2.5, 2)
  await page.setViewportSize({ width: 320, height: 740 })
  for (const path of PATHS) {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})

test("configured pages pass automated accessibility checks", async ({ page }) => {
  for (const path of PATHS) {
    await page.goto(path)
    await page.waitForTimeout(1800) // let the entrance (the home page's hero explanation runs about 1.5 s) finish before measuring contrast
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze()
    expect(results.violations, path).toEqual([])
  }
})
