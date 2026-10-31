import { defineConfig, devices } from "@playwright/test"

/** Builds the site with default (local) settings and serves only the static files. No app, API, or database. */
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  forbidOnly: Boolean(process.env.CI),
  // CI also writes an HTML report, which the workflow uploads with the traces when a run fails.
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: { baseURL: "http://localhost:3001", trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] }, testIgnore: /configured\.spec\.ts/ },
    // Rebuilds out/ with call-to-action URLs, so it runs after the tests that expect the unconfigured build.
    { name: "configured", use: { ...devices["Desktop Chrome"] }, testMatch: /configured\.spec\.ts/, dependencies: ["chromium"] },
  ],
  webServer: {
    command: "pnpm build && node scripts/serve-static.mjs",
    url: "http://localhost:3001/",
    reuseExistingServer: false,
    timeout: 180_000,
  },
})

