import { CheckCircleIcon, ClockIcon, FileIcon, SearchIcon } from "@/components/icons"

import styles from "./feature-grid.module.css"

const APPLICATIONS = [
  { role: "Product Designer", company: "Harbor Labs", stage: "Interview", tone: styles.violet },
  { role: "Junior Backend Engineer", company: "Tala Fintech", stage: "Applied", tone: styles.blue },
  { role: "Data Analyst", company: "Bayside Health", stage: "Saved", tone: styles.slate },
  { role: "Frontend Developer", company: "Northwind Studio", stage: "Offer", tone: styles.green },
]

/** What you can do: five features, each beside a small, fictional picture of it in the app. */
export function FeatureGrid() {
  return (
    <section className="section" aria-labelledby="features-title">
      <div className="container">
        <div className="section-head">
          <h2 id="features-title" className="section-title">
            Small steps, kept in order
          </h2>
          <p className="section-lede">
            Applications, follow-ups, and interviews live side by side, so the next action is never far away.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card + " " + styles.wide}>
            <div className={styles.copy}>
              <h3 className={styles.title}>Keep every opportunity in one place.</h3>
              <p className={styles.text}>
                Save the role, company, status, and useful notes. Move an application through six stages—Saved,
                Applied, Interview, Offer, Rejected, or Withdrawn—and correct it anytime.
              </p>
            </div>
            <ul className={styles.vignette} aria-hidden="true">
              {APPLICATIONS.map((item) => (
                <li key={item.role} className={styles.appRow}>
                  <FileIcon className={styles.rowIcon} />
                  <span className={styles.rowText}>
                    <b>{item.role}</b>
                    <span>{item.company}</span>
                  </span>
                  <span className={styles.pill + " " + item.tone}>{item.stage}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.card}>
            <div className={styles.copy}>
              <h3 className={styles.title}>Stay on top of follow-ups.</h3>
              <p className={styles.text}>
                Add due dates, and an exact time when it matters. Tasks that need attention wait on your dashboard, in
                the time zone you saved them in. No reminder emails or notifications.
              </p>
            </div>
            <ul className={styles.vignette} aria-hidden="true">
              <li className={styles.task}>
                <span className={styles.box} />
                <span className={styles.rowText}>
                  <b>Follow up with Northwind Studio</b>
                  <span>Today · 5:00 PM</span>
                </span>
                <span className={styles.pill + " " + styles.blue}>Today</span>
              </li>
              <li className={styles.task}>
                <span className={styles.box} />
                <span className={styles.rowText}>
                  <b>Finish the take-home exercise</b>
                  <span>Fri · Tala Fintech</span>
                </span>
              </li>
              <li className={styles.task + " " + styles.done}>
                <CheckCircleIcon className={styles.doneIcon} />
                <span className={styles.rowText}>
                  <b>Send a thank-you note to Mara</b>
                  <span>Done</span>
                </span>
              </li>
            </ul>
          </article>

          <article className={styles.card}>
            <div className={styles.copy}>
              <h3 className={styles.title}>Prepare for what&apos;s ahead.</h3>
              <p className={styles.text}>
                Record interview details alongside the application: the type, the time in the interviewer&apos;s time
                zone, a meeting link, and your preparation notes.
              </p>
            </div>
            <div className={styles.vignette + " " + styles.interview} aria-hidden="true">
              <b>Technical interview · Harbor Labs</b>
              <span className={styles.times}>
                <ClockIcon />
                Tue 10:00 AM New York · 11:00 PM Manila, your time
              </span>
              <span className={styles.subtle}>60 min · Video call · with Jun Navarro</span>
              <ul className={styles.notes}>
                <li>Walk through the design-system migration</li>
                <li>Ask how the team reviews code</li>
                <li>Have the portfolio link ready</li>
              </ul>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.copy}>
              <h3 className={styles.title}>Find older records quickly.</h3>
              <p className={styles.text}>
                Search by company, role, or contact. Filter by status, work arrangement, and dates, and sort by
                what&apos;s due next.
              </p>
            </div>
            <div className={styles.vignette} aria-hidden="true">
              <span className={styles.search}>
                <SearchIcon />
                harbor
              </span>
              <span className={styles.chips}>
                <span className={styles.pill + " " + styles.violet}>Interview</span>
                <span className={styles.pill + " " + styles.slate}>Remote</span>
              </span>
              <span className={styles.result}>
                <b>Frontend Developer</b>
                <span>Harbor Labs · Remote</span>
              </span>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.copy}>
              <h3 className={styles.title}>Yours alone.</h3>
              <p className={styles.text}>
                Every record is checked against its owner on the server. Download all your data as a JSON file, or
                delete your account and its data from settings.
              </p>
            </div>
            <ul className={styles.vignette} aria-hidden="true">
              <li className={styles.setting}>
                <span>Download all your data</span>
                <span className={styles.pill + " " + styles.slate}>JSON</span>
              </li>
              <li className={styles.setting}>
                <span>Delete your account</span>
                <span className={styles.danger}>Delete</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

