export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill="#1A6455" />
      <path d="M15 45h12V33h12V21h9" stroke="#F7F6F0" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="21" r="5.5" fill="#DFAF50" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
      <Mark />
      <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
        NextStep
      </span>
    </span>
  )
}

