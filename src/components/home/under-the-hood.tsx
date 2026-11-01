import { CheckCircleIcon } from "@/components/icons"

import styles from "./under-the-hood.module.css"

const LAYERS = [
  { name: "Website", detail: "Static export" },
  { name: "Web app", detail: "Next.js · React 19" },
  { name: "API", detail: "Spring Boot · Java 25" },
  { name: "Database", detail: "PostgreSQL" },
]

const POINTS = [
  "Passwords hashed with Argon2id and checked against known breaches",
  "Every record checked against its owner on the server",
  "Secure, HttpOnly session cookies and a strict content security policy",
  "Keyboard friendly, and checked against WCAG 2.2 AA by automated tests",
]

/** Under the hood: the real architecture, top to bottom, beside the security and accessibility facts. */
export function UnderTheHood() {
  return (
    <section className="section" aria-labelledby="hood-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.copy}>
            <h2 id="hood-title" className={styles.title}>
              Built with the care of a real product
            </h2>
            <p className={styles.lede}>
              NextStep is a portfolio project built end to end: a Spring Boot API, a Next.js app, and this static
              website, each checked by automated tests on every change.
            </p>
            <ul className={styles.points}>
              {POINTS.map((point) => (
                <li key={point}>
                  <CheckCircleIcon className={styles.check} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <ol className={styles.stack} aria-label="Architecture, from the browser down">
            {LAYERS.map((layer) => (
              <li key={layer.name} className={styles.layer}>
                <b>{layer.name}</b>
                <span>{layer.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

