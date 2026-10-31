// Mobile lab performance check. Builds a production-configured static export (pass --no-build to measure out/ as it
// is), serves out/ with scripts/serve-static.mjs on a free port, and runs Lighthouse with its default mobile emulation
// and simulated throttling against each public page. It prints the median run for each page and saves every full
// JSON report under lighthouse-reports/ (git-ignored). This is a lab measurement for people, not a CI gate.
//
//   pnpm perf               build, then three runs per page
//   pnpm perf --runs=1      one run per page
//   pnpm perf --no-build    measure the current out/
//
// Lighthouse needs Chrome or Edge. Set CHROME_PATH to pick one; otherwise Lighthouse looks for Chrome, and on Windows
// this script also falls back to Microsoft Edge.
import { spawn, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"

const PAGES = ["/", "/features/", "/privacy/", "/terms/"]
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"]
// Placeholder canonical origin for measuring only, the same one pnpm test:static uses. Set SITE_PUBLIC_ORIGIN to override.
const MEASURE_ORIGIN = "https://nextstep.example.com"
const REPORTS = "lighthouse-reports"
const lighthouseCli = createRequire(import.meta.url).resolve("lighthouse/cli/index.js")

const args = process.argv.slice(2)
const runsArg = args.find((arg) => arg.startsWith("--runs="))
const runs = runsArg ? Number(runsArg.slice("--runs=".length)) : 3
const build = !args.includes("--no-build")
if (!Number.isInteger(runs) || runs < 1 || args.some((arg) => arg !== "--no-build" && arg !== runsArg)) {
  console.error("Usage: pnpm perf [--runs=N] [--no-build]")
  process.exit(1)
}

function findBrowser() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH
  if (process.platform !== "win32") return undefined
  const candidates = [
    [process.env.PROGRAMFILES, "Google/Chrome/Application/chrome.exe"],
    [process.env["PROGRAMFILES(X86)"], "Google/Chrome/Application/chrome.exe"],
    [process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"],
    [process.env["PROGRAMFILES(X86)"], "Microsoft/Edge/Application/msedge.exe"],
    [process.env.PROGRAMFILES, "Microsoft/Edge/Application/msedge.exe"],
  ]
  return candidates.filter(([base]) => base).map(([base, file]) => join(base, file)).find((file) => existsSync(file))
}

function buildProduction() {
  const origin = process.env.SITE_PUBLIC_ORIGIN?.trim() || MEASURE_ORIGIN
  console.log("Building with SITE_ENV=production and SITE_PUBLIC_ORIGIN=" + origin)
  const result = spawnSync("pnpm run build", {
    env: { ...process.env, SITE_ENV: "production", SITE_PUBLIC_ORIGIN: origin },
    encoding: "utf8",
    shell: true,
  })
  if (result.status !== 0) {
    console.error(result.stdout + result.stderr)
    throw new Error("The production build failed.")
  }
}

/** Starts scripts/serve-static.mjs on a port the OS picks and resolves with its origin once it is listening. */
function startServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["scripts/serve-static.mjs", "out"], {
      env: { ...process.env, PORT: "0" },
      stdio: ["ignore", "pipe", "inherit"],
    })
    let output = ""
    const timer = setTimeout(() => {
      child.kill()
      reject(new Error("The static server did not start: " + output))
    }, 10_000)
    child.stdout.on("data", (chunk) => {
      output += chunk
      const port = output.match(/http:\/\/localhost:(\d+)/)?.[1]
      if (port) {
        clearTimeout(timer)
        resolve({ child, origin: "http://127.0.0.1:" + port })
      }
    })
    child.on("exit", (code) => {
      clearTimeout(timer)
      reject(new Error("The static server exited early with code " + code + ": " + output))
    })
  })
}

function runLighthouse(url, outputPath, browser) {
  const flags = [
    "--output=json",
    "--output-path=" + outputPath,
    "--only-categories=" + CATEGORIES.join(","),
    "--chrome-flags=--headless=new",
    "--no-enable-error-reporting",
    "--quiet",
  ]
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [lighthouseCli, url, ...flags], {
      env: browser ? { ...process.env, CHROME_PATH: browser } : process.env,
      stdio: ["ignore", "ignore", "pipe"],
    })
    let errors = ""
    child.stderr.on("data", (chunk) => (errors += chunk))
    child.on("error", reject)
    child.on("exit", (code) => {
      // On Windows, Lighthouse can exit non-zero while deleting Chrome's temporary profile after it has written a
      // complete report, so the report decides whether the run worked.
      const lhr = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : null
      if (lhr && !lhr.runtimeError) resolve(lhr)
      else reject(new Error("Lighthouse failed for " + url + " (exit " + code + "): " + (lhr?.runtimeError?.message ?? errors.trim())))
    })
  })
}

