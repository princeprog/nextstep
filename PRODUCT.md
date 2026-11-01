# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** people running their own job search, including recent graduates and career changers. Their applications, interview dates, recruiter conversations, and follow-ups are spread across spreadsheets, email, messages, and notes, and they want to know what to do next without searching several tools. The public website speaks to them first (confirmed by the owner, 2026-11-01).
- **Secondary:** portfolio visitors, such as recruiters and hiring managers, who judge the owner's design and engineering through the isolated demo.
- One private workspace per account. There are no teams, recruiter portals, or administrator workflows.

## Product Purpose

NextStep is a personal job-search workspace. A user records an application, moves it through six stages, attaches due-dated tasks and interviews to it, and sees what needs attention on a dashboard. Success means a job seeker can answer "What should I do next?" at a glance and find the context for any application in one place. The project must also be understandable and demonstrable in a portfolio.

## Positioning

NextStep organizes a job search around the next action, not around a list of records. The dashboard leads with overdue tasks, then tasks due in the next seven days, then interviews in the next 168 hours, and every task and interview belongs to an application. Times keep the time zone they were set in, so an interview with a company abroad shows its original zone next to the time.

## Operating Context

- Three surfaces: this public static website (`nextstep`), the signed-in web app (`nextstep-app`, which uses shadcn/ui), and a Spring Boot API with PostgreSQL (`nextstep-api`).
- The website links to sign-up (`PUBLIC_APP_URL`) and to a session-isolated demo with fictional data (`PUBLIC_DEMO_URL`) through `src/site-config.ts`. Without those values it shows an availability note.
- English interface. Philippine examples are welcome, but the product is not tied to one country, currency, or time zone.
- Not deployed. Hosting, domain, email provider, and the privacy policy and terms await the owner's decisions.

## Capabilities and Constraints

- Available: registration with email confirmation, sign-in and sign-out, password reset by email, profile and time zone; an isolated demo; create, view, edit, archive, and restore applications; a six-stage pipeline with an accessible list and a compact overview; application-linked tasks with completion, reopening, and in-app due states; interview records (type, time and zone, link, notes) with upcoming interviews on the dashboard; server-side search, filters, sorting, and pagination; plain-text notes; JSON download of all data and account deletion.
- Not available, never advertise: reminder emails or push notifications, imports or job-board integrations, AI features, calendar sync, file attachments, team sharing, drag-and-drop pipeline, analytics, native apps, billing.
- The website is a Next.js static export with no runtime API calls, forms, analytics, cookies, or tracking. It builds and serves without the app, API, or database.
- No shadcn/ui, Radix, Base UI, or Tailwind on the website: custom components with CSS Modules and `src/app/globals.css`.
- Terms: application, stage, task, follow-up, interview, next step, workspace, demo.

## Brand Commitments

- Name: NextStep, with a staircase logo mark (`src/components/wordmark.tsx`, `src/app/icon.svg`).
- Voice: practical, encouraging, concise. No shame about rejections or the pace of a search.
- Truthful copy: no invented testimonials, metrics, logos, rankings, guarantees, or features. Product illustrations use fictional names.
- Operator: Al Prince Llavan (alprincellavan2019@gmail.com), shown on the privacy and terms pages through `src/lib/operator.ts`.
- Public website look: the category standard for product landing pages, played straight (the owner's choice on 2026-11-01), finished to the level of Linear, Raycast, and Vercel.

## Evidence on Hand

- The product itself: the web app and the seeded demo workspace with fictional data, which the site links to.
- Real architecture facts usable as engineering proof: a static website, the app, the API, and PostgreSQL; ownership checks on every record, CSRF protection, and demo isolation.
- There are no users, testimonials, customer logos, usage metrics, benchmarks, press, or pricing. Validation with job seekers has not happened yet. Do not fabricate any of these.

## Product Principles

1. The next action comes first; records and history support it.
2. Calm over urgency: show what is overdue without guilt or alarm.
3. Describe only what the product does today.
4. Private by default: one person's workspace, never shared.
5. Let the demo and faithful, fictional illustrations of the app make the case.

## Accessibility & Inclusion

WCAG 2.2 AA for implemented flows, verified rather than claimed. Usable from 320 CSS px wide, by keyboard alone, and by touch. The website works without JavaScript, and people who prefer reduced motion get the complete page.
