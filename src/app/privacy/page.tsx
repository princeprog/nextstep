import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { pageMetadata } from "@/lib/metadata"
import { OPERATOR } from "@/lib/operator"

import styles from "../prose.module.css"

// Describes what the app actually does; check the API before changing a claim. Stays noindex until the owner approves it.
export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "What NextStep collects, why, how long it is kept, and how to download or delete your data.",
  path: "/privacy/",
  indexable: false,
})

const pending = <span className={styles.pending}>to be decided before launch</span>

export default function PrivacyPage() {
  const contact = (
    <a className="text-link" href={"mailto:" + OPERATOR.email}>
      {OPERATOR.email}
    </a>
  )
  return (
    <>
      <SiteHeader current="privacy" />
      <main id="main" tabIndex={-1} className={styles.page}>
        <div className="container">
          <div className={styles.intro}>
            <h1 className={styles.title}>Privacy policy</h1>
            <span className={styles.status}>Draft · not in effect until NextStep launches</span>
            <p className={styles.lede}>
              What NextStep collects, why, how long it keeps it, and how you can download or delete it.
            </p>
            <p className={styles.updated}>
              Last updated <time dateTime="2026-11-01">1 November 2026</time>
            </p>
          </div>
          <article className={styles.article}>
            <h2>Who runs NextStep</h2>
            <p>
              NextStep is run by {OPERATOR.name}, who decides how its data is used. For any question about this policy or
              your data, email {contact}.
            </p>

            <h2>This website</h2>
            <p>
              This site is a set of static pages. It has no forms, sets no cookies, and uses no analytics or third-party
              tracking. Fonts are served with the site, not loaded from another service.
            </p>

            <h2>What the app stores</h2>
            <ul>
              <li>
                <strong>Your account:</strong> display name, email address, time zone, when you signed up and confirmed your
                email, and a one-way Argon2id hash of your password. The password itself is never stored.
              </li>
              <li>
                <strong>Your job search:</strong> the applications (including contacts, salary details, links, and notes),
                tasks, and interviews you add.
              </li>
              <li>
                <strong>Your session:</strong> a cookie that keeps you signed in. Page scripts can&apos;t read it, it only
                travels over HTTPS, and it stops working when you sign out or after 30 minutes without activity.
              </li>
              <li>
                <strong>A display preference:</strong> a cookie that remembers whether the app&apos;s sidebar is open, kept
                for 7 days.
              </li>
              <li>
                <strong>Security counters:</strong> to slow down password guessing and other abuse, the app counts recent
                requests per network address and per email address. It stores each count under a keyed one-way hash, never
                the address itself, and deletes it within a few hours.
              </li>
            </ul>
            <p>
              Your records are visible only to your account. NextStep doesn&apos;t sell your data, show ads, or use your
              records to train AI models.
            </p>

            <h2>Emails</h2>
            <p>NextStep sends only emails about your account:</p>
            <ul>
              <li>a link to confirm your email address when you sign up</li>
              <li>a notice when someone tries to sign up with an email address that already has an account</li>
              <li>a password reset link when you ask for one</li>
              <li>a notice when your password changes</li>
              <li>a last notice when your account is deleted</li>
            </ul>
            <p>
              Confirmation links expire after 24 hours and reset links after 30 minutes, and each link works only once.
              There is no newsletter or marketing email.
            </p>

            <h2>Password safety check</h2>
            <p>
              When you choose a password, NextStep checks it against Have I Been Pwned&apos;s list of passwords exposed in
              data breaches. Only the first five characters of the password&apos;s SHA-1 hash are sent to
              api.pwnedpasswords.com, so the service can&apos;t tell which password you chose. If the service can&apos;t be
              reached, the password is accepted without the check.
            </p>

            <h2>Who else handles your data</h2>
            <ul>
              <li>
                <strong>Hosting provider</strong> {pending}: runs the app and its database, and stores backups.
              </li>
              <li>
                <strong>Email delivery provider</strong> {pending}: receives your email address and the account emails
                listed above so it can deliver them.
              </li>
              <li>
                <strong>Have I Been Pwned:</strong> receives only the five-character hash prefix described above.
              </li>
            </ul>
            <p>Nobody else receives your data unless the law requires it.</p>

            <h2>How long data is kept</h2>
            <ul>
              <li>
                <strong>Your account and job-search records:</strong> until you delete them or your account.
              </li>
              <li>
                <strong>Accounts whose email is never confirmed:</strong> deleted automatically after 7 days.
              </li>
              <li>
                <strong>Demo workspaces:</strong> deleted 24 hours after they start.
              </li>
              <li>
                <strong>Email links:</strong> removed about a day after they are used or expire.
              </li>
              <li>
                <strong>Emails waiting to be sent:</strong> removed once sent, or after six failed delivery attempts.
              </li>
              <li>
                <strong>Record of deleted accounts:</strong> only the random account ID, the date, and whether you asked
                for the deletion, kept for 35 days so a deletion can be applied again if a backup is ever restored.
              </li>
              <li>
                <strong>Backups</strong> {pending}: always kept for less time than the record of deleted accounts.
              </li>
              <li>
                <strong>Server logs</strong> {pending}: NextStep&apos;s own logs record request IDs and paths, errors, and
                the IDs of deleted accounts, but not what you send, your email address, or your network address. The
                hosting provider may log network addresses.
              </li>
            </ul>

            <h2>Your choices</h2>
            <ul>
              <li>
                <strong>Download your data:</strong> Settings gives you everything stored for your account as a JSON file.
              </li>
              <li>
                <strong>Correct it:</strong> edit your profile and records at any time.
              </li>
              <li>
                <strong>Delete it:</strong> deleting your account in Settings, after you confirm your password,
                permanently removes the account, its records, and every session. If a backup is ever restored, the
                deletion is applied again.
              </li>
              <li>
                <strong>Ask:</strong> email {contact} with any other request or question about your data. You&apos;ll get
                a reply within 30 days.
              </li>
            </ul>
            <p>
              If you aren&apos;t satisfied with the answer, you can complain to the data protection authority where you live.
              In the Philippines, that is the National Privacy Commission.
            </p>

            <h2>Security</h2>
            <p>
              The app works only over HTTPS. Passwords are hashed with Argon2id, sign-in attempts and email requests are
              rate limited, and every record is checked against its owner before it is shown or changed. No system is
              perfectly secure. If an incident affects your data, you&apos;ll get an email explaining what happened and
              what to do.
            </p>

            <h2>The demo</h2>
            <p>
              The demo creates a separate, temporary workspace filled with fictional companies and people. It isn&apos;t
              linked to an email address and is deleted 24 hours after it starts, so please don&apos;t enter real personal
              details in it.
            </p>

            <h2>Children</h2>
            <p>NextStep is built for adults managing their own job search and isn&apos;t intended for children.</p>

            <h2>Changes to this policy</h2>
            <p>
              When this policy changes, the date at the top changes too. If a change affects how your data is used,
              account holders get an email before it takes effect. The{" "}
              <Link className="text-link" href="/terms/">
                terms of use
              </Link>{" "}
              cover the rules for using NextStep.
            </p>
          </article>

          <section className={styles.later} aria-labelledby="open-decisions">
            <h2 id="open-decisions">To be decided before launch</h2>
            <p>These parts of the policy depend on choices that haven&apos;t been made yet:</p>
            <ul>
              <li>Hosting provider, and the country where data is stored</li>
              <li>Email delivery provider</li>
              <li>How long backups are kept</li>
              <li>How long server logs are kept</li>
              <li>Whether an error monitoring service is used, and which</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}
