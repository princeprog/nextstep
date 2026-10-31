// Builds the site with production and preview settings and checks the exported HTML, SEO files, and boundaries.
// The site must build without the app, API, or database running, and must not depend on shadcn/ui.
import { spawnSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const OUT = "out"
const ORIGIN = "https://nextstep.example.com"
const failures = []
const check = (condition, message) => {
  if (!condition) failures.push(message)
}

function build(label, env) {
  const result = spawnSync("pnpm run build", {
    env: { ...process.env, SITE_ENV: "", SITE_PUBLIC_ORIGIN: "", PUBLIC_APP_URL: "", PUBLIC_DEMO_URL: "", ...env },
    encoding: "utf8",
    shell: true,
  })
  console.log((result.status === 0 ? "built " : "build failed ") + label)
  return result
}

const read = (file) => readFileSync(join(OUT, file), "utf8")
const meta = (html, name) => html.match(new RegExp('<meta name="' + name + '" content="([^"]*)"'))?.[1]
const property = (html, name) => html.match(new RegExp('<meta property="' + name + '" content="([^"]*)"'))?.[1]
const canonical = (html) => html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

// 1. A production build without a canonical origin must fail.
const missing = build("production without SITE_PUBLIC_ORIGIN (expected to fail)", { SITE_ENV: "production" })
check(missing.status !== 0, "Production build without SITE_PUBLIC_ORIGIN should fail")
check(/SITE_PUBLIC_ORIGIN is required/.test(missing.stdout + missing.stderr), "Missing-origin failure should explain the cause")

// 2. Preview: everything noindex, empty sitemap, honest CTA note when links are not configured.
const preview = build("preview", { SITE_ENV: "preview", SITE_PUBLIC_ORIGIN: "https://preview.nextstep.example.com" })
check(preview.status === 0, "Preview build should succeed")
if (preview.status === 0) {
  for (const page of ["index.html", "features/index.html", "privacy/index.html", "terms/index.html"]) {
    check(/noindex/.test(meta(read(page), "robots") ?? ""), "Preview " + page + " should be noindex")
  }
  check(!read("sitemap.xml").includes("<url>"), "Preview sitemap should list no URLs")
  check(!/Sitemap:/i.test(read("robots.txt")), "Preview robots.txt should not advertise a sitemap")
  check(/Allow: \//.test(read("robots.txt")), "Preview robots.txt should still allow crawling so noindex can be read")
  check(read("index.html").includes("Not publicly hosted yet"), "Unconfigured CTAs should show the availability note")
}

// 3. Production: canonical URLs, indexable public pages, privacy policy and terms excluded until approved, CTAs linked.
const production = build("production", {
  SITE_ENV: "production",
  SITE_PUBLIC_ORIGIN: ORIGIN,
  PUBLIC_APP_URL: "https://app.nextstep.example.com/register",
  PUBLIC_DEMO_URL: "https://app.nextstep.example.com/demo",
})
check(production.status === 0, "Production build should succeed:\n" + production.stdout + production.stderr)
if (production.status === 0) {
  for (const file of ["index.html", "features/index.html", "privacy/index.html", "terms/index.html", "404.html", "robots.txt", "sitemap.xml", "icon.svg"]) {
    check(existsSync(join(OUT, file)), "Missing exported file: " + file)
  }
  check(existsSync(join(OUT, "og.png")), "Missing static Open Graph image og.png")
  check(readFileSync(join(OUT, "og.png")).subarray(1, 4).toString() === "PNG", "og.png should be a PNG image")

  const pages = {
    "index.html": { path: "/", indexable: true },
    "features/index.html": { path: "/features/", indexable: true },
    "privacy/index.html": { path: "/privacy/", indexable: false },
    "terms/index.html": { path: "/terms/", indexable: false },
  }
  const titles = new Set()
  for (const [file, expected] of Object.entries(pages)) {
    const html = read(file)
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
    check(Boolean(title), file + " needs a title")
    check(!titles.has(title), file + " title should be unique")
    titles.add(title)
    check(Boolean(meta(html, "description")), file + " needs a meta description")
    check((html.match(/<h1[\s>]/g) ?? []).length === 1, file + " should have exactly one h1")
    check(/<html lang="en"/.test(html), file + " should declare its language")
    check(canonical(html) === ORIGIN + expected.path, file + " canonical should be " + ORIGIN + expected.path + " (found " + canonical(html) + ")")
    const robots = meta(html, "robots") ?? ""
    check(expected.indexable ? /^index/.test(robots) : /noindex/.test(robots), file + " robots should be " + (expected.indexable ? "indexable" : "noindex") + " (found " + robots + ")")
    check(property(html, "og:image") === ORIGIN + "/og.png", file + " should have an absolute og:image on the canonical origin")
    check(/<main[^>]*id="main"/.test(html), file + " should have a main landmark for the skip link")
    // Styles are inlined (experimental.inlineCss in next.config.ts) so first paint does not wait on stylesheet requests.
    check(!/<link[^>]+rel="stylesheet"/.test(html) && /<style/.test(html), file + " should inline its CSS instead of linking render-blocking stylesheets")
  }
  const home = read("index.html")
  check(home.includes("Keep your job search"), "Home hero text should be in the static HTML")
  check(home.includes('href="https://app.nextstep.example.com/register"'), "Home should link to the configured app URL")
  check(home.includes('href="https://app.nextstep.example.com/demo"'), "Home should link to the configured demo URL")
  check(read("404.html").includes("This page took a different path"), "404 page should be exported")

  const sitemap = read("sitemap.xml")
  const urls = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => match[1]).sort()
  check(JSON.stringify(urls) === JSON.stringify([ORIGIN + "/", ORIGIN + "/features/"]), "Sitemap should list only / and /features/ (found " + urls.join(", ") + ")")
  const robots = read("robots.txt")
  check(robots.includes("Sitemap: " + ORIGIN + "/sitemap.xml"), "robots.txt should point to the sitemap")
  check(/Allow: \//.test(robots) && !/Disallow: \/\s*$/m.test(robots), "robots.txt should allow crawling")

  // The client router prefetches /features/__next.features.__PAGE__.txt and similar flat names. Next.js 16.4 nests
  // these files on Windows; pnpm build moves them back (scripts/flatten-segment-files.mjs).
  const nested = files(OUT).map((path) => relative(OUT, path)).filter((path) => /(^|[\\/])__next\.[^\\/]+[\\/]/.test(path))
  check(nested.length === 0, "Route prefetch files should be flat __next.*.txt files (found " + nested.join(", ") + ")")
  check(existsSync(join(OUT, "features", "__next.features.__PAGE__.txt")), "The /features/ prefetch file should be where the client router requests it")

  for (const file of files(OUT).filter((path) => /\.(html|txt|xml|js)$/.test(path))) {
    const text = readFileSync(file, "utf8")
    // Framework JavaScript includes a URL parser that mentions "localhost", so only authored output is checked for it.
    if (!file.endsWith(".js")) {
      check(!/localhost|127\.0\.0\.1/.test(text), relative(OUT, file) + " should not reference a local host in a production build")
    }
    check(!/\/api\/v1|:8080/.test(text), relative(OUT, file) + " should not reference the app API")
  }
}

// 4. No shadcn/ui or app component library in this project.
const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
const banned = deps.filter((name) => /shadcn|@radix-ui|@base-ui|class-variance-authority|^cn$|tailwind/.test(name))
check(banned.length === 0, "Website must not depend on shadcn or its primitives: " + banned.join(", "))
check(!existsSync("components.json"), "Website must not have a shadcn components.json")
check(!/shadcn|@radix-ui|@base-ui/.test(readFileSync("pnpm-lock.yaml", "utf8")), "Lockfile must not include shadcn packages")
for (const file of files("src")) {
  const text = readFileSync(file, "utf8")
  check(!/shadcn|@\/components\/ui\/|nextstep-app/.test(text) || file.endsWith("check-static.mjs"), file + " must not import shadcn or app components")
  check(!/\bfetch\(/.test(text), file + " must not fetch data at runtime")
}

if (failures.length) {
  console.error("\nStatic checks failed:\n- " + failures.join("\n- "))
  process.exit(1)
}
console.log("\nAll static checks passed. Note: out/ now contains the production-configured build.")

