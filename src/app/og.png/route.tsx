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
          background: "#0A1128",
          backgroundImage: "linear-gradient(150deg, #0A1128 0%, #0E1C44 60%, #176FF0 150%)",
          color: "#F4F6FB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <rect x="4" y="38" width="24" height="20" rx="2.5" fill="#5A9BFF" />
            <rect x="20" y="22" width="24" height="20" rx="2.5" fill="#2F80F6" />
            <rect x="36" y="6" width="24" height="20" rx="2.5" fill="#176FF0" />
          </svg>
          NextStep
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: -4, maxWidth: 980 }}>
            Keep your job search moving.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, color: "#AAB4CA" }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#176FF0" }} />
            Applications, follow-ups, and interviews in one clear workspace.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
