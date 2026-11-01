import Link from "next/link"

import { PlusIcon } from "../icons"

import styles from "./faq.module.css"

const QUESTIONS = [
  {
    question: "Can I try NextStep without an account?",
    answer: (
      <>
        Yes. The demo gives you your own workspace filled with fictional companies, tasks, and interviews. Anything you
        change stays in your demo, and the demo is removed 24 hours after you start it.
      </>
    ),
  },
  {
    question: "Does NextStep send reminders?",
    answer: (
      <>
        No. Tasks that need attention wait on your dashboard whenever you open the app. NextStep only emails you about
        your account, such as confirming your address or resetting your password.
      </>
    ),
  },
  {
    question: "How does it handle time zones?",
    answer: (
      <>
        Each task keeps the time zone it was created in, so a 5:00 PM follow-up stays 5:00 PM where you set it.
        Interview times are entered in the interviewer&apos;s time zone and shown alongside yours.
      </>
    ),
  },
  {
    question: "Can I take my data with me?",
    answer: (
      <>
        Yes. Download everything as a JSON file from settings: your profile and every application, task, and interview,
        including archived ones. You can also delete your account and its data permanently.
      </>
    ),
  },
  {
    question: "Can it import jobs from job boards?",
    answer: (
      <>
        Not today. You add the company and role yourself and fill in the rest when you have it. Importing jobs,
        reminders, and calendar sync aren&apos;t available.
      </>
    ),
  },
  {
    question: "Can I use NextStep now?",
    answer: (
      <>
        Not as a public service yet. It&apos;s a portfolio project in active development, and its{" "}
        <Link className="text-link" href="/privacy/">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link className="text-link" href="/terms/">
          terms
        </Link>{" "}
        are drafts until it launches.
      </>
    ),
  },
]

/** Questions, as native details elements: they open with a click, Enter, or Space, and work without JavaScript. */
export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={"container " + styles.layout}>
        <div className={styles.intro}>
          <h2 id="faq-title" className="section-title">
            Good to <em className="accent">know</em>
          </h2>
          <p className="section-lede">Short answers about what NextStep does, and what it doesn&apos;t do yet.</p>
        </div>
        <div className={styles.list}>
          {QUESTIONS.map(({ question, answer }) => (
            <details key={question} className={styles.item}>
              <summary className={styles.question}>
                {question}
                <PlusIcon className={styles.icon} />
              </summary>
              <p className={styles.answer}>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
