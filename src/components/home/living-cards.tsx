import { ArrowRightIcon, CalendarIcon, CheckIcon, ClockIcon, LockIcon, SearchIcon, StagesIcon } from "../icons"

import styles from "./living-cards.module.css"

/**
 * What you can do: five feature tiles. With a mouse, each one acts out its feature on hover (an application moves to
 * Interview, a task gets completed, an interview card turns over to its prep notes, a search filters the list), using
 * transitions so a quick pass in and out reverses smoothly. Touch screens and reduced motion get a still picture.
 */
export function LivingCards() {
  return (
    <section className="section" aria-labelledby="stories-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What you can do</span>
          <h2 id="stories-title" className="section-title">
            Small steps, kept in <em className="accent">order</em>
          </h2>
          <p className="section-lede">
            Applications, follow-ups, and interviews live side by side, so the next action is never far away.
          </p>
          <span className={styles.hint} aria-hidden="true">
            <span className={styles.hintDot} />
            Hover a card to see it work
          </span>
        </div>

        <div className={styles.bento}>
          <article className={styles.card + " " + styles.wide + " " + styles.pipelineCard}>
            <div className={styles.copy}>
              <span className={styles.kicker}>
                <StagesIcon />
                Applications
              </span>
              <h3 className={styles.title}>Keep every opportunity in one place.</h3>
              <p className={styles.text}>
                Save the role, company, status, and useful notes. Move an application through six stages—Saved,
                Applied, Interview, Offer, Rejected, or Withdrawn—and correct it anytime.
              </p>
            </div>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.kanban}>
                <span className={styles.lane + " " + styles.c1} />
                <span className={styles.lane + " " + styles.laneTarget + " " + styles.c2} />
                <span className={styles.lane + " " + styles.c3} />
                <span className={styles.colHead + " " + styles.c1}>
                  Applied
                  <span className={styles.swap}>
                    <i className={styles.before}>5</i>
                    <i className={styles.after}>4</i>
                  </span>
                </span>
                <span className={styles.colHead + " " + styles.c2}>
                  Interview
                  <span className={styles.swap}>
                    <i className={styles.before}>1</i>
                    <i className={styles.after}>2</i>
                  </span>
                </span>
                <span className={styles.colHead + " " + styles.c3}>
                  Offer
                  <span className={styles.swap}>
                    <i>1</i>
                  </span>
                </span>
                <span className={styles.mini + " " + styles.c1 + " " + styles.r2}>
                  Northwind Studio
                  <small>Product Designer</small>
                </span>
                <span className={styles.mini + " " + styles.c2 + " " + styles.r2}>
                  Tala Fintech
                  <small>Junior Backend Engineer</small>
                </span>
                <span className={styles.mini + " " + styles.c3 + " " + styles.r2}>
                  Lumen Analytics
                  <small>Data Analyst</small>
                </span>
                <span className={styles.slot + " " + styles.c2 + " " + styles.r3} />
                <span className={styles.mini + " " + styles.mover + " " + styles.c1 + " " + styles.r3}>
                  Harbor Labs
                  <small>Frontend Developer</small>
                </span>
              </div>
            </div>
          </article>

          <article className={styles.card + " " + styles.tasksCard}>
            <div className={styles.copy}>
              <span className={styles.kicker}>
                <ClockIcon />
                Follow-ups
              </span>
              <h3 className={styles.title}>Stay on top of follow-ups.</h3>
              <p className={styles.text}>
                Add due dates, and an exact time when it matters. Tasks that need attention wait on your dashboard, in
                the time zone you saved them in. No reminder emails or notifications.
              </p>
            </div>
            <div className={styles.visual + " " + styles.taskList} aria-hidden="true">
              <span className={styles.task}>
                <span className={styles.box}>
                  <span className={styles.check}>
                    <CheckIcon />
                  </span>
                </span>
                <span className={styles.taskText}>
                  <b>
                    <span className={styles.strikeWrap}>
                      Send a thank-you note to Mara
                      <span className={styles.strike} />
                    </span>
                  </b>
                  <small>Today · 5:00 PM</small>
                </span>
              </span>
              <span className={styles.task}>
                <span className={styles.box} />
                <span className={styles.taskText}>
                  <b>Follow up with Northwind Studio</b>
                  <small>Thu</small>
                </span>
              </span>
              <span className={styles.task}>
                <span className={styles.box} />
                <span className={styles.taskText}>
                  <b>Finish the take-home exercise</b>
                  <small>Fri</small>
                </span>
              </span>
              <span className={styles.toast}>
                <span className={styles.toastIcon}>
                  <CheckIcon />
                </span>
                Task completed
              </span>
            </div>
          </article>

          <article className={styles.card + " " + styles.interviewCard}>
            <div className={styles.copy}>
              <span className={styles.kicker}>
                <CalendarIcon />
                Interviews
              </span>
              <h3 className={styles.title}>Prepare for what&apos;s ahead.</h3>
              <p className={styles.text}>
                Record interview details alongside the application: the type, the time in the interviewer&apos;s time
                zone, a meeting link, and your preparation notes.
              </p>
            </div>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.flip}>
                <div className={styles.flipInner}>
                  <div className={styles.face}>
                    <span className={styles.faceHead}>
                      Technical interview
                      <span>Tue, Nov 10</span>
                    </span>
                    <span className={styles.times}>
                      <span className={styles.time}>
                        <strong>10:00 AM</strong>
                        <small>New York</small>
                      </span>
                      <ArrowRightIcon className={styles.timeArrow} />
                      <span className={styles.time + " " + styles.timeYou}>
                        <strong>11:00 PM</strong>
                        <small>Manila, your time</small>
                      </span>
                    </span>
                    <span className={styles.faceMeta}>60 min · Video call · with Jun Navarro</span>
                  </div>
                  <div className={styles.face + " " + styles.back}>
                    <span className={styles.faceHead}>
                      Prep notes
                      <span>Harbor Labs</span>
                    </span>
                    <span className={styles.note}>Walk through the design-system migration</span>
                    <span className={styles.note}>Ask how the team reviews code</span>
                    <span className={styles.note}>Have the portfolio link ready</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={styles.card + " " + styles.searchCard}>
            <div className={styles.copy}>
              <span className={styles.kicker}>
                <SearchIcon />
                Search and filters
              </span>
              <h3 className={styles.title}>Find older records quickly.</h3>
              <p className={styles.text}>
                Search by company, role, or contact. Filter by status, work arrangement, and dates, and sort by
                what&apos;s due next.
              </p>
            </div>
            <div className={styles.visual + " " + styles.search} aria-hidden="true">
              <span className={styles.searchBox}>
                <SearchIcon />
                <span className={styles.field}>
                  <span className={styles.placeholder}>Search company, role, or contact</span>
                  <span className={styles.query}>harbor</span>
                  <span className={styles.caret} />
                </span>
              </span>
              <span className={styles.result + " " + styles.match}>
                <span className={styles.mono}>H</span>
                <span>
                  <span>
                    <mark>Harbor</mark> Labs
                  </span>
                  <small>Frontend Developer · Remote</small>
                </span>
              </span>
              <span className={styles.result + " " + styles.other}>
                <span className={styles.mono}>N</span>
                <span>
                  Northwind Studio
                  <small>Product Designer · Hybrid</small>
                </span>
              </span>
              <span className={styles.result + " " + styles.other}>
                <span className={styles.mono}>T</span>
                <span>
                  Tala Fintech
                  <small>Junior Backend Engineer · On-site</small>
                </span>
              </span>
            </div>
          </article>

          <article className={styles.card + " " + styles.privacyCard}>
            <div className={styles.copy}>
              <span className={styles.kicker}>
                <LockIcon />
                Privacy
              </span>
              <h3 className={styles.title}>Yours alone.</h3>
              <p className={styles.text}>
                Every record is checked against its owner on the server. Download all your data as a JSON file, or
                delete your account and its data from settings.
              </p>
            </div>
            <div className={styles.visual + " " + styles.vault} aria-hidden="true">
              <span className={styles.lock}>
                <LockIcon />
                <span className={styles.ring} />
              </span>
              <span className={styles.vaultRow}>
                <CheckIcon />
                Checked against your account
              </span>
              <span className={styles.vaultRow}>
                <CheckIcon />
                Download everything as JSON
              </span>
              <span className={styles.vaultRow}>
                <CheckIcon />
                Delete your account anytime
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
