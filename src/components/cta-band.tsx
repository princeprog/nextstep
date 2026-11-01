import type { ReactNode } from "react"

import styles from "./cta-band.module.css"
import { Cta } from "./cta"

/**
 * The closing call to action: a dark evergreen panel. As it scrolls into view, the logo's staircase draws itself behind
 * the heading and the amber dot lands at the top.
 */
export function CtaBand({ id, title, secondaryFeatures }: { id: string; title: ReactNode; secondaryFeatures?: boolean }) {
  return (
    <section className={styles.band} aria-labelledby={id}>
      <div className="container">
        <div className={"on-night " + styles.panel}>
          <div className={styles.motif} aria-hidden="true">
            <svg className={styles.motifLine} viewBox="0 0 420 300" fill="none" focusable="false">
              <path d="M0 290h110v-90h110v-90h110V20h50" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className={styles.motifDot} />
          </div>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          <Cta secondaryFeatures={secondaryFeatures} />
        </div>
      </div>
    </section>
  )
}
