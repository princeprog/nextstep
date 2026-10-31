# AGENTS.md — nextstep (static website)

Guidance for coding agents working on the NextStep public website.

## Read the project context first

Read **Marketing Website Design and SEO** and **Website Content and Sitemap** in the owner's Obsidian vault before
changing design or copy. When notes disagree, follow newer explicit user decisions, then the Decision Log, Product
Requirements, and supporting notes. Design and motion follow the Emil design-engineering guidance at
`C:\Users\Al Prince\Documents\AyahayV2\.agents\skills\emil-design-eng\SKILL.md`.

## Obsidian links

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

## Boundaries

- **Never install, copy, import, or use shadcn/ui** (or Radix, Base UI, Tailwind, or app components). Build custom
  components with CSS Modules and `src/app/globals.css`. `pnpm test:static` enforces this.
- The site must stay a static export: no runtime API calls, server actions, middleware, auth, cookies, analytics,
  tracking, or forms. It must build and serve without the app, API, or database.
- Copy must be truthful: don't advertise reminders, imports, AI, calendar sync, or other features the app doesn't have,
  and don't add invented testimonials, metrics, logos, or rankings. Use fictional names in product illustrations.
- Calls to action read `PUBLIC_APP_URL` and `PUBLIC_DEMO_URL` through `src/site-config.ts`; without them, keep the availability note.
- New indexable pages need `pageMetadata` and an entry in `INDEXABLE_ROUTES`. Keep `/privacy/` noindex until it is reviewed.
- Motion: CSS only, opacity and transform, under about 300 ms for UI (a short explanatory entrance may run longer),
  hover effects behind `(hover: hover) and (pointer: fine)`, and a `prefers-reduced-motion` alternative.
- Keep content readable at 320 px, keyboard accessible with visible focus, and meeting WCAG 2.2 AA contrast.

## Verification

```powershell
pnpm lint; pnpm typecheck; pnpm test; pnpm build; pnpm test:static; pnpm test:e2e
```

## Don'ts

- No deployment or production hosting changes without an explicit request from the owner.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

