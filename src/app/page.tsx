import type { Metadata, Viewport } from "next"

import { Cta } from "@/components/cta"
import { CtaBand } from "@/components/cta-band"
import { Climb } from "@/components/home/climb"
import { Faq } from "@/components/home/faq"
import { HeroDashboard } from "@/components/home/hero-dashboard"
import { LivingCards } from "@/components/home/living-cards"
import { SortStory } from "@/components/home/sort-story"
import { UnderTheHood } from "@/components/home/under-the-hood"
import { CheckIcon } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { accentFont } from "@/lib/accent-font"
import { pageMetadata } from "@/lib/metadata"

import styles from "./home.module.css"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "NextStep — Organize your job search",
    description: "Track job applications, follow-ups, and interviews in a clear workspace that helps you focus on your next step.",
    path: "/",
  }),
  title: { absolute: "NextStep — Organize your job search" },
}

// The home page opens on a dark hero, so the browser's own color matches it.
export const viewport: Viewport = {
  themeColor: "#0a1f1a",
}

/** Position in the hero's staggered entrance (the global .reveal class). */
const order = (i: number) => ({ "--i": i }) as React.CSSProperties

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className={accentFont.variable}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <svg
            className={styles.heroStairs}
            viewBox="0 0 1200 640"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M-40 600H160V480H360V360H560V240H760V120H980" />
            <path d="M420 700H620V580H820V460H1020V340H1240" />
          </svg>
          <div className={"container on-night " + styles.heroCopy}>
            <span className={styles.badge + " reveal"} style={order(0)}>
              A calm job-search workspace
            </span>
            <h1 id="hero-title" className={styles.title + " reveal"} style={order(1)}>
              Keep your job search{" "}
              <span className={styles.moving}>
                <em className="accent">moving.</em>
                <svg className={styles.stairLine} viewBox="0 0 120 16" fill="none" aria-hidden="true" focusable="false">
                  <path d="M2 14h34V9h34V4h38" />
                  <circle cx="111" cy="4" r="3.4" />
                </svg>
              </span>
            </h1>
            <p className={styles.lede + " reveal"} style={order(2)}>
              Bring applications, follow-ups, and interviews together, so you always know what to do next.
            </p>
            <div className="reveal" style={order(3)}>
              <Cta />
            </div>
            <ul className={styles.facts + " reveal"} style={order(4)}>
              <li>
                <CheckIcon className={styles.factIcon} />
                Six-stage pipeline
              </li>
              <li>
                <CheckIcon className={styles.factIcon} />
                Time-zone-aware follow-ups
              </li>
              <li>
                <CheckIcon className={styles.factIcon} />
                Private by default
              </li>
            </ul>
          </div>
          <HeroDashboard />
        </section>

        <SortStory />
        <LivingCards />
        <Climb />
        <UnderTheHood />
        <Faq />

        <CtaBand
          id="closing-title"
          title={
            <>
              Make space for the <em className="accent">next</em> opportunity.
            </>
          }
        />
      </main>
    </>
  )
}
