import Link from "next/link"

import { siteConfig } from "@/site-config"

import styles from "./site.module.css"
import { Wordmark } from "./wordmark"

export function SiteHeader({ current }: { current?: "features" | "privacy" }) {
  return (
    <header className={styles.header}>
      <div className={"container " + styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="NextStep home">
          <Wordmark textClassName={styles.brandText} />
        </Link>
        <nav aria-label="Primary" className={styles.nav}>
          <Link href="/features/" className={styles.navLink} aria-current={current === "features" ? "page" : undefined}>
            Features
          </Link>
          <Link href="/#how-it-works" className={styles.navLink + " " + styles.optional}>
            How it works
          </Link>
          {siteConfig.demoUrl ? (
            <a href={siteConfig.demoUrl} className={"button button-primary " + styles.navCta}>
              Try the demo
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  )
}

