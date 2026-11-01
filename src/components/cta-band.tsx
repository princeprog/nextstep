import type { ReactNode } from "react"

import styles from "./cta-band.module.css"
import { Cta } from "./cta"

/** The closing call to action: a navy panel with the page's two actions. */
export function CtaBand({ id, title, secondaryFeatures }: { id: string; title: ReactNode; secondaryFeatures?: boolean }) {
  return (
    <section className={styles.band} aria-labelledby={id}>
      <div className="container">
        <div className={"on-night " + styles.panel}>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          <Cta secondaryFeatures={secondaryFeatures} />
        </div>
      </div>
    </section>
  )
}

