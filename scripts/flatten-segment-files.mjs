// Moves route prefetch files in a static export to the flat names the Next.js client router requests.
//
// Next.js 16.4 builds each segment file name from path.relative(), so on Windows a nested segment such as
// features/__PAGE__ is written to out/features/__next.features/__PAGE__.txt instead of
// out/features/__next.features.__PAGE__.txt. Every prefetch of that route then gets a 404 and logs a console error.
// On macOS and Linux the export is already flat and this script changes nothing. Remove it once Next.js normalizes
// the separator (collectSegmentPathsImpl in packages/next/src/export/index.ts; still unfixed in 16.5 canary).
//
// Usage: node scripts/flatten-segment-files.mjs [out]   (runs as part of pnpm build)
import { existsSync, readdirSync, renameSync, rmSync } from "node:fs"
import { join, relative, resolve, sep } from "node:path"

const outDir = resolve(process.argv[2] ?? "out")
if (!existsSync(outDir)) {
  console.error("No static export found at " + outDir + ".")
  process.exit(1)
}

function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? filesUnder(join(dir, entry.name)) : [join(dir, entry.name)],
  )
}

function flatten(dir) {
  let moved = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const path = join(dir, entry.name)
    if (!entry.name.startsWith("__next.")) {
      moved += flatten(path)
      continue
    }
    for (const file of filesUnder(path)) {
      renameSync(file, join(dir, entry.name + "." + relative(path, file).split(sep).join(".")))
      moved++
    }
    rmSync(path, { recursive: true })
  }
  return moved
}

const moved = flatten(outDir)
if (moved) console.log("Moved " + moved + " route prefetch file" + (moved === 1 ? "" : "s") + " to their flat names.")
