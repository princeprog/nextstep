import { type ChildProcess, spawn } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { type IncomingHttpHeaders, request } from "node:http"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { gunzipSync } from "node:zlib"

import { afterAll, beforeAll, describe, expect, it } from "vitest"

let dir: string
let server: ChildProcess
let port: number

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), "nextstep-serve-"))
  const files = {
    "out/index.html": "<h1>Home</h1>",
    "out/404.html": "<h1>Missing</h1>",
    "out/features/index.html": "<h1>Features</h1>",
    "out/og.png": "not really a png",
    // A sibling folder whose name starts with "out", which a plain prefix check would let through.
    "outside/secret.txt": "secret",
  }
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(join(dir, file, ".."), { recursive: true })
    writeFileSync(join(dir, file), content)
  }
  server = spawn(process.execPath, [join(import.meta.dirname, "serve-static.mjs"), join(dir, "out")], { env: { ...process.env, PORT: "0" } })
  port = await new Promise((resolve, reject) => {
    server.stdout?.on("data", (chunk) => {
      const match = String(chunk).match(/localhost:(\d+)/)
      if (match) resolve(Number(match[1]))
    })
    server.on("exit", (code) => reject(new Error("serve-static exited with code " + code)))
  })
})

afterAll(() => {
  server?.kill()
  rmSync(dir, { recursive: true, force: true })
})

function get(path: string, headers: Record<string, string> = {}) {
  return new Promise<{ status: number; headers: IncomingHttpHeaders; body: Buffer }>((resolve, reject) => {
    request({ host: "127.0.0.1", port, path, headers }, (res) => {
      const chunks: Buffer[] = []
      res.on("data", (chunk) => chunks.push(chunk))
      res.on("end", () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks) }))
    })
      .on("error", reject)
      .end()
  })
}

describe("serve-static", () => {
  it("serves folder pages and redirects folders to their trailing-slash URL", async () => {
    expect((await get("/features/")).body.toString()).toBe("<h1>Features</h1>")
    const redirect = await get("/features")
    expect(redirect.status).toBe(308)
    expect(redirect.headers.location).toBe("/features/")
  })

  it("answers missing pages with 404.html and status 404", async () => {
    const missing = await get("/no-such-page/")
    expect(missing.status).toBe(404)
    expect(missing.body.toString()).toBe("<h1>Missing</h1>")
  })

  it("gzips text files when the browser accepts it, like common static hosts", async () => {
    const gzipped = await get("/", { "accept-encoding": "gzip, br" })
    expect(gzipped.headers["content-encoding"]).toBe("gzip")
    expect(gunzipSync(gzipped.body).toString()).toBe("<h1>Home</h1>")
    expect((await get("/")).headers["content-encoding"]).toBeUndefined()
    expect((await get("/og.png", { "accept-encoding": "gzip" })).headers["content-encoding"]).toBeUndefined()
  })

  it("never serves files outside the export folder", async () => {
    const sibling = await get("/..%2foutside%2fsecret.txt")
    expect(sibling.status).toBe(403)
    expect(sibling.body.toString()).not.toContain("secret")
    expect((await get("/..%2f..%2fpackage.json")).status).toBe(403)
  })
})
