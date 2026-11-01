import styles from "./product-preview.module.css"
import { Mark } from "./wordmark"

const APPLICATIONS = [
  { company: "Harbor Labs", role: "Frontend Developer", status: "Interview" },
  { company: "Northwind Studio", role: "Product Designer", status: "Applied" },
  { company: "Tala Fintech", role: "Junior Backend Engineer", status: "Applied" },
  { company: "Lumen Analytics", role: "Data Analyst", status: "Saved" },
] as const

const CHIP = { Saved: styles.saved, Applied: styles.applied, Interview: styles.interview }

/**
 * A hand-built illustration of the workspace; all names are fictional and it is not a screenshot of real data. On
 * load it plays one short explanation (see the CSS), then rests on its final state.
 */
export function ProductPreview() {
  return (
    <figure className={styles.figure} aria-labelledby="preview-caption">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.window}>
          <div className={styles.toolbar}>
            <Mark size={20} />
            <span className={styles.toolbarTitle}>Applications</span>
            <span className={styles.toolbarCount}>11 active</span>
          </div>
          <div className={styles.stages}>
            <div className={styles.stage}>
              <span className={styles.stageName}>Saved</span>
              <span className={styles.count}>3</span>
            </div>
            <div className={styles.stage}>
              <span className={styles.stageName}>Applied</span>
              <span className={styles.count}>
                <span className={styles.from}>6</span>
                <span className={styles.to}>5</span>
              </span>
            </div>
            <div className={styles.stage + " " + styles.stageCurrent}>
              <span className={styles.stageName}>Interview</span>
              <span className={styles.count}>
                <span className={styles.from}>1</span>
                <span className={styles.to}>2</span>
              </span>
            </div>
            <div className={styles.stage}>
              <span className={styles.stageName}>Offer</span>
              <span className={styles.count}>1</span>
            </div>
          </div>
          <div className={styles.rows}>
            {APPLICATIONS.map((application, index) => (
              <div key={application.company} className={styles.row + (index === 0 ? " " + styles.rowMoved : "")}>
                <span className={styles.monogram}>{application.company[0]}</span>
                <span className={styles.rowText}>
                  <span className={styles.company}>{application.company}</span>
                  <span className={styles.role}>{application.role}</span>
                </span>
                {index === 0 ? (
                  <span className={styles.swap}>
                    <span className={styles.chip + " " + styles.applied + " " + styles.from}>Applied</span>
                    <span className={styles.chip + " " + styles.interview + " " + styles.to}>Interview</span>
                  </span>
                ) : (
                  <span className={styles.chip + " " + CHIP[application.status]}>{application.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.interviewCard}>
          <div className={styles.cardLabel}>Interview · Tue, Nov 10</div>
          <div className={styles.zones}>
            <div className={styles.zone}>
              <span className={styles.zoneDot} />
              <span className={styles.zonePlace}>New York</span>
              <span className={styles.zoneTime}>10:00 AM</span>
            </div>
            <div className={styles.zone + " " + styles.zoneYou}>
              <span className={styles.zoneDot} />
              <span className={styles.zonePlace}>
                Manila <small>· you</small>
              </span>
              <span className={styles.zoneTime}>11:00 PM</span>
            </div>
          </div>
        </div>

        <div className={styles.nextCard}>
          <div className={styles.nextLabel}>
            <span className={styles.dot} />
            Your next step
          </div>
          <div className={styles.nextTitle}>Send a thank-you note to Mara</div>
          <div className={styles.nextMeta}>
            <span className={styles.due}>Due today · 5:00 PM</span>
            <span>Asia/Manila</span>
          </div>
          <div className={styles.nextFoot}>
            <span className={styles.complete}>
              <span className={styles.box} />
              Mark complete
            </span>
            <span className={styles.forRole}>Harbor Labs</span>
          </div>
        </div>
      </div>
      <figcaption id="preview-caption" className={styles.caption}>
        Illustration with fictional data: applications by stage, an interview shown in both time zones, and the
        follow-up due next.
      </figcaption>
    </figure>
  )
}
