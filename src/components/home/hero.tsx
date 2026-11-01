import Image from "next/image"

import { Cta } from "@/components/cta"
import {
  AlertCircleIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CalendarClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  DashboardIcon,
  FileIcon,
  ListChecksIcon,
  LogOutIcon,
  MinusCircleIcon,
  SearchIcon,
  SettingsIcon,
  TrophyIcon,
  UsersIcon,
  XCircleIcon,
} from "@/components/icons"
import { Mark } from "@/components/wordmark"

import overdueArrow from "../../../assets/plates/callout-overdue-arrow.png"
import nextArrow from "../../../assets/plates/callout-next-arrow.png"
import zoneArrow from "../../../assets/plates/callout-zone-arrow.png"
import mobileArrowBlue from "../../../assets/plates/mobile-arrow-blue.png"
import mobileArrowRed from "../../../assets/plates/mobile-arrow-red.png"
import mobileArrowViolet from "../../../assets/plates/mobile-arrow-violet.png"
import styles from "./hero.module.css"

/** Position in the hero's staggered entrance (the global .reveal class). */
const order = (i: number) => ({ "--i": i }) as React.CSSProperties

const STAGES = [
  { name: "Saved", count: 4, icon: BookmarkIcon, tone: styles.slate },
  { name: "Applied", count: 6, icon: FileIcon, tone: styles.blue },
  { name: "Interview", count: 2, icon: UsersIcon, tone: styles.violet },
  { name: "Offer", count: 1, icon: TrophyIcon, tone: styles.green },
  { name: "Rejected", count: 3, icon: XCircleIcon, tone: styles.red },
  { name: "Withdrawn", count: 1, icon: MinusCircleIcon, tone: styles.slate },
]

const RECENT = [
  ["Harbor Labs", "Frontend Developer", "Interview", "Today", "Prepare a portfolio walkthrough"],
  ["Kestrel Studio", "Junior Product Designer", "Applied", "Yesterday", "Send thank-you note"],
  ["Bayside Health", "Data Analyst", "Saved", "3 days ago", "Apply by Friday"],
]

/** The first viewport, built to the approved comp: a centered headline over the dashboard, annotated. */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <span className={styles.glowLeft} aria-hidden="true" />
      <span className={styles.glowRight} aria-hidden="true" />
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title + " reveal"} style={order(0)}>
          Keep your job search moving.
        </h1>
        <p className={styles.lede + " reveal"} style={order(1)}>
          Bring applications, follow-ups, and interviews together, so you always know what to do next.
        </p>
        <div className={styles.ctas + " reveal"} style={order(2)}>
          <Cta />
        </div>
      </div>
      <div className={styles.stage}>
        <ul className={styles.callouts} aria-label="What the dashboard shows">
          <li className={styles.callout + " " + styles.calloutOverdue}>Overdue comes first</li>
          <li className={styles.callout + " " + styles.calloutNext}>Your next step</li>
          <li className={styles.callout + " " + styles.calloutZone}>
            <span>Shown in its</span> <span>own time zone</span>
          </li>
        </ul>
        <AppWindow />
        <Image className={styles.arrow + " " + styles.arrowOverdue} src={overdueArrow} alt="" />
        <Image className={styles.arrow + " " + styles.arrowNext} src={nextArrow} alt="" />
        <Image className={styles.arrow + " " + styles.arrowZone} src={zoneArrow} alt="" />
      </div>
    </section>
  )
}

