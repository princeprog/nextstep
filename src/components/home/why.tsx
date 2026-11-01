import { CheckCircleIcon, MinusCircleIcon } from "@/components/icons"

import styles from "./why.module.css"

const BEFORE = [
  "Job links saved across tabs and bookmarks",
  "Follow-up dates kept in your head or a notes app",
  "Interview times buried in email threads",
  "No quick answer to “what should I do today?”",
]

const AFTER = [
  "Every application in one list, with its status",
  "Follow-ups that show up in the app when they're due",
  "Interviews kept with the role they belong to",
  "A dashboard that starts with what needs attention",
]

const SORTED = [
  { title: "Send a thank-you note to Mara", meta: "Today · 5:00 PM · Harbor Labs", tone: styles.toneRed, tag: "Today" },
  { title: "Technical interview with Jun Navarro", meta: "Tue · 10:00 AM New York · 11:00 PM yours", tone: styles.toneViolet, tag: "Interview" },
  { title: "Follow up with Northwind Studio", meta: "Thu · Product Designer", tone: styles.toneBlue, tag: "Thu" },
  { title: "Finish the take-home exercise", meta: "Fri · Tala Fintech", tone: styles.toneSlate, tag: "Fri" },
]

/** Why it exists: the scattered search on one side, one sorted list on the other. */
export function Why() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head">
          <h2 id="why-title" className="section-title">
            From scattered notes to one clear next step
          </h2>
          <p className="section-lede">
            A job search spreads across browser tabs, inboxes, and notes apps. NextStep keeps the details in one place
            and puts the next action first.
          </p>
        </div>
        <div className={styles.layout}>
          <div className={styles.lists}>
            <div className={styles.card}>
              <h3 className={styles.listTitle}>Without a single place</h3>
              <ul className={styles.list}>
                {BEFORE.map((item) => (
                  <li key={item}>
                    <MinusCircleIcon className={styles.muted} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.card + " " + styles.cardOn}>
              <h3 className={styles.listTitle}>With NextStep</h3>
              <ul className={styles.list}>
                {AFTER.map((item) => (
                  <li key={item}>
                    <CheckCircleIcon className={styles.check} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <figure className={styles.sorted}>
            <figcaption className={styles.sortedHead}>
              <span>Sorted by what&apos;s due</span>
              <span className={styles.sortedNote}>Fictional examples</span>
            </figcaption>
            <ol className={styles.sortedList}>
              {SORTED.map((row, index) => (
                <li key={row.title} className={styles.sortedRow}>
                  <span className={styles.rank}>{index + 1}</span>
                  <span className={styles.sortedText}>
                    <b>{row.title}</b>
                    <span>{row.meta}</span>
                  </span>
                  <span className={styles.tag + " " + row.tone}>{row.tag}</span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>
    </section>
  )
}

