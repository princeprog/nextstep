import type { Metadata, Viewport } from "next"
import { Atkinson_Hyperlegible } from "next/font/google"

// Global base styles load before any component's CSS Module, so component classes can override them (for example
// the compact header button over .button).
import "./globals.css"

import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/site-config"

// One face for headings, text, and controls: Atkinson Hyperlegible, the headline face measured from the approved comp.
const sans = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sans", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadataBase),
  title: { default: "NextStep — Organize your job search", template: "%s · NextStep" },
  description: "Track job applications, follow-ups, and interviews in a clear workspace that helps you focus on your next step.",
  applicationName: "NextStep",
  robots: siteConfig.indexable ? { index: true, follow: true } : { index: false, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#fefefe",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
