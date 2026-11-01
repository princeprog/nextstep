---
name: NextStep
description: "The public website for NextStep, a personal job-search workspace: navy ink on a cool white canvas, one action blue, and the app's own dashboard as the proof."
colors:
  primary: "#176ff0"
  blue-strong: "#0f5bd0"
  blue-ink: "#1252c9"
  blue-soft: "#e8f0fe"
  blue-line: "rgb(23 111 240 / 0.3)"
  mark-light: "#5a9bff"
  mark-mid: "#2f80f6"
  red: "#c41d2b"
  red-soft: "#fde7ea"
  violet: "#5b30c4"
  violet-soft: "#f0eafd"
  green: "#187a45"
  green-soft: "#e7f6ee"
  slate-soft: "#f1f4f8"
  callout-red: "#fde4e8"
  callout-red-ink: "#b3121f"
  callout-blue: "#e3eefe"
  callout-violet: "#ede7fd"
  callout-violet-ink: "#4f26b8"
  canvas: "#fefefe"
  surface: "#ffffff"
  on-primary: "#ffffff"
  surface-2: "#f9fafb"
  ink: "#0a1128"
  ink-2: "#4a5672"
  ink-3: "#5d6984"
  line: "rgb(15 23 42 / 0.08)"
  card-line: "rgb(15 23 42 / 0.09)"
  line-strong: "rgb(15 23 42 / 0.15)"
  haze: "rgb(196 218 252 / 0.85)"
  window-rim: "rgb(237 243 253 / 0.62)"
  night: "#0a1128"
  on-night: "#f4f6fb"
  night-accent: "#9cc1ff"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "3.4rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  hero-lede:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "24.2px"
    fontWeight: 400
    lineHeight: 1.45
  lede:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.2
  label:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.6
  meta:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.35
    fontFeature: '"tnum"'
rounded:
  note: "8px"
  control: "10px"
  row: "12px"
  card: "16px"
  window: "18px"
  pill: "999px"
spacing:
  stack: "0.75rem"
  grid: "1.25rem"
  card: "1.75rem"
  gutter: "2.5rem"
  section-head: "4rem"
  section: "8.5rem"
  content: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.blue-strong}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  button-hero:
    rounded: "{rounded.control}"
    padding: "0 27px"
    height: "59px"
  button-header:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.row}"
    padding: "0 21px"
    height: "42px"
  button-secondary-on-night:
    textColor: "{colors.on-night}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  tag-red:
    backgroundColor: "{colors.red-soft}"
    textColor: "{colors.red}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  tag-violet:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  tag-blue:
    backgroundColor: "{colors.blue-soft}"
    textColor: "{colors.blue-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  tag-green:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  tag-slate:
    backgroundColor: "{colors.slate-soft}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  list-row:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.row}"
    padding: "0.85rem 1rem"
  faq-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "14px"
    padding: "1.1rem 1.25rem"
  app-window:
    backgroundColor: "{colors.window-rim}"
    rounded: "{rounded.window}"
    padding: "12px"
  callout-red:
    backgroundColor: "{colors.callout-red}"
    textColor: "{colors.callout-red-ink}"
    rounded: "{rounded.control}"
    padding: "0 15px"
    height: "50px"
  callout-blue:
    backgroundColor: "{colors.callout-blue}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "46px"
  callout-violet:
    backgroundColor: "{colors.callout-violet}"
    textColor: "{colors.callout-violet-ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "68px"
  step-numeral:
    backgroundColor: "{colors.blue-soft}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.row}"
    size: "2.75rem"
  step-numeral-last:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  night-panel:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    rounded: "24px"
    padding: "6rem 4rem"
  availability-note:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.row}"
    padding: "0.9rem 1.1rem"
  site-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-2}"
    height: "73px"
  site-footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
  footer-note:
    textColor: "{colors.ink-3}"
    typography: "{typography.body-sm}"
  architecture-layer:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "1rem 1.25rem"
  architecture-layer-first:
    backgroundColor: "{colors.blue-soft}"
