import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"

import styles from "./prose.module.css"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className={styles.page}>
        <div className={"container " + styles.notFound}>
          <span className="eyebrow">404</span>
          <h1 className={styles.title}>This page took a different path.</h1>
          <p className={styles.lede}>The link may be out of date, or the page may have moved.</p>
          <div className={styles.links}>
            <Link href="/" className="button button-primary">Go to the home page</Link>
            <Link href="/features/" className="button button-secondary">See features</Link>
          </div>
        </div>
      </main>
    </>
  )
}

