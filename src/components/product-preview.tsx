import styles from "./product-preview.module.css"

const ROWS = [
  { company: "Harbor Labs", role: "Frontend Developer", status: "Interview", active: true },
  { company: "Northwind Studio", role: "Product Designer", status: "Applied", active: false },
  { company: "Lumen Analytics", role: "Data Analyst", status: "Saved", active: false },
]

/** A hand-built illustration of the workspace. All names are fictional; it is not a screenshot of real data. */
export function ProductPreview() {
  return (
    <figure className={styles.figure} aria-labelledby="preview-caption">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.card + " " + styles.list}>
          <div className={styles.cardTitle}>
            <span>Applications</span>
            <span>3 active</span>
          </div>
          {ROWS.map((row) => (
            <div key={row.company} className={styles.row}>
              <div>
                <div className={styles.company}>{row.company}</div>
                <div className={styles.role}>{row.role}</div>
              </div>
              <span className={styles.chip + (row.active ? " " + styles.chipActive : "")}>{row.status}</span>
            </div>
          ))}
        </div>
        <div className={styles.annotation}>
          <span className={styles.tag}>Your next step</span>
          <svg className={styles.arrow} viewBox="0 0 88 48" fill="none">
            <path d="M4 40 C 30 44, 58 36, 80 12 M 80 12 L 70 14 M 80 12 L 78 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.card + " " + styles.next}>
          <div className={styles.nextLabel}>Due today</div>
          <div className={styles.nextTitle}>Send a thank-you note to Mara</div>
          <div className={styles.nextMeta}>
            <span className={styles.due}>5:00 PM</span>
            <span>Asia/Manila</span>
            <span>Harbor Labs</span>
          </div>
          <div className={styles.check}>
            <span className={styles.box} />
            Mark complete
          </div>
        </div>
      </div>
      <figcaption id="preview-caption" className={styles.caption}>
        Illustration of the NextStep workspace with fictional data: three applications and a follow-up due today.
      </figcaption>
    </figure>
  )
}

