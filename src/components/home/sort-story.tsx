import { FileIcon, MailIcon, StarIcon } from "../icons"

import styles from "./sort-story.module.css"

/**
 * Why NextStep exists, told by scrolling: the scraps of a job search (a tab, a sticky note, an email, a bookmark) gather
 * into one list, sorted by what's due. The lists below say the same thing in words.
 */
export function SortStory() {
  return (
    <section className="section" aria-labelledby="sort-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why it exists</span>
          <h2 id="sort-title" className="section-title">
            From scattered notes to one <em className="accent">clear</em> next step
          </h2>
          <p className="section-lede">
            A job search spreads across browser tabs, inboxes, and notes apps. NextStep keeps the details in one place
            and puts the next action first.
          </p>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <span className={styles.scrap + " " + styles.tab}>
            <span className={styles.favicon} />
            Frontend Developer – Harbor Labs
            <span className={styles.tabClose}>×</span>
          </span>
          <span className={styles.scrap + " " + styles.sticky}>Thank-you note to Mara… by Thursday?</span>
          <span className={styles.scrap + " " + styles.mail}>
            <MailIcon />
            <span>
              <b>Re: Next steps</b>
              <small>Jun Navarro · Tue at 10, New York time</small>
            </span>
          </span>
          <span className={styles.scrap + " " + styles.bookmark}>
            <StarIcon />
            Jobs › Product Designer, Northwind
          </span>
          <span className={styles.scrap + " " + styles.file}>
            <FileIcon />
            notes-final-v2.txt
          </span>
          <span className={styles.scrap + " " + styles.calendar}>
            <b>Tue</b>
            <span>10:00 … my time?</span>
          </span>
          <span className={styles.sweep} />

          <div className={styles.sorted}>
            <span className={styles.sortedHead}>
              Your next steps
              <small>Sorted by what&apos;s due</small>
            </span>
            <span className={styles.row + " " + styles.rowNext}>
              <span className={styles.rowDot} />
              <span>
                <b>Send a thank-you note to Mara</b>
                <small>Today · 5:00 PM · Harbor Labs</small>
              </span>
              <span className={styles.chip + " " + styles.chipToday}>Due today</span>
            </span>
            <span className={styles.row}>
              <span className={styles.rowDot} />
              <span>
                <b>Technical interview with Jun Navarro</b>
                <small>Tue · 10:00 AM New York · 11:00 PM yours</small>
              </span>
              <span className={styles.chip + " " + styles.chipInterview}>Interview</span>
            </span>
            <span className={styles.row}>
              <span className={styles.rowDot} />
              <span>
                <b>Follow up with Northwind Studio</b>
                <small>Thu · Product Designer</small>
              </span>
              <span className={styles.chip}>Upcoming</span>
            </span>
            <span className={styles.row}>
              <span className={styles.rowDot} />
              <span>
                <b>Finish the take-home exercise</b>
                <small>Fri · Tala Fintech</small>
              </span>
              <span className={styles.chip}>Upcoming</span>
            </span>
          </div>
        </div>

        <div className={styles.compare}>
          <div className={styles.without}>
            <h3>Without a single place</h3>
            <ul>
              <li>Job links saved across tabs and bookmarks</li>
              <li>Follow-up dates kept in your head or a notes app</li>
              <li>Interview times buried in email threads</li>
              <li>No quick answer to “what should I do today?”</li>
            </ul>
          </div>
          <div className={styles.with}>
            <h3>With NextStep</h3>
            <ul>
              <li>Every application in one list, with its status</li>
              <li>Follow-ups that show up in the app when they&apos;re due</li>
              <li>Interviews kept with the role they belong to</li>
              <li>A dashboard that starts with what needs attention</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
