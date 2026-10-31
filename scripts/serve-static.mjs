// Serves the static export in out/ the way a plain static host would: index.html for folders, a redirect to the
// trailing-slash URL for folders requested without it, 404.html with status 404 for anything missing, and gzip for
// text files when the browser accepts it (as common static hosts do, so pnpm perf measures realistic transfer sizes).
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize, resolve, sep } from "node:path"
import { createGzip } from "node:zlib"

const root = resolve(process.argv[2] ?? "out")
const port = Number(process.env.PORT ?? 3001)
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
}
const compressible = new Set([".html", ".css", ".js", ".json", ".txt", ".xml", ".svg"])

if (!existsSync(root)) {
  console.error("No static export found at " + root + ". Run pnpm build first.")
  process.exit(1)
}

function send(req, res, status, file) {
  const headers = { "Content-Type": types[extname(file)] ?? "application/octet-stream", "Cache-Control": "no-cache", Vary: "Accept-Encoding" }
  // A file can disappear while out/ is being rebuilt; end that response instead of crashing the server.
  const stream = createReadStream(file).on("error", () => res.destroy())
  if (compressible.has(extname(file)) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    res.writeHead(status, { ...headers, "Content-Encoding": "gzip" })
    stream.pipe(createGzip()).pipe(res)
    return
  }
  res.writeHead(status, headers)
  stream.pipe(res)
}

const server = createServer((req, res) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname)
  } catch {
    res.writeHead(400).end()
    return
  }
  const target = normalize(join(root, pathname))
  // Compare with the separator, so a sibling folder such as out-old/ does not count as inside out/.
  if (target !== root && !target.startsWith(root + sep)) {
    res.writeHead(403).end()
    return
  }
  if (existsSync(target) && statSync(target).isFile()) {
    send(req, res, 200, target)
    return
  }
  if (existsSync(join(target, "index.html"))) {
    if (!pathname.endsWith("/")) {
      res.writeHead(308, { Location: pathname + "/" }).end()
      return
    }
    send(req, res, 200, join(target, "index.html"))
    return
  }
  send(req, res, 404, join(root, "404.html"))
})
// PORT=0 lets the OS pick a free port; the log line reports the port actually used (pnpm perf reads it).
server.listen(port, "127.0.0.1", () => console.log("Serving " + root + " at http://localhost:" + server.address().port))

