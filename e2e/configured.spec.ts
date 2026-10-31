import { spawnSync } from "node:child_process"

import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

// The main e2e build has no call-to-action URLs. This file rebuilds out/ with both of them, the way production will
// look once the app is hosted; the running static server picks up the new files. It runs after the other tests as the
// "configured" project in playwright.config.ts.
const APP_URL = "https://app.nextstep.example.com/register"
const DEMO_URL = "https://app.nextstep.example.com/demo"
const PATHS = ["/", "/features/", "/privacy/"]

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

test("the header demo button keeps its compact size, and pages fit 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto("/")
  // One line at the compact header size. Global button styles loading after the header's styles made it 48 px or taller.
  const button = await page.getByRole("banner").getByRole("link", { name: "Try the demo" }).boundingBox()
  expect(button?.height).toBeLessThanOrEqual(44)
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
    await page.waitForTimeout(800) // let the short entrance animation finish before measuring contrast
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze()
    expect(results.violations, path).toEqual([])
  }
})
