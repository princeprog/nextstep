/** The staircase mark: three blocks climbing diagonally to the upper right, the top one the next step. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      <rect x="4" y="38" width="24" height="20" rx="2.5" fill="#5A9BFF" />
      <rect x="20" y="22" width="24" height="20" rx="2.5" fill="#2F80F6" />
      <rect x="36" y="6" width="24" height="20" rx="2.5" fill="#176FF0" />
    </svg>
  )
}

/** The mark and the name. textClassName lets the header size the name and hide it on the narrowest screens. */
export function Wordmark({ textClassName, size }: { textClassName?: string; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
      <Mark size={size} />
      <span className={textClassName} style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
        NextStep
      </span>
    </span>
  )
}

