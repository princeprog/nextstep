import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { pageMetadata } from "@/lib/metadata"

import styles from "../prose.module.css"

// A draft disclosure for the portfolio project. Kept out of search results and the sitemap until reviewed.
export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How the NextStep website and app handle data during portfolio development, and which policies are still undecided.",
  path: "/privacy/",
  indexable: false,
})

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader current="privacy" />
      <main id="main" tabIndex={-1} className={styles.page}>
        <div className="container">
          <div className={styles.intro}>
            <span className="eyebrow">Privacy</span>
            <h1 className={styles.title}>Privacy</h1>
            <span className={styles.status}>Draft for a portfolio project · not yet reviewed</span>
            <p className={styles.lede}>
              This page describes how NextStep handles data as it is built today. It is not a final privacy policy for a
              hosted service.
            </p>
          </div>
          <article className={styles.article}>
            <h2>This website</h2>
            <p>
              This site is a set of static pages. It has no forms, sets no cookies, and uses no analytics or third-party
              tracking. Fonts are served with the site, not loaded from another service.
            </p>

            <h2>The NextStep app</h2>
            <p>If you use the app, it stores what you enter so it can show it back to you:</p>
            <ul>
              <li>Your account: display name, email address, a one-way password hash (never the password itself), and your time zone.</li>
              <li>Your job search: applications, notes, contacts, tasks, and interviews you add.</li>
              <li>A session cookie that keeps you signed in. It is HttpOnly, so page scripts can&apos;t read it.</li>
            </ul>
            <p>
              Your records are visible only to your account. You can delete your account in settings, which permanently
              removes your applications, tasks, interviews, and sessions.
            </p>

            <h2>The demo</h2>
            <p>
              The demo creates a separate, temporary workspace filled with fictional companies and people. It isn&apos;t linked
              to an email address and is removed 24 hours after it starts.
            </p>

            <h2>Still undecided</h2>
            <p>The following have not been decided, so no promises are made about them yet:</p>
            <ul>
              <li>Where the app will be hosted, and by whom</li>
              <li>How long backups are kept, and how deletion applies to them</li>
              <li>Account recovery and email verification</li>
              <li>How long server logs are kept</li>
            </ul>
            <p>
              Until those are settled, please don&apos;t use NextStep for a real job search with sensitive details. Learn more
              about the product on the <Link className="text-link" href="/features/">features page</Link>.
            </p>
          </article>
        </div>
      </main>
    </>
  )
}

