import { ImageResponse } from "next/og"

export const dynamic = "force-static"

const size = { width: 1200, height: 630 }

/** Exported at build time as out/og.png, so any static host serves it with an image content type. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0A1F1A",
          backgroundImage: "linear-gradient(150deg, #0A1F1A 0%, #0D2A23 55%, #17614F 140%)",
          color: "#F3F1EA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#17614F" />
            <path d="M15 45h12V33h12V21h9" stroke="#F6F5F0" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="48" cy="21" r="5.5" fill="#E8B04A" />
          </svg>
          NextStep
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: -4, maxWidth: 980 }}>
            Keep your job search moving.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, color: "#A7BBB3" }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#E8B04A" }} />
            Applications, follow-ups, and interviews in one clear workspace.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
