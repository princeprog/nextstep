import styles from "./climb.module.css"

const STEPS = [
  { title: "Save an opportunity", text: "Add the company and role. Fill in the link, salary, or contact whenever you have them." },
  { title: "Add the next action", text: "A follow-up, a take-home deadline, or an interview—each tied to its application." },
  { title: "Return to a clear dashboard", text: "See what's overdue, what's due this week, and which interviews are coming up." },
]

/** How it works: three steps that rise like the logo's staircase. As the section scrolls, an amber dot climbs them. */
export function Climb() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 id="how-title" className="section-title">
            Three steps, then back to your <em className="accent">search</em>
          </h2>
          <p className="section-lede">Add what you know now and fill in the rest later. Each step builds on the one before.</p>
        </div>
        <div className={styles.climb}>
          <svg className={styles.track} viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 100H100V50H200V0H300" />
          </svg>
          <span className={styles.climber} aria-hidden="true" />
          <ol className={styles.stairs}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.stair}>
                <span className={styles.badge} aria-hidden="true">
                  <span className={styles.badgeFill} />
                  <span className={styles.num}>{"0" + (index + 1)}</span>
                </span>
                <h3 className={styles.stairTitle}>{step.title}</h3>
                <p className={styles.stairText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