/** The run with the median performance score, so one unusually fast or slow run does not decide the result. */
function medianRun(lhrs) {
  const sorted = [...lhrs].sort((a, b) => a.categories.performance.score - b.categories.performance.score)
  return sorted[Math.floor((sorted.length - 1) / 2)]
}

const slug = (path) => path.replaceAll("/", "") || "home"
const score = (lhr, id) => Math.round(lhr.categories[id].score * 100)
const metric = (lhr, id) => lhr.audits[id].numericValue
const seconds = (ms) => (ms / 1000).toFixed(1) + " s"

function summarize(path, lhr) {
  return {
    page: path,
    performance: score(lhr, "performance"),
    accessibility: score(lhr, "accessibility"),
    bestPractices: score(lhr, "best-practices"),
    seo: score(lhr, "seo"),
    lcpMs: Math.round(metric(lhr, "largest-contentful-paint")),
    cls: Number(metric(lhr, "cumulative-layout-shift").toFixed(3)),
    tbtMs: Math.round(metric(lhr, "total-blocking-time")),
    fcpMs: Math.round(metric(lhr, "first-contentful-paint")),
    speedIndexMs: Math.round(metric(lhr, "speed-index")),
  }
}

/** Scored audits below 90 (performance) or below 100 (other categories), to point at what to look into. */
function flaggedAudits(lhr) {
  return CATEGORIES.flatMap((id) =>
    lhr.categories[id].auditRefs
      .filter((ref) => ref.group !== "metrics" && ref.group !== "hidden")
      .map((ref) => lhr.audits[ref.id])
      .filter((audit) => typeof audit?.score === "number" && audit.scoreDisplayMode !== "informative")
      .filter((audit) => audit.score < (id === "performance" ? 0.9 : 1))
      .map((audit) => id + ": " + audit.title + (audit.displayValue ? " (" + audit.displayValue + ")" : "")),
  )
}

function printResults(results) {
  const { lighthouseVersion, configSettings: settings, environment } = results[0].lhr
  const agent = environment.hostUserAgent
  const browser = agent.match(/Edg\/[\d.]+/)?.[0] ?? agent.match(/Chrome\/[\d.]+/)?.[0] ?? agent
  console.log(
    "\nLighthouse " + lighthouseVersion + ", " + settings.formFactor + " emulation, " + settings.throttlingMethod +
      " throttling (" + settings.throttling.rttMs + " ms RTT, " + Math.round(settings.throttling.throughputKbps) +
      " Kbps, " + settings.throttling.cpuSlowdownMultiplier + "x CPU slowdown), median of " + runs + " run" +
      (runs === 1 ? "" : "s") + " per page",
  )
  console.log(browser + ", CPU benchmark index " + Math.round(environment.benchmarkIndex) + "\n")
  const rows = [["Page", "Perf", "A11y", "BP", "SEO", "LCP", "CLS", "TBT", "FCP", "SI"]]
  for (const { summary: s } of results) {
    rows.push([s.page, s.performance, s.accessibility, s.bestPractices, s.seo, seconds(s.lcpMs), s.cls.toFixed(3),
      s.tbtMs + " ms", seconds(s.fcpMs), seconds(s.speedIndexMs)].map(String))
  }
  const widths = rows[0].map((_, column) => Math.max(...rows.map((row) => row[column].length)))
  for (const row of rows) console.log(row.map((cell, column) => cell.padEnd(widths[column])).join("  "))
  for (const { summary, lhr } of results) {
    const flagged = flaggedAudits(lhr)
    if (flagged.length) console.log("\n" + summary.page + " — worth a look:\n  " + flagged.join("\n  "))
  }
}

const browser = findBrowser()
if (build) buildProduction()
if (!existsSync("out/index.html")) {
  console.error("No static export found in out/. Run pnpm perf without --no-build, or pnpm build first.")
  process.exit(1)
}
if (/noindex/.test(readFileSync("out/index.html", "utf8").match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "")) {
  console.warn("Note: out/ holds a local or preview build (noindex), so SEO scores will be lower than in production.")
}

const reportDir = join(REPORTS, new Date().toISOString().replace(/[:.]/g, "-"))
mkdirSync(reportDir, { recursive: true })
const server = await startServer()
const results = []
try {
  for (const path of PAGES) {
    const lhrs = []
    for (let run = 1; run <= runs; run++) {
      console.log("Lighthouse " + path + " (run " + run + " of " + runs + ")")
      lhrs.push(await runLighthouse(server.origin + path, join(reportDir, slug(path) + "-" + run + ".json"), browser))
    }
    const lhr = medianRun(lhrs)
    results.push({ lhr, summary: summarize(path, lhr) })
  }
} finally {
  server.child.kill()
}

printResults(results)
writeFileSync(join(reportDir, "summary.json"), JSON.stringify(results.map((result) => result.summary), null, 2) + "\n")
console.log("\nFull JSON reports: " + reportDir)
