# AGENTS.md — nextstep (static website)

Guidance for coding agents working on the NextStep public website.

## Read the project context first

Read **Marketing Website Design and SEO** and **Website Content and Sitemap** in the owner's Obsidian vault before
changing design or copy. When notes disagree, follow newer explicit user decisions, then the Decision Log, Product
Requirements, and supporting notes. Design and motion follow Emil Kowalski's design-engineering skill, installed for
this user with `npx skills add emilkowalski/skills@emil-design-eng -g` at
`C:\Users\Al Prince\.agents\skills\emil-design-eng\SKILL.md` (update it with `npx skills update -g`).

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
- New indexable pages need `pageMetadata` and an entry in `INDEXABLE_ROUTES`. Keep `/privacy/` and `/terms/`
  noindex and out of the sitemap until the owner approves their text.
- The privacy policy must match what the app and API actually do. Before changing a claim about stored data, emails,
  third parties, or retention, check the API code (`nextstep-api`) and its README; when the app's data handling
  changes, update the policy and its "Last updated" date in the same change. Don't add legal claims the owner hasn't
  approved. Operator details live in `src/lib/operator.ts`.
- Motion: CSS only, opacity and transform, under about 300 ms for UI (a short explanatory entrance may run longer),
  hover effects behind `(hover: hover) and (pointer: fine)`, and a `prefers-reduced-motion` alternative.
- Keep content readable at 320 px, keyboard accessible with visible focus, and meeting WCAG 2.2 AA contrast.

## Verification

```powershell
pnpm lint; pnpm typecheck; pnpm test; pnpm build; pnpm test:static; pnpm test:e2e
```

CI runs the same checks on every push and pull request (`.github/workflows/ci.yml`). The Security workflow runs
`pnpm audit` (fails on high or critical), OSV-Scanner over `pnpm-lock.yaml`, and gitleaks over the full git history. Add
an OSV-Scanner exception to `osv-scanner.toml` only for a triaged advisory, with a reason and an expiry date. Pin any new
third-party action to a full commit SHA with the version in a trailing comment.

After changes that affect loading (fonts, CSS, images, scripts, or `next.config.ts`), run `pnpm perf` and compare with
the results in the README. It is a lab check, not a CI gate.

Build with `pnpm build`, not `next build` directly: it also moves route prefetch files that Next.js 16.4 misplaces on
Windows.

gitleaks scans the full git history, so never commit key- or token-like strings, even as test data. Run
`gitleaks git . --redact` before pushing. Deployment, rollback, and the steps for publishing the approved privacy policy
and terms are in the README's "Operations runbooks".

## Don'ts

- No deployment or production hosting changes without an explicit request from the owner.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