---

# Design System: NextStep

## Overview

**Creative North Star: "The Annotated Dashboard"**

NextStep's website is the category-standard product page, played straight and finished to the bar that Linear, Raycast, and Vercel set. A centered promise sits over a faithful, fictional picture of the app's own dashboard, and the only commentary is a set of hand-drawn callouts pointing at the rows that prove the mechanism: overdue comes first, today's task is the next step, and an interview keeps its own time zone. The product makes the case; the page frames it and stays out of the way.

The world is cool and quiet: a near-white canvas under a faint azure haze, navy ink, slate text, and one confident blue for every action. Color beyond that blue is status, borrowed from the app with the meaning the app gives it, so the sections below the hero speak the same visual language as the dashboard picture. Density splits by layer. The page is spacious, with centered section heads and a generous vertical rhythm; the product pictures inside it (the app window, the card vignettes, the sorted list) are as dense and specific as the real app.

The direction refuses the split hero beside a tilted screenshot with a badge row, and any costume world. One humane, highly legible face carries everything, surfaces are white and defined by hairlines, and the app window is the only object that lifts off the page.

**Key Characteristics:**
- One face, Atkinson Hyperlegible, at 400 and 700, for headings, text, and controls.
- Navy ink, slate text, and a single action blue; red, violet, green, blue, and slate washes are status, shared with the app.
- White surfaces at 10–16px corners, defined by 1px navy hairlines instead of shadows.
- The app window is the one lifted object: a frosted azure rim over a soft haze.
- Hand-drawn callout arrows, shipped as raster plates, are the only illustration.
- The first viewport is measured in pixels of the approved comp and keeps its proportions at every desktop width.
- One authored load moment; everything else is small, interruptible state feedback, and every element rests finished.

## Colors

A cool, near-white page with navy ink and one confident blue; every other hue is a status the app already uses.

