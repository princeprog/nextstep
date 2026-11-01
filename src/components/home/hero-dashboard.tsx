import { CalendarIcon, CheckIcon, ClockIcon, DashboardIcon, PlusIcon, RecordIcon, SlidersIcon } from "../icons"
import { Mark } from "../wordmark"

import styles from "./hero-dashboard.module.css"

const STAGES = [
  ["Saved", "3"],
  ["Applied", "5"],
  ["Interview", "2"],
  ["Offer", "1"],
] as const

/**
 * The hero's product scene: a hand-built, fictional slice of the NextStep dashboard, not a screenshot. Scrolling drives
 * a short explanation (see the CSS); the resting state is the finished one.
 */
export function HeroDashboard() {
  return (
    <figure className={styles.figure} aria-labelledby="dashboard-caption">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.tilt}>
          <div className={styles.window}>
            <div className={styles.chrome}>
              <span className={styles.lights}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.chromeTitle}>NextStep · Dashboard</span>
            </div>
            <div className={styles.app}>
              <div className={styles.sidebar}>
                <span className={styles.sideBrand}>
                  <Mark size={22} />
                  NextStep
                </span>
                <span className={styles.navItem + " " + styles.navCurrent}>
                  <DashboardIcon />
                  Dashboard
                </span>
                <span className={styles.navItem}>
                  <RecordIcon />
                  Applications
                </span>
                <span className={styles.navItem}>
                  <ClockIcon />
                  Tasks
                </span>
                <span className={styles.navItem}>
                  <CalendarIcon />
                  Interviews
                </span>
                <span className={styles.navItem}>
                  <SlidersIcon />
                  Settings
                </span>
              </div>
              <div className={styles.main}>
                <div className={styles.mainHead}>
                  <span>
                    <span className={styles.heading}>What needs attention</span>
                    <span className={styles.sub}>Welcome back. Here&apos;s what&apos;s next.</span>
                  </span>
                  <span className={styles.actions}>
                    <span className={styles.btnPrimary}>
                      <PlusIcon />
                      Add application
                    </span>
                    <span className={styles.btnGhost}>
                      <PlusIcon />
                      Add task
                    </span>
                  </span>
                </div>
                <div className={styles.pipeline}>
                  {STAGES.map(([name, count]) => (
                    <span key={name} className={styles.stageChip + (name === "Interview" ? " " + styles.stageCurrent : "")}>
                      {name}
                      <b>{count}</b>
                    </span>
                  ))}
                  <span className={styles.callout + " " + styles.calloutStages}>Every stage at a glance</span>
                </div>
                <div className={styles.cards}>
                  <div className={styles.card + " " + styles.cardOverdue}>
                    <span className={styles.cardHead}>
                      Overdue <span className={styles.count}>1</span>
                    </span>
                    <span className={styles.task}>
                      <span className={styles.box} />
                      <span className={styles.taskText}>
                        <b>Reply to the recruiter at Cedar &amp; Pine</b>
                        <small>Yesterday</small>
                      </span>
                      <span className={styles.chip + " " + styles.chipOverdue}>Overdue</span>
                    </span>
                    <span className={styles.callout + " " + styles.calloutOverdue}>Overdue comes first</span>
                  </div>
                  <div className={styles.card + " " + styles.cardUpcoming}>
                    <span className={styles.cardHead}>
                      Upcoming tasks
                      <span className={styles.count + " " + styles.swap}>
                        <i className={styles.from}>3</i>
                        <i className={styles.to}>2</i>
                      </span>
                    </span>
                    <span className={styles.task + " " + styles.storyTask}>
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
                        <small>Today · 5:00 PM · Harbor Labs</small>
                      </span>
                      <span className={styles.swap + " " + styles.chipSwap}>
                        <span className={styles.chip + " " + styles.chipToday + " " + styles.from}>Due today</span>
                        <span className={styles.chip + " " + styles.chipDone + " " + styles.to}>Done</span>
                      </span>
                      <span className={styles.callout + " " + styles.calloutNext}>Your next step</span>
                      <svg className={styles.cursor} viewBox="0 0 24 24" focusable="false">
                        <path d="M5 3.5v15.2l4.1-3.9 2.7 6 2.6-1.1-2.7-5.9h5.8z" />
                      </svg>
                    </span>
                    <span className={styles.task}>
                      <span className={styles.box} />
                      <span className={styles.taskText}>
                        <b>Prepare a portfolio walkthrough</b>
                        <small>Tue · 6:00 PM · Harbor Labs</small>
                      </span>
                      <span className={styles.chip + " " + styles.chipUpcoming}>Upcoming</span>
                    </span>
                    <span className={styles.task}>
                      <span className={styles.box} />
                      <span className={styles.taskText}>
                        <b>Finish the take-home exercise</b>
                        <small>Fri · Tala Fintech</small>
                      </span>
                      <span className={styles.chip + " " + styles.chipUpcoming}>Upcoming</span>
                    </span>
                  </div>
                  <div className={styles.card + " " + styles.cardInterviews}>
                    <span className={styles.cardHead}>
                      Interviews <span className={styles.count}>1</span>
                    </span>
                    <span className={styles.interview}>
                      <span className={styles.date}>
                        <small>Nov</small>
                        <b>10</b>
                      </span>
                      <span className={styles.taskText}>
                        <b>Technical interview</b>
                        <small>Harbor Labs · with Jun Navarro</small>
                        <span className={styles.times}>
                          <span>10:00 AM New York</span>
                          <span className={styles.timeYou}>11:00 PM Manila, your time</span>
                        </span>
                      </span>
                    </span>
                    <span className={styles.callout + " " + styles.calloutZone}>Shown in your time zone</span>
                  </div>
                </div>
              </div>
            </div>
            <span className={styles.toast}>
              <span className={styles.toastIcon}>
                <CheckIcon />
              </span>
              Task completed
            </span>
          </div>
        </div>
      </div>
      <figcaption id="dashboard-caption" className={styles.caption}>
        Illustration of the NextStep dashboard with fictional data: an overdue task first, upcoming tasks, an interview
        in two time zones, and the next step marked done.
      </figcaption>
    </figure>
  )
}
