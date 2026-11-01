# NextStep website

The public, static website for **NextStep**, a portfolio job-application tracker. It explains the product with
fictional examples and links to the app and demo once they are hosted. It builds to plain static files and needs no
app, API, or database at build time or at runtime.

## Related projects

| Repository | Role |
| --- | --- |
| [nextstep](https://github.com/princeprog/nextstep) | This static website. |
| [nextstep-app](https://github.com/princeprog/nextstep-app) | The web app the calls to action point to (configured at build time). |
| [nextstep-api](https://github.com/princeprog/nextstep-api) | The app's API. The website never calls it. |

## Stack and design

- Next.js 16.4 static export (`output: "export"`, trailing slashes), React 19, TypeScript
- Custom components with CSS Modules and a small global stylesheet. **No shadcn/ui, Radix, Base UI, or Tailwind.**
- Pages inline their CSS into the HTML, split by route (`experimental.inlineCss` and graph CSS chunking in
  `next.config.ts`), so first paint doesn't wait on stylesheet requests
- Instrument Sans (headings, text, and controls) and Instrument Serif italic (a word of emphasis in headings, loaded only
  on the pages that use it), self-hosted at build time through `next/font`
- Design direction "A calmer next step", made more modern on 2026-11-01: a warm canvas, deep evergreen ink, and one
  amber accent that marks "your next step"; a layered, hand-built product scene with fictional data; a bento grid of
  features; a "How it works" staircase that echoes the logo; and a dark evergreen closing panel. Motion follows Emil
  Kowalski's design-engineering skill: a short ease-out entrance, a one-time hero explanation (an application moves to
  Interview and the next step is marked), press feedback on buttons, hover only for fine pointers, a header hairline
  that fades in on scroll where supported, and a reduced-motion version that shows the final state. No client-side
  JavaScript is written for this site, and all content works with JavaScript disabled.

## Pages

| Route | Indexing |
| --- | --- |
| `/` | indexable in production |
| `/features/` | indexable in production |
| `/privacy/` | privacy policy; noindex and not in the sitemap until the owner approves the text |
| `/terms/` | terms of use; noindex and not in the sitemap until the owner approves the text |
| `/404.html` | static not-found page |

Plus `robots.txt`, `sitemap.xml`, `og.png` (generated at build), and `icon.svg`.

The privacy policy and terms describe what the app and API actually do: the data stored, the emails sent, the
Pwned Passwords check, and how long each kind of record is kept. Both are marked as drafts that take effect at launch,
and the privacy policy lists the choices still open (hosting provider and data location, email provider, backup and
log retention, error monitoring). When the app's data handling changes, update the policy in the same change and move
its "Last updated" date. `src/lib/operator.ts` holds the operator's name and contact email.

## Build-time configuration

| Variable | Purpose |
| --- | --- |
| `SITE_ENV` | `local` (default), `preview`, or `production`. Only production pages are indexable; others emit noindex. |
| `SITE_PUBLIC_ORIGIN` | Canonical origin, e.g. `https://nextstep.example.com`. Required (public https) for production; the build fails without it. |
| `PUBLIC_APP_URL` | "Create your workspace" target. Optional. |
| `PUBLIC_DEMO_URL` | "Try the demo" target. Optional. |

These values are public and end up in the HTML. Without CTA URLs, the site shows an honest "not publicly hosted yet" note
instead of a link. Production builds reject non-https or local CTA URLs.

```powershell
$env:SITE_ENV = "production"; $env:SITE_PUBLIC_ORIGIN = "https://nextstep.example.com"
$env:PUBLIC_DEMO_URL = "https://app.nextstep.example.com/demo"
pnpm build      # static files in out/
```

## Commands

Use Node 24 and pnpm 11 (the version in `packageManager`).

```powershell
pnpm install
pnpm dev            # development server on :3001
pnpm lint
pnpm typecheck
pnpm test           # Vitest: build configuration rules and the build scripts
pnpm build          # static export to out/
pnpm start          # serve out/ like a plain static host on :3001 (gzip, 404.html for missing pages)
pnpm test:static    # builds production and preview variants and checks the exported files
pnpm test:e2e       # Playwright: builds, serves out/, checks routes, no-JS, console errors, axe, keyboard, 320 px
pnpm perf           # Lighthouse mobile lab check of a production-configured build (not part of CI)
```

`pnpm build` runs `next build` and then `scripts/flatten-segment-files.mjs`. On Windows, Next.js 16.4 writes some route
prefetch files into subfolders instead of the flat names the client router requests, so those prefetches return 404.
The script moves them back and changes nothing on macOS or Linux. Build with `pnpm build` rather than `next build`.

`pnpm test:static` checks that a production build without an origin fails, preview pages are noindex with an empty
sitemap, production pages have unique titles, descriptions, one h1, canonical URLs, absolute `og:image`, a sitemap
listing only `/` and `/features/`, inlined CSS, route prefetch files where the router requests them, and no references
to localhost or the app API. It also confirms the project has no shadcn/ui dependencies, files, or imports. It leaves
`out/` holding the production-configured build.

`pnpm test:e2e` first tests the build without call-to-action URLs. A second Playwright project then rebuilds with both
URLs and checks the links, the compact header button, 320 px layouts, and axe. Run
`pnpm exec playwright install chromium` once before the first `pnpm test:e2e`.

`pnpm perf` builds with `SITE_ENV=production` and the placeholder origin `https://nextstep.example.com` (or your
`SITE_PUBLIC_ORIGIN`), serves `out/` on a free port, and runs Lighthouse with its default mobile emulation and simulated
throttling against `/`, `/features/`, `/privacy/`, and `/terms/`, three runs each. It prints the median run's scores with LCP, CLS,
TBT, FCP, and Speed Index, and saves every JSON report in `lighthouse-reports/` (git-ignored, about 6 MB per run, safe
to delete). Add `--runs=1` for a quick pass or `--no-build` to measure the current `out/`. Lighthouse uses Chrome; set
`CHROME_PATH` to use another Chromium browser such as Microsoft Edge, which the script also falls back to on Windows.
Lab numbers vary a little between runs and machines, so compare runs from the same machine.

Measured on 2026-11-01, after the design refresh, with Lighthouse 13.6.0 and Chrome 156 on Windows, median of three runs:

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | FCP | Speed Index |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 65 ms | 0.9 s | 0.9 s |
| `/features/` | 100 | 100 | 100 | 100 | 0.7 s | 0 | 59 ms | 0.7 s | 0.7 s |
| `/privacy/` | 100 | 100 | 100 | 66 | 0.7 s | 0 | 55 ms | 0.7 s | 0.7 s |
| `/terms/` | 100 | 100 | 100 | 66 | 0.7 s | 0 | 60 ms | 0.7 s | 0.7 s |

`/privacy/` and `/terms/` score 66 for SEO only because they are deliberately noindex. Before the 2026-11-01 changes, the same check
found render-blocking stylesheets and 0.9 s LCP on every page, and Best practices 96 from the Windows prefetch 404s.
Lighthouse still lists unused and legacy JavaScript (about 29 KiB and 14 KiB compressed); both come from the Next.js
runtime. On `/` and `/features/` it also reports about 45 ms of forced reflow that it can't attribute to any
script; the site ships no scripts of its own.

## Continuous integration

GitHub Actions runs two workflows with read-only access to the repository:

- **CI** (`.github/workflows/ci.yml`), on every push and pull request: `pnpm install --frozen-lockfile`, lint,
  typecheck, unit tests, build, static checks, and the Playwright tests in Chromium. When a step fails, it uploads the
  Playwright report and traces. A newer push cancels the run it replaces.
- **Security** (`.github/workflows/security.yml`), on every push and pull request and weekly: `pnpm audit` fails on high
  or critical advisories, OSV-Scanner fails on any known vulnerability in `pnpm-lock.yaml` that `osv-scanner.toml`
  doesn't list as a triaged exception with a reason and an expiry date, and gitleaks scans the full git history with a
  checksum-verified binary.

Dependabot proposes npm and GitHub Actions updates weekly and waits a week after each npm release. Actions are pinned to
full commit SHAs with the version in a trailing comment; pin new ones the same way.

## Operations runbooks

**Deploy**

1. Build with the production values: `SITE_ENV=production`, `SITE_PUBLIC_ORIGIN` (the website's https origin),
   `PUBLIC_APP_URL` (`https://<app origin>/register`), and `PUBLIC_DEMO_URL` (`https://<app origin>/demo`), then `pnpm build`.
2. Upload `out/` to any static host. Serve `404.html` for missing paths and redirect paths without a trailing slash to
   the slash form, as `pnpm start` does.
3. Set these response headers at the host, since a static export can't send its own:
   `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`,
   `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Frame-Options: DENY`.
4. Check the home, features, privacy, and terms pages, `/sitemap.xml`, and `/robots.txt` on the real origin, and run
   `pnpm perf` with `SITE_PUBLIC_ORIGIN` set to compare with the numbers above.

**Roll back**: upload the previous build of `out/`. The site keeps no state.

**Publish the privacy policy and terms** once the owner approves them:

1. Fill in the open choices (hosting provider and data location, email provider, backup and log retention, error
   monitoring), and remove the "to be decided" markers and the open-decisions box.
2. Replace the draft badge with the date the policy takes effect, and update "Last updated".
3. Add `/privacy/` and `/terms/` to `INDEXABLE_ROUTES` in `src/site-config.ts`, and update the noindex and sitemap
   expectations in `scripts/check-static.mjs`.
4. Run every check in "Commands", then deploy.

## Project context (Obsidian)

Product requirements, rules, and decisions live in the owner's local Obsidian vault. **These links point to a local vault on the owner's machine. They won't open for anyone without access to it**; on this machine, an agent can read the Markdown files directly from the absolute paths.

- Project home: [obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FHome](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FHome)
- Vault folder: `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker`

| Note | Obsidian link | File path |
| --- | --- | --- |
| Home | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FHome) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Home.md` |
| Agent Handoff | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FAgent%20Handoff) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Agent Handoff.md` |
| Project Overview | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FProject%20Overview) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Project Overview.md` |
| Marketing Website Design and SEO | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FDesign%2FMarketing%20Website%20Design%20and%20SEO) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Design\Marketing Website Design and SEO.md` |
| Website Content and Sitemap | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FWebsite%2FContent%20and%20Sitemap) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Website\Content and Sitemap.md` |
| Product Requirements | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FProduct%2FProduct%20Requirements) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Product\Product Requirements.md` |
| Security and Privacy | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FOperations%2FSecurity%20and%20Privacy) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Operations\Security and Privacy.md` |
| Testing Strategy | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FQuality%2FTesting%20Strategy) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Quality\Testing Strategy.md` |
| Decision Log | [Open in Obsidian](obsidian://open?vault=Obsidian%20Vault&file=Projects%2FJob%20Application%20Tracker%2FDecisions%2FDecision%20Log) | `C:\Users\Al Prince\Documents\Obsidian Vault\Projects\Job Application Tracker\Decisions\Decision Log.md` |

