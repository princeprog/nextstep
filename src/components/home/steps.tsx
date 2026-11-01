import styles from "./steps.module.css"

const STEPS = [
  { title: "Save an opportunity", text: "Add the company and role. Fill in the link, salary, or contact whenever you have them." },
  { title: "Add the next action", text: "A follow-up, a take-home deadline, or an interview, each tied to its application." },
  { title: "Return to a clear dashboard", text: "See what's overdue, what's due this week, and which interviews are coming up." },
]

/** How it works: three numbered steps on one line. */
export function Steps() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <h2 id="how-title" className="section-title">
            Three steps, then back to your search
          </h2>
          <p className="section-lede">Add what you know now and fill in the rest later. Each step builds on the one before.</p>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

