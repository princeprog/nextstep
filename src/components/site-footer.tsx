import Link from "next/link"

import styles from "./site.module.css"
import { Wordmark } from "./wordmark"

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={"container " + styles.footerInner}>
        <div>
          <Wordmark />
          <p className={styles.footerNote}>
            NextStep is a portfolio project for organizing a job search. It isn&apos;t offered as a hosted service for real
            job searches yet. Product examples on this site use fictional companies and people.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/features/">Features</Link></li>
            <li><Link href="/privacy/">Privacy</Link></li>
            <li><Link href="/terms/">Terms</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

