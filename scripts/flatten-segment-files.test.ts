import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, relative } from "node:path"

import { afterEach, describe, expect, it } from "vitest"

const script = join(import.meta.dirname, "flatten-segment-files.mjs")
const created: string[] = []

function exportFixture(files: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), "nextstep-export-"))
  created.push(dir)
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(dir, path, ".."), { recursive: true })
    writeFileSync(join(dir, path), content)
  }
  return dir
}

function listFiles(dir: string) {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)).replaceAll("\\", "/"))
    .sort()
}

afterEach(() => {
  for (const dir of created.splice(0)) rmSync(dir, { recursive: true, force: true })
})

describe("flatten-segment-files", () => {
  it("moves nested route prefetch files to the flat names the client router requests", () => {
    const out = exportFixture({
      "index.html": "home",
      "__next.__PAGE__.txt": "root page",
      "features/index.html": "features",
      "features/__next._tree.txt": "tree",
      "features/__next.features/__PAGE__.txt": "features page",
      "docs/guide/__next.docs/guide/__PAGE__.txt": "deep page",
    })
    const result = spawnSync(process.execPath, [script, out], { encoding: "utf8" })
    expect(result.status).toBe(0)
    expect(listFiles(out)).toEqual([
      "__next.__PAGE__.txt",
      "docs/guide/__next.docs.guide.__PAGE__.txt",
      "features/__next._tree.txt",
      "features/__next.features.__PAGE__.txt",
      "features/index.html",
      "index.html",
    ])
    expect(readFileSync(join(out, "features/__next.features.__PAGE__.txt"), "utf8")).toBe("features page")
  })

  it("leaves an already flat export unchanged", () => {
    const out = exportFixture({ "features/__next.features.__PAGE__.txt": "features page", "features/index.html": "features" })
    const result = spawnSync(process.execPath, [script, out], { encoding: "utf8" })
    expect(result.status).toBe(0)
    expect(result.stdout).toBe("")
    expect(listFiles(out)).toEqual(["features/__next.features.__PAGE__.txt", "features/index.html"])
  })

  it("fails clearly when there is no export", () => {
    const result = spawnSync(process.execPath, [script, join(tmpdir(), "nextstep-missing-export")], { encoding: "utf8" })
    expect(result.status).toBe(1)
    expect(result.stderr).toMatch(/No static export found/)
  })
})