/** A faithful, fictional picture of the app's dashboard. It is decorative; the caption describes it. */
function AppWindow() {
  return (
    <figure className={styles.figure}>
      <figcaption className="visually-hidden">
        An illustration of the NextStep dashboard with fictional data: an overdue thank-you note, today&apos;s next
        step, a technical interview shown in Asia/Manila time, and applications counted by stage.
      </figcaption>
      <div className={styles.window} aria-hidden="true">
        <div className={styles.panel}>
        <div className={styles.sidebar}>
          <span className={styles.appLogo}>
            <Mark size={30} />
            NextStep
          </span>
          <ul className={styles.appNav}>
            <li className={styles.navActive}>
              <DashboardIcon />
              Dashboard
            </li>
            <li className={styles.navAfterActive}>
              <BriefcaseIcon />
              Applications
            </li>
            <li>
              <ListChecksIcon />
              Tasks
            </li>
            <li>
              <CalendarClockIcon />
              Interviews
            </li>
            <li className={styles.navFoot}>
              <SettingsIcon />
              Settings
            </li>
            <li>
              <LogOutIcon />
              Sign out
            </li>
          </ul>
        </div>
        <div className={styles.main}>
          <div className={styles.topbar}>
            <div>
              <p className={styles.greeting}>Good morning, Alex</p>
              <p className={styles.subline}>Here&apos;s what needs your attention.</p>
            </div>
            <span className={styles.search}>
              <SearchIcon />
              Search applications
            </span>
            <span className={styles.avatar}>AL</span>
          </div>

          <div className={styles.card + " " + styles.attention}>
            <p className={styles.cardTitle}>What needs attention</p>
            <ul className={styles.rows}>
              <li className={styles.row}>
                <span className={styles.rowNote + " " + styles.noteRed}>
                  Overdue comes first
                  <Image className={styles.noteArrow} src={mobileArrowRed} alt="" />
                </span>
                <span className={styles.rowIcon + " " + styles.red}>
                  <AlertCircleIcon />
                </span>
                <span className={styles.rowLabel + " " + styles.redText}>Overdue</span>
                <span className={styles.rowMain}>
                  <b>Send thank-you note</b>
                  <span>Kestrel Studio</span>
                </span>
                <span className={styles.rowMeta + " " + styles.metaEnd}>
                  <span className={styles.redText + " " + styles.strong}>Due yesterday</span>
                </span>
                <ChevronRightIcon className={styles.chevron} />
              </li>
              <li className={styles.row + " " + styles.today}>
                <span className={styles.rowNote + " " + styles.noteBlue}>
                  Your next step
                  <Image className={styles.noteArrow} src={mobileArrowBlue} alt="" />
                </span>
                <span className={styles.rowIcon + " " + styles.blue}>
                  <CheckCircleIcon />
                </span>
                <span className={styles.rowLabel + " " + styles.blueText}>Due today</span>
                <span className={styles.rowMain}>
                  <b>Prepare a portfolio walkthrough</b>
                  <span>Harbor Labs</span>
                </span>
                <span className={styles.rowMeta + " " + styles.metaEnd}>
                  <span className={styles.badge}>Your next step</span>
                  <span>Due today</span>
                </span>
                <ChevronRightIcon className={styles.chevron} />
              </li>
              <li className={styles.row}>
                <span className={styles.rowNote + " " + styles.noteViolet}>
                  Shown in its own time zone
                  <Image className={styles.noteArrow} src={mobileArrowViolet} alt="" />
                </span>
                <span className={styles.rowIcon + " " + styles.violet}>
                  <CalendarIcon />
                </span>
                <span className={styles.rowLabel + " " + styles.violetText}>Upcoming interview</span>
                <span className={styles.rowMain}>
                  <b>Technical interview</b>
                  <span>Harbor Labs</span>
                </span>
                <span className={styles.rowMeta}>
                  <span className={styles.time}>Thu, 10:00</span>
                  <span>Asia/Manila</span>
                </span>
                <ChevronRightIcon className={styles.chevron} />
              </li>
            </ul>
          </div>

          <div className={styles.card + " " + styles.stages}>
            <p className={styles.cardTitle}>Applications by stage</p>
            <ul className={styles.tiles}>
              {STAGES.map(({ name, count, icon: Icon, tone }) => (
                <li key={name} className={styles.tile + " " + tone}>
                  <Icon className={styles.tileIcon} />
                  <span className={styles.tileText}>
                    <span>{name}</span>
                    <b>{count}</b>
                  </span>
                  <ChevronRightIcon className={styles.tileChevron} />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card + " " + styles.recent}>
            <div className={styles.recentHead}>
              <p className={styles.cardTitle}>Recent applications</p>
              <span className={styles.viewAll}>
                View all
                <ChevronRightIcon />
              </span>
            </div>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Company</span>
                <span>Role</span>
                <span>Stage</span>
                <span>Last activity</span>
                <span>Next step</span>
              </div>
              {RECENT.map((cells) => (
                <div key={cells[0]} className={styles.tableRow}>
                  {cells.map((cell, index) => (
                    <span key={index}>{cell}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </figure>
  )
}

