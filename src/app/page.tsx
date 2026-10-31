import type { Metadata } from "next"
import { Fraunces } from "next/font/google"

import { Cta } from "@/components/cta"
import { ProductPreview } from "@/components/product-preview"
import { SiteHeader } from "@/components/site-header"
import { pageMetadata } from "@/lib/metadata"

import styles from "./home.module.css"

// The italic display face appears only on this page, so it is loaded here instead of in the root layout.
const displayItalic = Fraunces({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-display-italic",
  axes: ["opsz", "SOFT"],
  display: "swap",
})

export const metadata: Metadata = {
  ...pageMetadata({
    title: "NextStep — Organize your job search",
    description: "Track job applications, follow-ups, and interviews in a clear workspace that helps you focus on your next step.",
    path: "/",
  }),
  title: { absolute: "NextStep — Organize your job search" },
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className={displayItalic.variable}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={"container " + styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className="eyebrow reveal" style={{ "--i": 0 } as React.CSSProperties}>A job-search workspace</span>
              <h1 id="hero-title" className={styles.title + " reveal"} style={{ "--i": 1 } as React.CSSProperties}>
                Keep your job search <em>moving.</em>
              </h1>
              <p className={styles.lede + " reveal"} style={{ "--i": 2 } as React.CSSProperties}>
                Bring applications, follow-ups, and interviews together, so you always know what to do next.
              </p>
              <div className="reveal" style={{ "--i": 3 } as React.CSSProperties}>
                <Cta />
              </div>
            </div>
            <div className="reveal" style={{ "--i": 2 } as React.CSSProperties}>
              <ProductPreview />
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contrast-title">
          <div className="container">
            <div className={styles.sectionHead}>
              <span className="eyebrow">Why it exists</span>
              <h2 id="contrast-title" className={styles.sectionTitle}>From scattered notes to one clear next step</h2>
              <p className={styles.sectionLede}>
                A job search spreads across browser tabs, inboxes, and notes apps. NextStep keeps the details in one
                place and puts the next action first.
              </p>
            </div>
            <div className={styles.contrast}>
              <div className={styles.column + " " + styles.before}>
                <h3 className={styles.columnTitle}>Without a single place</h3>
                <ul className={styles.points}>
                  <li>Job links saved across tabs and bookmarks</li>
                  <li>Follow-up dates kept in your head or a notes app</li>
                  <li>Interview times buried in email threads</li>
                  <li>No quick answer to “what should I do today?”</li>
                </ul>
              </div>
              <div className={styles.column + " " + styles.after}>
                <h3 className={styles.columnTitle}>With NextStep</h3>
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
              <span className="eyebrow">What you can do</span>
              <h2 id="stories-title" className={styles.sectionTitle}>Small steps, kept in order</h2>
            </div>
            <div className={styles.stories}>
              <article className={styles.story}>
                <div className={styles.storyCopy}>
                  <span className={styles.storyNumber}>One</span>
                  <h3 className={styles.storyTitle}>Keep every opportunity in one place.</h3>
                  <p className={styles.storyText}>
                    Save the role, company, status, and useful notes. Move an application through six stages—Saved,
                    Applied, Interview, Offer, Rejected, or Withdrawn—and correct it anytime.
                  </p>
                </div>
                <div className={styles.storyVisual} aria-hidden="true">
                  <div className={styles.pipeline}>
                    {[["Saved", 4], ["Applied", 6], ["Interview", 2], ["Offer", 1], ["Rejected", 3], ["Withdrawn", 1]].map(([name, count]) => (
                      <div key={name} className={styles.stage + (name === "Interview" ? " " + styles.stageHighlight : "")}>
                        <div className={styles.stageCount}>{count}</div>
                        <div className={styles.stageName}>{name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className={styles.story + " " + styles.storyReverse}>
                <div className={styles.storyCopy}>
                  <span className={styles.storyNumber}>Two</span>
                  <h3 className={styles.storyTitle}>Stay on top of follow-ups.</h3>
                  <p className={styles.storyText}>
                    Add due dates, and an exact time when it matters. Tasks that need attention appear on your dashboard
                    inside the app, using the time zone you saved them in. NextStep doesn&apos;t send emails or notifications.
                  </p>
                </div>
                <div className={styles.storyVisual} aria-hidden="true">
                  <div className={styles.dueGroups}>
                    <div className={styles.dueGroup}>
                      <h4 className={styles.overdue}>Overdue</h4>
                      <div className={styles.dueItem}><span>Reply to recruiter at Cedar &amp; Pine</span><span>Yesterday</span></div>
                    </div>
                    <div className={styles.dueGroup}>
                      <h4>Due today</h4>
                      <div className={styles.dueItem}><span>Send a thank-you note to Mara</span><span>5:00 PM</span></div>
                    </div>
                    <div className={styles.dueGroup}>
                      <h4>This week</h4>
                      <div className={styles.dueItem}><span>Finish the take-home exercise</span><span>Friday</span></div>
                    </div>
                  </div>
                </div>
              </article>

              <article className={styles.story}>
                <div className={styles.storyCopy}>
                  <span className={styles.storyNumber}>Three</span>
                  <h3 className={styles.storyTitle}>Prepare for what&apos;s ahead.</h3>
                  <p className={styles.storyText}>
                    Record interview details alongside the application: the type, the time in the interviewer&apos;s time
                    zone, a meeting link, and your preparation notes.
                  </p>
                </div>
                <div className={styles.storyVisual} aria-hidden="true">
                  <div className={styles.interview}>
                    <span className="eyebrow">Technical interview</span>
                    <div className={styles.interviewWhen}>Tuesday, 10:00 AM</div>
                    <div className={styles.interviewMeta}>America/New_York · 60 min · with Jun Navarro</div>
                    <span className={styles.yourTime}>Your time: Tuesday, 10:00 PM in Manila</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.section} aria-labelledby="how-title">
          <div className="container">
            <div className={styles.sectionHead}>
              <span className="eyebrow">How it works</span>
              <h2 id="how-title" className={styles.sectionTitle}>Three steps, then back to your search</h2>
            </div>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <h3 className={styles.stepTitle}>Save an opportunity</h3>
                <p className={styles.stepText}>Add the company and role. Fill in the link, salary, or contact whenever you have them.</p>
              </li>
              <li className={styles.step}>
                <h3 className={styles.stepTitle}>Add the next action</h3>
                <p className={styles.stepText}>A follow-up, a take-home deadline, or an interview—each tied to its application.</p>
              </li>
              <li className={styles.step}>
                <h3 className={styles.stepTitle}>Return to a clear dashboard</h3>
                <p className={styles.stepText}>See what&apos;s overdue, what&apos;s due this week, and which interviews are coming up.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="closing-title">
          <div className="container">
            <div className={styles.closing}>
              <h2 id="closing-title" className={styles.closingTitle}>Make space for the next opportunity.</h2>
              <Cta />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

