import type { Metadata, Viewport } from "next"

import { CtaBand } from "@/components/cta-band"
import { Faq } from "@/components/home/faq"
import { FeatureGrid } from "@/components/home/feature-grid"
import { Hero } from "@/components/home/hero"
import { Steps } from "@/components/home/steps"
import { UnderTheHood } from "@/components/home/under-the-hood"
import { Why } from "@/components/home/why"
import { SiteHeader } from "@/components/site-header"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "NextStep — Organize your job search",
    description: "Track job applications, follow-ups, and interviews in a clear workspace that helps you focus on your next step.",
    path: "/",
  }),
  title: { absolute: "NextStep — Organize your job search" },
}

export const viewport: Viewport = {
  themeColor: "#fefefe",
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Why />
        <FeatureGrid />
        <Steps />
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
