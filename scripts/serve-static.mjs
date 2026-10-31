// Serves the static export in out/ the way a plain static host would: index.html for folders, a redirect to the
// trailing-slash URL for folders requested without it, and 404.html with status 404 for anything missing.
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize, resolve } from "node:path"

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

if (!existsSync(root)) {
  console.error("No static export found at " + root + ". Run pnpm build first.")
  process.exit(1)
}

function send(res, status, file) {
  res.writeHead(status, { "Content-Type": types[extname(file)] ?? "application/octet-stream", "Cache-Control": "no-cache" })
  createReadStream(file).pipe(res)
}

createServer((req, res) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname)
  } catch {
    res.writeHead(400).end()
    return
  }
  const target = normalize(join(root, pathname))
  if (!target.startsWith(root)) {
    res.writeHead(403).end()
    return
  }
  if (existsSync(target) && statSync(target).isFile()) {
    send(res, 200, target)
    return
  }
  if (existsSync(join(target, "index.html"))) {
    if (!pathname.endsWith("/")) {
      res.writeHead(308, { Location: pathname + "/" }).end()
      return
    }
    send(res, 200, join(target, "index.html"))
    return
  }
  send(res, 404, join(root, "404.html"))
}).listen(port, "127.0.0.1", () => console.log("Serving " + root + " at http://localhost:" + port))

