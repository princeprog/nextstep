import type { Metadata, Viewport } from "next"
import { Fraunces, Manrope } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/site-config"

import "./globals.css"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
})

const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadataBase),
  title: { default: "NextStep — Organize your job search", template: "%s · NextStep" },
  description: "Track job applications, follow-ups, and interviews in a clear workspace that helps you focus on your next step.",
  applicationName: "NextStep",
  robots: siteConfig.indexable ? { index: true, follow: true } : { index: false, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#f7f6f0",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
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

