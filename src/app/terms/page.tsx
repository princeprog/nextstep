import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { pageMetadata } from "@/lib/metadata"
import { OPERATOR } from "@/lib/operator"

import styles from "../prose.module.css"

// Plain-language terms for the hosted app. Stays noindex until the owner approves the text.
export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description: "The rules for using NextStep: your account, your content, acceptable use, and what to expect from the service.",
  path: "/terms/",
  indexable: false,
})

export default function TermsPage() {
  const contact = (
    <a className="text-link" href={"mailto:" + OPERATOR.email}>
      {OPERATOR.email}
    </a>
  )
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className={styles.page}>
        <div className="container">
          <div className={styles.intro}>
            <span className="eyebrow">Terms</span>
            <h1 className={styles.title}>Terms of use</h1>
            <span className={styles.status}>Draft · not in effect until NextStep launches</span>
            <p className={styles.lede}>
              The rules for using NextStep, in plain language. Creating an account means you agree to them.
            </p>
            <p className={styles.updated}>
              Last updated <time dateTime="2026-11-01">1 November 2026</time>
            </p>
          </div>
          <article className={styles.article}>
            <h2>The service</h2>
            <p>
              NextStep helps you keep track of job applications, follow-up tasks, and interviews. It is run by{" "}
              {OPERATOR.name} as a small independent project and is free to use. Features may change as it develops.
            </p>

            <h2>Your account</h2>
            <ul>
              <li>Use an email address you control. If you don&apos;t confirm it within 7 days, the account is deleted.</li>
              <li>Each account is for one person. Keep your password to yourself.</li>
              <li>
                You&apos;re responsible for what happens in your account. If you think someone else has access, reset your
                password, which signs out every device.
              </li>
            </ul>

            <h2>Your content</h2>
            <p>
              What you add to NextStep stays yours. You allow NextStep to store it and show it back to you, which is the
              only thing it is used for. The{" "}
              <Link className="text-link" href="/privacy/">
                privacy policy
              </Link>{" "}
              explains how it is handled.
            </p>
            <p>
              Only add other people&apos;s details, such as a recruiter&apos;s name and email address, when you need them
              for your own job search.
            </p>

            <h2>Acceptable use</h2>
            <p>Please don&apos;t:</p>
            <ul>
              <li>try to reach other people&apos;s accounts or data, or get around the app&apos;s limits and security controls</li>
              <li>create accounts automatically or in bulk, or send automated traffic that overloads the service</li>
              <li>use NextStep for anything illegal, or to store content you don&apos;t have the right to keep</li>
              <li>enter real personal information in the demo</li>
            </ul>
            <p>
              If you find a security problem, please report it to {contact} instead of testing it on other people&apos;s
              data.
            </p>

            <h2>The demo</h2>
            <p>
              The demo is a temporary workspace with fictional data. It is deleted 24 hours after it starts, and nothing in
              it can be recovered.
            </p>

            <h2>Availability</h2>
            <p>
              NextStep is provided as it is, without a promise that it will always be available, free of errors, or suited
              to a particular purpose. Keep your own copy of anything important; you can download your data from Settings
              at any time.
            </p>
            <p>
              If NextStep is ever shut down, account holders get at least 30 days&apos; notice by email to download their
              data.
            </p>

            <h2>Ending your account</h2>
            <p>
              You can delete your account at any time from Settings. An account that breaks these terms or puts the
              service or other people at risk may be deleted. When it is safe to do so, you&apos;ll be told why and given
              time to download your data first.
            </p>

            <h2>Liability</h2>
            <p>
              As far as the law allows, the operator isn&apos;t responsible for indirect losses, such as a missed
              opportunity, that come from using NextStep or being unable to use it. Nothing in these terms takes away
              rights you have under the law that applies to you.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              When these terms change, the date at the top changes too. Account holders get an email about significant
              changes before they take effect.
            </p>

            <h2>Contact</h2>
            <p>Questions about these terms: email {contact}.</p>
          </article>
        </div>
      </main>
    </>
  )
}
