export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      <rect width="64" height="64" rx="16" fill="#17614F" />
      <path d="M15 45h12V33h12V21h9" stroke="#F6F5F0" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="21" r="5.5" fill="#E8B04A" />
    </svg>
  )
}

/** The mark and the name. textClassName lets the header hide the name on the narrowest screens. */
export function Wordmark({ textClassName }: { textClassName?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
      <Mark />
      <span className={textClassName} style={{ fontSize: "1.25rem", fontWeight: 650, letterSpacing: "-0.03em" }}>
        NextStep
      </span>
    </span>
  )
}