### Primary
- **Action Blue** (#176ff0): the only solid accent fill. Primary buttons, the header's demo button, the focus ring, the caret and form accents, check icons, the first item in a ranked list, and the last of the three steps. White text on it measures 4.6:1.
- **Pressed Blue** (#0f5bd0): the hover fill of primary buttons, for fine pointers only.
- **Blue Ink** (#1252c9): blue as text. The accent word in a heading, text links, blue tags, and step numerals; 6.0:1 on Blue Wash.
- **Blue Wash** (#e8f0fe): the blue tint behind tags, step numerals, and the first architecture layer; at 55% over white it marks the first row of a sorted list.
- **Blue Line** (rgb(23 111 240 / 0.3)): the edge of a selected or leading item: the "With NextStep" card, an open FAQ item, the first row and layer, and step numerals. The build varies its alpha between 25% and 35%.
- **Mark Light** (#5a9bff) and **Mark Mid** (#2f80f6): the lower two blocks of the staircase mark, under a top block of Action Blue. They appear only in the mark.

### Status
- **Overdue Red** (#c41d2b) on **Red Wash** (#fde7ea): overdue and most urgent deadlines, and destructive actions set as text, such as "Delete" (5.0:1).
- **Interview Violet** (#5b30c4) on **Violet Wash** (#f0eafd): interviews and the time-zone story (6.7:1).
- **Offer Green** (#187a45) on **Green Wash** (#e7f6ee): offers and finished tasks (4.8:1).
- **Slate Wash** (#f1f4f8) with Slate text: neutral states such as Saved, Withdrawn, later days, and unranked numerals (6.6:1).
- **Callout Red** (#fde4e8) with **Callout Red Ink** (#b3121f), **Callout Blue** (#e3eefe) with Blue Ink, and **Callout Violet** (#ede7fd) with **Callout Violet Ink** (#4f26b8): the annotation tints, one step deeper than the washes so callouts read above the white app (5.8:1 to 7.6:1). Callout Blue also fills the "Your next step" badge.

### Neutral
- **Cool White Canvas** (#fefefe): the page and the browser's theme color.
- **Surface White** (#ffffff): cards, rows, buttons, and the footer band. **On Primary** (#ffffff) is the same white, as text on Action Blue.
- **Mist** (#f9fafb): recessed fills such as the architecture layers.
- **Navy Ink** (#0a1128): headings and primary text. As **Night** (#0a1128) it fills the closing panel.
- **Slate** (#4a5672): ledes, card copy, and nav and footer links (7.3:1 on the canvas).
- **Muted Slate** (#5d6984): meta lines, captions, the footer note, and idle icons. At 5.5:1 on white it is the lightest text color in the system.
- **Hairline** (rgb(15 23 42 / 0.08)), **Card Hairline** (rgb(15 23 42 / 0.09)), and **Strong Hairline** (rgb(15 23 42 / 0.15)): dividers and table rules; card and row edges; the header rule, secondary buttons, and the availability note.
- **Azure Haze** (rgb(196 218 252 / 0.85)) and **Window Rim** (rgb(237 243 253 / 0.62)): the soft glows behind the app window, and its frosted rim.
- **On Night** (#f4f6fb) and **Night Accent** (#9cc1ff): text on the closing panel, and its accent word and focus ring (10.2:1 on Night).

The stylesheet still maps earlier token names (`--evergreen`, `--mint`, `--amber`, and their variants) onto the blue family. They are not green or amber; new work uses the names above.

### Named Rules
**The One Blue Rule.** There is one accent family. Action Blue fills, Blue Ink writes, and Blue Wash tints; no other accent hue exists outside the status set.

**The Shared Status Rule.** A status color means what it means in the app: red is overdue or most urgent, violet is interviews and time zones, green is offers and finished work, blue is due next or upcoming, and slate is neutral or later. A status always appears as a wash with its own ink; only Action Blue fills solid behind text.

## Typography

**Display Font:** Atkinson Hyperlegible, 700 (with Segoe UI, system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible, 400 (same fallbacks)

**Character:** One humanist face built for legibility carries the whole site. Its open, distinct letterforms and slashed zero keep dates and times unambiguous, which is the product's story, and weight and size do all of the hierarchy work.

### Hierarchy
- **Display** (700, 72 comp px, line-height 1.12, -0.035em): the hero promise only, on one line. It renders about 65px at a 1440px viewport and stops growing at 87px; below 1024px it becomes clamp(2.35rem, 8vw, 3.9rem) and wraps.
- **Headline** (700, fluid from 2.1rem to 3.4rem, 1.05, -0.035em): section titles, centered above their lede. The closing panel's title runs to 3.6rem and the architecture panel's tops out at 2.75rem.
- **Title** (700, 1.25rem, 1.1, -0.02em): card and step titles. List titles inside cards drop to 1.125rem at -0.015em.
- **Hero Lede** (400, 24.2 comp px, 1.45, Slate): the single line under the display; below 1024px it is fluid from 1.0625rem to 1.25rem and wraps.
- **Lede** (400, 1.1875rem, 1.55, Slate, at most 38rem wide): under section titles.
- **Body** (400, 1.0625rem, 1.6): running text. Card copy sets at 1rem.
- **Body Small** (400, 0.9375rem, 1.6): the footer, the availability note, and nav links at their floor.
- **Button** (700, 1.0625rem, 1.2): button labels. The header's demo button is the one regular-weight label.
- **Label** (700, 0.8125rem; 0.75rem in vignette pills): tags, pills, and badges, in sentence case.
- **Meta** (400, 0.8125rem to 0.875rem, 1.35 to 1.4, Muted Slate, tabular numerals): companies, dates, and times under a row's title.

### Named Rules
**The One Face Rule.** Atkinson Hyperlegible at 400 and 700 is the only face and the only pair of weights. Hierarchy comes from size, weight, and ink, never from a second family or an in-between weight.

**The Accent Word Rule.** A heading may set one word in Blue Ink, in the same upright face with no underline: "know" in "Good to know", "next" in "Make space for the next opportunity", "today" in "What NextStep does today". On the night panel that word turns Night Accent.

**The Sentence Case Rule.** Labels, tags, and buttons are bold sentence case. Nothing is uppercase, and no text is tracked wider than normal.

## Layout

The page sits in a centered column up to 1200px wide with fluid gutters (1.25rem on phones, growing to 2.5rem). Sections below the hero share one rhythm: a top pad that grows from 5rem to 8.5rem, a centered head (title and lede, at most 46rem wide), and content set 2.5rem to 4rem below it. Grids gap at 1.25rem, cards pad at 1.75rem (1.25rem to 1.35rem on phones), and stacked items sit 0.75rem apart.

The first viewport is built to the approved comp (1586 × 992) in comp pixels. One comp pixel is 1/1586 of the viewport width, capped at a 1920px viewport, so the header bar (1273 comp px wide, 73 tall), the 72 comp px headline, the 59 comp px buttons, and the app window (1379 comp px, 87% of the width, running past the fold) keep the comp's proportions at every desktop width. Header text keeps rem floors so it never shrinks past legibility.

Each section's composition follows what it shows: before and after lists beside a sorted list (1 : 1.15), a six-column bento where one wide card spans four columns, three steps on a single line, a copy and diagram panel (1.1 : 0.9), and a FAQ whose intro stays sticky beside the questions (0.8 : 1.2).

Below 1024px the hero trades comp pixels for rem and clamp(), the window becomes one readable column (the sidebar, search, avatar, chevrons, and recent table drop away), and the callouts become notes on their rows. Two-column sections stack at 860px. The bento goes to two columns at 1023px and one at 700px. The header drops How it works and FAQ at 760px and every link at 420px, keeping the wordmark and the demo button. Everything stays readable at 320px, and anchors land 5.5rem below the sticky header.

### Named Rules
**The Comp Unit Rule.** The first viewport is measured, not approximated. Size its parts in comp pixels with rem floors for text, and use rem and clamp() below 1024px and everywhere under the hero.

## Elevation & Depth

The system is flat by default and defined by hairlines. Cards, rows, FAQ items, and panels carry a 1px navy hairline and no shadow, and selection shows as Blue Line or a Blue Wash fill rather than a lift. Depth comes from light: two soft azure glows sit behind the app window, and a pool of blue light falls from the top of the night panel. Shadows appear in three places only: the app window, the callouts that float over its edge, and the buttons.

### Shadow Vocabulary
- **Window lift** (`box-shadow: 0 1px 2px rgb(15 23 42 / 0.04), 0 24px 60px -24px rgb(23 61 140 / 0.26), 0 60px 120px -48px rgb(15 23 42 / 0.2)`): the app window only. Its long, blue-tinged falloff seats the window in the haze.
- **Callout lift** (`box-shadow: 0 1px 2px rgb(15 23 42 / 0.06), 0 10px 24px -12px rgb(15 23 42 / 0.22)`): annotation callouts and their phone row notes.
- **Primary glow** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(15 23 42 / 0.16), 0 10px 24px -12px rgb(23 111 240 / 0.75)`): primary buttons. The header's button drops it.
- **Hairline lift** (`box-shadow: 0 1px 2px rgb(15 23 42 / 0.06)`): secondary buttons.
- **Next-step pulse** (`box-shadow: 0 0 0 2px rgb(23 111 240 / 0.6), 0 10px 28px -12px rgb(23 111 240 / 0.55)`, in comp pixels): rings today's row once on load, then rests invisible.

### Named Rules
**The One Lifted Object Rule.** Only the app window casts a wide shadow. Cards declare elevation once, with their hairline, and never lift on hover.

## Shapes

Every surface is a gently rounded rectangle, and corners tighten as surfaces nest: the night panel at 24px, the app window's rim at 18 comp px, cards at 16px, FAQ items at 14px, rows and layers at 12px, controls and inner rows at 10px, and small notes at 8px. Pills (999px) are reserved for small tags and badges; circles hold avatars, row icons, and rank numerals. Edges are 1px hairlines, and a dashed hairline marks what is absent or informal, such as the "Not included yet" panel and plain-text notes.

The staircase mark sets the geometry: three blocks (2.5 corner radius on a 64-unit grid) climbing to the upper right in Mark Light, Mark Mid, and Action Blue, the top block the next step. The pipeline icon draws the same staircase as a single line. Icons are drawn for the site on a 24px grid with a 1.75 stroke, round caps and joins, in the current text color, and stay hidden from assistive technology.

### Named Rules
**The Only Illustration Rule.** The hand-drawn callout arrows are the only illustration, and they ship as raster plates with their provenance embedded. Everything else is the product drawn faithfully, a line icon, or plain geometry.

## Components

### Buttons
Confident and compact, and quick to answer a press.
- **Shape:** gently rounded (10px), at least 48px tall, padded 0.75rem by 1.4rem, with a bold 1.0625rem label and an optional trailing arrow 0.55rem away.
- **Primary:** Action Blue with a white label and the primary glow. On hover with a fine pointer it deepens to Pressed Blue and the arrow nudges 3px right.
- **Secondary:** Surface White with a Navy Ink label, a Strong Hairline edge, and the hairline lift; hover darkens the edge to 32%.
- **Press and focus:** every button scales to 0.97 on press (160ms ease-out), and focus draws a 3px Action Blue ring 3px out. Reduced motion keeps the color changes and drops the movement.
- **Hero size:** 59 comp px tall with 27 comp px of padding and an 18.5 comp px label; below 1024px it returns to the standard size.
- **Header button:** 42 comp px tall at 12 comp px corners, in regular weight, without the glow.
- **On night:** the secondary button turns translucent (a 6% On Night fill, a 28% On Night edge, and an On Night label), and the focus ring turns Night Accent.

### Chips
- **Style:** pill-shaped tags in a status wash with its own ink, bold 0.8125rem (0.75rem for the smaller pills in vignettes), padded 0.2rem by 0.6rem.
- **State:** chips are labels, never controls, so they have no hover or selected state.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Surface White on the Cool White Canvas.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** a 1px Card Hairline. The recommended card of a pair takes Blue Line, and feature cards deepen their edge to 16% on hover.
- **Internal Padding:** 1.75rem (1.6rem by 1.75rem for list cards), 1.25rem to 1.35rem on phones.
- **Rows inside cards** are pictures of the app: white rows at 10px to 12px with a 7% to 9% hairline, a Muted Slate meta line, and a status tag at the end. The first or most urgent row takes a 55% Blue Wash and Blue Line, with its rank numeral filled in Action Blue.

### Navigation
- **Header:** sticky on the canvas, 73 comp px tall (at least 4rem), in three columns: the wordmark at left, Features, How it works, and FAQ centered, and the demo button at right. Links are regular 17 comp px Slate (at least 0.9375rem); hover turns them Navy Ink, and the current page is Navy Ink and bold. A Strong Hairline under the header fades in over the first 96px of scroll where scroll timelines exist, and otherwise rests visible.
- **Footer:** a white band under a Hairline, with the wordmark, a Muted Slate note at most 34rem wide, and bold 0.9375rem Slate links that turn Navy Ink on hover.

### FAQ Disclosure
Native disclosure rows that open with a click, Enter, or Space, and work without JavaScript. Each is white at 14px with a Card Hairline; the question is bold body text in a 1.1rem by 1.25rem pad, and a Muted Slate plus turns 45° into a cross and goes blue when the row opens, as its edge takes Blue Line.

### The Annotated App Window
The signature component, and the first viewport's proof.
- **Frame:** a frosted rim (Window Rim fill, 18 comp px corners, 12 to 13 comp px of padding, a faint 7% edge that holds the fill against the haze, and the window lift) around the app itself: white, at 12 comp px corners, with a 229 comp px sidebar in a pale mist.
- **Content:** a faithful, fictional dashboard with the app's real stage names, menus, and copy, and fictional companies and people. It is hidden from assistive technology and described by a visually hidden caption.
- **Callouts:** bold sentence-case chips in the callout tints (10 comp px corners and the callout lift) set just outside the window's edge, each with a hand-drawn arrow plate in its own hue drawn toward its row.
- **Phones:** below 1024px each callout becomes a note on the top edge of its row (8px corners, 0.75rem bold) with a short arrow plate, and the stage tiles go three across, then two across at 440px.
- **Motion:** the page's one authored moment. The copy rises 14px into place (640ms ease-out, staggered 80ms), the window lands from 32 comp px lower at 98.5% scale (900ms), the callouts slide 12 comp px in from their side (520ms), each arrow draws toward its row with clip-path (560ms), and one blue ring pulses on today's row (1.8s) and fades. Reduced motion gets a 200ms fade, and every element rests finished.

### Night Panel
The closing call to action: a Night panel at 24px corners, padded up to 6rem by 4rem, with a centered On Night headline (one accent word in Night Accent), a pool of azure light from the top edge, and the page's two buttons. When the app and demo addresses are not configured, an availability note replaces the buttons: a white box with a Strong Hairline at 12px, Body Small Slate text, and a bold Navy Ink lead-in.

### Steps and Architecture Stack
- **Steps:** three numbered steps on one hairline that brightens to blue in the middle. Numerals sit in 2.75rem squares at 12px in Blue Wash with Blue Line, and the last fills Action Blue with a white numeral. Titles and text are centered, the text at most 19rem wide.
- **Architecture stack:** four layers from top to bottom (12px, Mist with a 10% edge, the first in Blue Wash with Blue Line), joined by 1px connectors, with each layer's name bold at left and its technology in Muted Slate at right.

## Do's and Don'ts

### Do:
- **Do** keep Atkinson Hyperlegible at 400 and 700 as the only face and weights.
- **Do** size the first viewport in comp pixels (calc(N * var(--u))) with rem floors for text, and use rem and clamp() below 1024px and under the hero.
- **Do** give anything with a state its shared status pair, a wash with its own ink, in the meaning the app uses.
- **Do** let faithful, fictional pictures of the app carry the proof, with the app's real stage names and menus and fictional companies and people.
- **Do** define cards with a 1px Card Hairline at 16px on Surface White, and keep the wide shadow for the app window.
- **Do** track display and headline type at -0.035em; nothing in the system tracks tighter.
- **Do** theme the browser's own surfaces from the palette: a 20% Action Blue selection, a blue caret and accent color, a 28% navy scrollbar thumb, the 3px blue focus ring, and tabular numerals for times and dates.
- **Do** animate only transform, opacity, and clip-path from a finished resting state, keep interface feedback under 300ms, and put hover effects behind a fine-pointer query.
- **Do** ship hand-drawn arrows as raster plates in assets/plates with their provenance embedded.

### Don't:
- **Don't** build a split hero beside a tilted screenshot with a badge row, or dress the page in a costume world.
- **Don't** put a kicker or eyebrow label above a heading; the heading speaks alone.
- **Don't** set labels in uppercase or track small text open.
- **Don't** add a second accent hue, gradient text, or gradient fills on controls and cards; the only gradients are light (the azure haze and the night panel's pool) and the hairline that joins the steps.
- **Don't** put a wide soft shadow under a hairline card, or lift a card on hover.
- **Don't** lead a card with an icon tile above its heading; the title leads, and the picture inside the card proves it.
- **Don't** use Unicode glyphs or emoji as icons; use the drawn 24px line set.
- **Don't** swap the arrow plates for inline vector strokes or an arrow icon.
- **Don't** fill a status color solid behind text; only Action Blue fills solid.
- **Don't** let text rest at partial opacity or depend on an entrance animation to appear.
