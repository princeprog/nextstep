import type { Metadata } from "next"

import { Cta } from "@/components/cta"
import { CtaBand } from "@/components/cta-band"
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  LockIcon,
  SearchIcon,
  StagesIcon,
} from "@/components/icons"
import { ProductPreview } from "@/components/product-preview"
import { SiteHeader } from "@/components/site-header"
import { accentFont } from "@/lib/accent-font"
import { pageMetadata } from "@/lib/metadata"

import styles from "./home.module.css"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "NextStep — Organize your job search",
    description: "Track job applications, follow-ups, and interviews in a clear workspace that helps you focus on your next step.",
    path: "/",
  }),
  title: { absolute: "NextStep — Organize your job search" },
}

/** Position in the hero's staggered entrance (the global .reveal class). */
const order = (i: number) => ({ "--i": i }) as React.CSSProperties

const STAGES = [
  ["Saved", 3],
  ["Applied", 5],
  ["Interview", 2],
  ["Offer", 1],
  ["Rejected", 3],
  ["Withdrawn", 1],
] as const

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className={accentFont.variable}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={"container " + styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className="eyebrow reveal" style={order(0)}>
                A job-search workspace
              </span>
              <h1 id="hero-title" className={styles.title + " reveal"} style={order(1)}>
                Keep your job search <em className="accent">moving.</em>
              </h1>
              <p className={styles.lede + " reveal"} style={order(2)}>
                Bring applications, follow-ups, and interviews together, so you always know what to do next.
              </p>
              <div className="reveal" style={order(3)}>
                <Cta />
              </div>
              <ul className={styles.facts + " reveal"} style={order(4)}>
                <li>
                  <CheckIcon className={styles.factIcon} />
                  Six-stage pipeline
                </li>
                <li>
                  <CheckIcon className={styles.factIcon} />
                  Time-zone-aware follow-ups
                </li>
                <li>
                  <CheckIcon className={styles.factIcon} />
                  Private by default
                </li>
              </ul>
            </div>
            <ProductPreview />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contrast-title">
          <div className="container">
            <div className={styles.sectionHead}>
              <div className={styles.sectionHeadMain}>
                <span className="eyebrow">Why it exists</span>
                <h2 id="contrast-title" className={styles.sectionTitle}>
                  From scattered notes to one <em className="accent">clear</em> next step
                </h2>
              </div>
              <p className={styles.sectionLede}>
                A job search spreads across browser tabs, inboxes, and notes apps. NextStep keeps the details in one
                place and puts the next action first.
              </p>
            </div>
            <div className={styles.contrast}>
              <div className={styles.panel + " " + styles.before}>
                <div className={styles.scatter} aria-hidden="true">
                  <span className={styles.scrap}>14 tabs open</span>
                  <span className={styles.scrap}>notes-final-v2.txt</span>
                  <span className={styles.scrap}>Re: Next steps?</span>
                  <span className={styles.scrap}>Bookmarks › Jobs</span>
                </div>
                <h3 className={styles.panelTitle}>Without a single place</h3>
                <ul className={styles.points}>
                  <li>Job links saved across tabs and bookmarks</li>
                  <li>Follow-up dates kept in your head or a notes app</li>
                  <li>Interview times buried in email threads</li>
                  <li>No quick answer to “what should I do today?”</li>
                </ul>
              </div>
              <div className={styles.panel + " " + styles.after}>
                <div className={styles.aligned} aria-hidden="true">
                  <span className={styles.lineItem}>
                    <span className={styles.lineDot} />
                    Harbor Labs
                    <span className={styles.lineStatus}>Interview</span>
                  </span>
                  <span className={styles.lineItem}>
                    Northwind Studio
                    <span className={styles.lineStatus}>Applied</span>
                  </span>
                  <span className={styles.lineItem}>
                    Lumen Analytics
                    <span className={styles.lineStatus}>Saved</span>
                  </span>
                </div>
                <h3 className={styles.panelTitle}>With NextStep</h3>
                <ul className={styles.points}>
                  <li>Every application in one list, with its status</li>
                  <li>Follow-ups that show up in the app when they&apos;re due</li>
                  <li>Interviews kept with the role they belong to</li>
                  <li>A dashboard that starts with what needs attention</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="stories-title">
          <div className="container">
            <div className={styles.sectionHead}>
              <div className={styles.sectionHeadMain}>
                <span className="eyebrow">What you can do</span>
                <h2 id="stories-title" className={styles.sectionTitle}>
                  Small steps, kept in <em className="accent">order</em>
                </h2>
              </div>
              <p className={styles.sectionLede}>
                Applications, follow-ups, and interviews live side by side, so the next action is never far away.
              </p>
            </div>
            <div className={styles.bento}>
              <article className={styles.tile + " " + styles.tileWide}>
                <div className={styles.tileCopy}>
                  <span className={styles.kicker}>
                    <StagesIcon />
                    Applications
                  </span>
                  <h3 className={styles.tileTitle}>Keep every opportunity in one place.</h3>
                  <p className={styles.tileText}>
                    Save the role, company, status, and useful notes. Move an application through six stages—Saved,
                    Applied, Interview, Offer, Rejected, or Withdrawn—and correct it anytime.
                  </p>
                </div>
                <div className={styles.tileVisual} aria-hidden="true">
                  <div className={styles.track}>
                    {STAGES.map(([name, count]) => (
                      <span key={name} className={styles.trackStage + (name === "Interview" ? " " + styles.trackCurrent : "")}>
                        <span className={styles.trackCount}>{count}</span>
                        <span className={styles.trackName}>{name}</span>
                      </span>
                    ))}
                  </div>
                  <div className={styles.statusRow}>
                    <span className={styles.statusCompany}>
                      Harbor Labs
                      <span>Frontend Developer</span>
                    </span>
                    <span className={styles.select}>
                      Interview
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </article>

              <article className={styles.tile}>
                <div className={styles.tileCopy}>
                  <span className={styles.kicker}>
                    <ClockIcon />
                    Follow-ups
                  </span>
                  <h3 className={styles.tileTitle}>Stay on top of follow-ups.</h3>
                  <p className={styles.tileText}>
                    Add due dates, and an exact time when it matters. Tasks that need attention wait on your dashboard,
                    in the time zone you saved them in. No reminder emails or notifications.
                  </p>
                </div>
                <div className={styles.tileVisual} aria-hidden="true">
                  <div className={styles.dueList}>
                    <span className={styles.dueLabel + " " + styles.overdue}>Overdue</span>
                    <span className={styles.dueItem}>
                      <span className={styles.checkbox} />
                      <span>Reply to the recruiter at Cedar &amp; Pine</span>
                      <span className={styles.dueWhen}>Yesterday</span>
                    </span>
                    <span className={styles.dueLabel + " " + styles.today}>Due today</span>
                    <span className={styles.dueItem}>
                      <span className={styles.checkbox} />
                      <span>Send a thank-you note to Mara</span>
                      <span className={styles.dueWhen}>5:00 PM</span>
                    </span>
                  </div>
                </div>
              </article>

              <article className={styles.tile}>
                <div className={styles.tileCopy}>
                  <span className={styles.kicker}>
                    <CalendarIcon />
                    Interviews
                  </span>
                  <h3 className={styles.tileTitle}>Prepare for what&apos;s ahead.</h3>
                  <p className={styles.tileText}>
                    Record interview details alongside the application: the type, the time in the interviewer&apos;s time
                    zone, a meeting link, and your preparation notes.
                  </p>
                </div>
                <div className={styles.tileVisual} aria-hidden="true">
                  <div className={styles.interview}>
                    <span className={styles.interviewType}>Technical interview · Tue, Nov 10</span>
                    <span className={styles.times}>
                      <span className={styles.time}>
                        <strong>10:00 AM</strong>
                        <span>New York</span>
                      </span>
                      <ArrowRightIcon className={styles.timeArrow} />
                      <span className={styles.time + " " + styles.timeYou}>
                        <strong>11:00 PM</strong>
                        <span>Manila, your time</span>
                      </span>
                    </span>
                    <span className={styles.prep}>Prep: walk through the design-system migration</span>
                  </div>
                </div>
              </article>

              <article className={styles.tile}>
                <div className={styles.tileCopy}>
                  <span className={styles.kicker}>
                    <SearchIcon />
                    Search and filters
                  </span>
                  <h3 className={styles.tileTitle}>Find older records quickly.</h3>
                  <p className={styles.tileText}>
                    Search by company, role, or contact. Filter by status, work arrangement, and dates, and sort by
                    what&apos;s due next.
                  </p>
                </div>
                <div className={styles.tileVisual} aria-hidden="true">
                  <span className={styles.searchBox}>
                    <SearchIcon />
                    harbor
                    <span className={styles.caret} />
                  </span>
                  <span className={styles.filterChips}>
                    <span className={styles.filterChip + " " + styles.filterChipOn}>Interview</span>
                    <span className={styles.filterChip}>Remote</span>
                    <span className={styles.filterChip}>Full-time</span>
                  </span>
                  <span className={styles.result}>
                    <span className={styles.resultMono}>H</span>
                    <span>
                      <mark>Harbor</mark> Labs
                      <small>Frontend Developer · Remote</small>
                    </span>
                  </span>
                </div>
              </article>

              <article className={styles.tile}>
                <div className={styles.tileCopy}>
                  <span className={styles.kicker}>
                    <LockIcon />
                    Privacy
                  </span>
                  <h3 className={styles.tileTitle}>Yours alone.</h3>
                  <p className={styles.tileText}>
                    Every record is checked against its owner on the server. Download all your data as a JSON file, or
                    delete your account and its data from settings.
                  </p>
                </div>
                <div className={styles.tileVisual} aria-hidden="true">
                  <span className={styles.privacyRow}>
                    <LockIcon />
                    Checked against your account
                  </span>
                  <span className={styles.privacyRow}>
                    <CheckIcon />
                    Download everything as JSON
                  </span>
                  <span className={styles.privacyRow}>
                    <CheckIcon />
                    Delete your account anytime
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.section} aria-labelledby="how-title">
          <div className="container">
            <div className={styles.sectionHead}>
              <div className={styles.sectionHeadMain}>
                <span className="eyebrow">How it works</span>
                <h2 id="how-title" className={styles.sectionTitle}>
                  Three steps, then back to your <em className="accent">search</em>
                </h2>
              </div>
              <p className={styles.sectionLede}>
                Add what you know now and fill in the rest later. Each step builds on the one before.
              </p>
            </div>
            <ol className={styles.stairs}>
              <li className={styles.stair}>
                <h3 className={styles.stairTitle}>Save an opportunity</h3>
                <p className={styles.stairText}>
                  Add the company and role. Fill in the link, salary, or contact whenever you have them.
                </p>
              </li>
              <li className={styles.stair}>
                <h3 className={styles.stairTitle}>Add the next action</h3>
                <p className={styles.stairText}>
                  A follow-up, a take-home deadline, or an interview—each tied to its application.
                </p>
              </li>
              <li className={styles.stair}>
                <h3 className={styles.stairTitle}>Return to a clear dashboard</h3>
                <p className={styles.stairText}>
                  See what&apos;s overdue, what&apos;s due this week, and which interviews are coming up.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <CtaBand
          id="closing-title"
          title={
            <>
              Make space for the <em className="accent">next</em> opportunity.
            </>
          }
        />
      </main>
    </>
  )
}
