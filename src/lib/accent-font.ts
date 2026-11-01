import { Instrument_Serif } from "next/font/google"

/**
 * The serif italic for a word of emphasis in a heading (the global .accent class). Only the pages that use it import
 * this file and add accentFont.variable to their main element, so other pages don't preload the font.
 */
export const accentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
})
