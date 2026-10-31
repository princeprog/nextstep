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
- Fraunces (display) and Manrope (body), self-hosted at build time through `next/font`
- Design direction "A calmer next step": warm paper, deep ink, evergreen, and a small amber highlight; a hand-built
  product illustration with fictional data. Motion follows Emil Kowalski's design-engineering guidance: one short ease-out
  entrance, press feedback on buttons, hover only for fine pointers, and a reduced-motion fallback. No client-side
  JavaScript is written for this site, and all content works with JavaScript disabled.

## Pages

| Route | Indexing |
| --- | --- |
| `/` | indexable in production |
| `/features/` | indexable in production |
| `/privacy/` | draft portfolio disclosure; always noindex and not in the sitemap until reviewed |
| `/404.html` | static not-found page |

Plus `robots.txt`, `sitemap.xml`, `og.png` (generated at build), and `icon.svg`.

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

```powershell
pnpm install
pnpm dev            # development server on :3001
pnpm lint
pnpm typecheck
pnpm test           # Vitest: build configuration rules
pnpm build          # static export to out/
pnpm start          # serve out/ like a plain static host on :3001 (404.html for missing pages)
pnpm test:static    # builds production and preview variants and checks the exported files
pnpm test:e2e       # Playwright: builds, serves out/, checks routes, no-JS, axe, keyboard, 320 px
```

`pnpm test:static` checks that a production build without an origin fails, preview pages are noindex with an empty
sitemap, production pages have unique titles, descriptions, one h1, canonical URLs, absolute `og:image`, a sitemap
listing only `/` and `/features/`, and no references to localhost or the app API. It also confirms the project has no
shadcn/ui dependencies, files, or imports. It leaves `out/` holding the production-configured build.

Run `pnpm exec playwright install chromium` once before the first `pnpm test:e2e`.

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

