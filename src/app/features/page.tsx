import type { Metadata } from "next"

import { CtaBand } from "@/components/cta-band"
import { CalendarIcon, ClockIcon, LockIcon, RecordIcon, SearchIcon, StagesIcon } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { pageMetadata } from "@/lib/metadata"

import styles from "./features.module.css"

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "What NextStep does today: application records, a six-stage pipeline, time-zone-aware follow-ups, interviews, search, and a private dashboard.",
  path: "/features/",
})

/** Position in the intro's staggered entrance (the global .reveal class). */
const order = (i: number) => ({ "--i": i }) as React.CSSProperties

const FEATURES = [
  {
    id: "applications",
    Icon: RecordIcon,
    title: "Applications",
    text: "One record per opportunity, so the details are there when you need them.",
    points: [
      "Company, job title, posting link, location, work arrangement, and employment type",
      "Optional salary range with its currency and period",
      "Contact name and email, plus plain-text notes",
      "Archive what you're done with and restore it later, with everything intact",
    ],
  },
  {
    id: "pipeline",
    Icon: StagesIcon,
    title: "A six-stage pipeline",
    text: "Saved, Applied, Interview, Offer, Rejected, and Withdrawn.",
    points: [
      "Change the status from the list or the application page",
      "Correct a status at any time; you're never forced through every stage",
      "Moving to Applied asks for the real date you applied",
      "The dashboard shows how many active applications are in each stage",
    ],
  },
  {
    id: "tasks",
    Icon: ClockIcon,
    title: "Tasks and follow-ups",
    text: "Due dates that mean what you expect, wherever you are.",
    points: [
      "A due date, with an exact time when needed",
      "Each task keeps the time zone it was created in",
      "Overdue, due today, and this week appear inside the app",
      "Complete a task in one step, or reopen it if you were early",
    ],
  },
  {
    id: "interviews",
    Icon: CalendarIcon,
    title: "Interviews",
    text: "Interview details stay with the application they belong to.",
    points: [
      "Phone screen, technical, behavioral, final, or other",
      "Start time entered in the interviewer's time zone, shown alongside yours",
      "Duration, location, meeting link, interviewer, and notes",
      "Interviews in the next seven days appear on the dashboard",
    ],
  },
  {
    id: "search",
    Icon: SearchIcon,
    title: "Search, filters, and sorting",
    text: "Find an older record quickly as your list grows.",
    points: [
      "Search by company, role, or contact",
      "Filter by status, work arrangement, employment type, location, and applied dates",
      "Sort by last update, company, applied date, or next task due",
      "Your search and filters live in the link, so back and forward work as expected",
    ],
  },
  {
    id: "workspace",
    Icon: LockIcon,
    title: "A private workspace",
    text: "Your job search belongs to your account alone.",
    points: [
      "Sign in with email and password; sessions use secure, HttpOnly cookies",
      "Confirm your email address when you sign up, and reset a forgotten password by email",
      "Every record is checked against its owner on the server",
      "Download all your data as a JSON file, or delete your account and its data permanently",
      "A temporary demo with fictional data, kept separate for each visitor and removed after 24 hours",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      <SiteHeader current="features" />
      <main id="main" tabIndex={-1} className={styles.page}>
        <div className="container">
          <div className={styles.intro}>
            <h1 className={styles.title + " reveal"} style={order(0)}>
              What NextStep does <em className="accent">today</em>
            </h1>
            <p className={styles.lede + " reveal"} style={order(1)}>
              NextStep is a focused workspace for one person&apos;s job search. Here&apos;s everything it currently does,
              and what it deliberately leaves out for now.
            </p>
          </div>
          <div className={styles.grid}>
            {FEATURES.map(({ id, Icon, title, text, points }) => (
              <section key={id} className={styles.card} aria-labelledby={"feature-" + id}>
                <span className={styles.icon}>
                  <Icon />
                </span>
                <h2 id={"feature-" + id} className={styles.cardTitle}>
                  {title}
                </h2>
                <p className={styles.cardText}>{text}</p>
                <ul className={styles.points}>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <section className={styles.later} aria-labelledby="later-title">
            <div className={styles.laterHead}>
              <h2 id="later-title">Not included yet</h2>
              <p>These aren&apos;t available. They may come later, only if they turn out to be useful.</p>
            </div>
            <ul>
              <li>Email or push reminders</li>
              <li>Importing jobs from job boards</li>
              <li>AI résumé or cover-letter help</li>
              <li>Calendar sync</li>
              <li>File attachments</li>
            </ul>
          </section>
        </div>
        <CtaBand
          id="features-cta"
          title={
            <>
              Ready for a <em className="accent">calmer</em> search?
            </>
          }
          secondaryFeatures={false}
        />
      </main>
    </>
  )
}
