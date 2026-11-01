import type { ReactNode } from "react"

import styles from "./cta-band.module.css"
import { Cta } from "./cta"

/** The closing call to action: a dark evergreen panel with the logo's staircase drawn large behind the heading. */
export function CtaBand({ id, title, secondaryFeatures }: { id: string; title: ReactNode; secondaryFeatures?: boolean }) {
  return (
    <section className={styles.band} aria-labelledby={id}>
      <div className="container">
        <div className={"on-night " + styles.panel}>
          <svg className={styles.motif} viewBox="0 0 420 300" fill="none" aria-hidden="true" focusable="false">
            <path d="M0 290h110v-90h110v-90h110V20h50" stroke="currentColor" strokeWidth="2" />
            <circle cx="380" cy="20" r="9" fill="#E8B04A" />
          </svg>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          <Cta secondaryFeatures={secondaryFeatures} />
        </div>
      </div>
    </section>
  )
}
