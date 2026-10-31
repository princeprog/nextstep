import { defineConfig, devices } from "@playwright/test"

/** Builds the site with default (local) settings and serves only the static files. No app, API, or database. */
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3001", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm build && node scripts/serve-static.mjs",
    url: "http://localhost:3001/",
    reuseExistingServer: false,
    timeout: 180_000,
  },
})

