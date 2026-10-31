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
          background: "#F7F6F0",
          color: "#14342C",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#1A6455", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#DFAF50" }} />
          </div>
          NextStep
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>Keep your job search moving.</div>
          <div style={{ width: 160, height: 10, borderRadius: 999, background: "#DFAF50" }} />
          <div style={{ fontSize: 34, color: "#435D56", maxWidth: 900 }}>
            Applications, follow-ups, and interviews in one clear workspace.
          </div>
        </div>
      </div>
    ),
    size,
  )
}


