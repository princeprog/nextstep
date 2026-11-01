import styles from "./under-the-hood.module.css"

const LAYERS = [
  { name: "Database", detail: "PostgreSQL", tone: styles.l1 },
  { name: "API", detail: "Spring Boot · Java 25", tone: styles.l2 },
  { name: "Web app", detail: "Next.js · React 19", tone: styles.l3 },
  { name: "Website", detail: "Static export", tone: styles.l4 },
]

/** Under the hood: the real architecture as an isometric stack that spreads apart as it scrolls into view. */
export function UnderTheHood() {
  return (
    <section className="section" aria-labelledby="hood-title">
      <div className="container">
        <div className={"on-night " + styles.panel}>
          <div className={styles.copy}>
            <span className="eyebrow">Under the hood</span>
            <h2 id="hood-title" className={styles.title}>
              Built with the care of a <em className="accent">real</em> product
            </h2>
            <p className={styles.lede}>
              NextStep is a portfolio project built end to end: a Spring Boot API, a Next.js app, and this static
              website, each checked by automated tests on every change.
            </p>
            <ul className={styles.points}>
              <li>Passwords hashed with Argon2id and checked against known breaches</li>
              <li>Every record checked against its owner on the server</li>
              <li>Secure, HttpOnly session cookies and a strict content security policy</li>
              <li>Keyboard friendly, and checked against WCAG 2.2 AA by automated tests</li>
            </ul>
          </div>
          <div className={styles.scene} aria-hidden="true">
            <div className={styles.plane}>
              {LAYERS.map((layer, index) => (
                <span key={layer.name} className={styles.layer + " " + layer.tone} style={{ "--z": index } as React.CSSProperties}>
                  <b>{layer.name}</b>
                  <small>{layer.detail}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
