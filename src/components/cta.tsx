import Link from "next/link"

import { siteConfig } from "@/site-config"

import styles from "./cta.module.css"

/**
 * Calls to action only link to configured, working URLs. Without them, the site says plainly that the app isn't
 * hosted yet instead of showing a broken or pretend button.
 */
export function Cta({ secondaryFeatures = true }: { secondaryFeatures?: boolean }) {
  const { appUrl, demoUrl } = siteConfig
  if (!appUrl && !demoUrl) {
    return (
      <div className={styles.group}>
        <p className={styles.note}>
          <strong>Not publicly hosted yet.</strong> NextStep is in active development as a portfolio project. Links to
          create a workspace or try the demo will appear here once the app is online.
        </p>
        {secondaryFeatures ? (
          <Link href="/features/" className="button button-secondary">
            See what it does
          </Link>
        ) : null}
      </div>
    )
  }
  return (
    <div className={styles.group}>
      {appUrl ? (
        <a href={appUrl} className="button button-primary">
          Create your workspace
        </a>
      ) : null}
      {demoUrl ? (
        <a href={demoUrl} className={"button " + (appUrl ? "button-secondary" : "button-primary")}>
          Try the demo
        </a>
      ) : null}
    </div>
  )
}

