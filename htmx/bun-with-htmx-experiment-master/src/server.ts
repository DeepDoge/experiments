import path from "path"

async function getResult(pathname: string, method: string, params: URLSearchParams) {
  const filePath = path.resolve(path.join(import.meta.dir, 'routes', pathname))
  const tryPaths = [`${filePath}.ts`, `${filePath}/index.ts`] as const
  for (const path of tryPaths) {
    if (await Bun.file(path).exists()) {
      try {
        const module = await import(path) as Record<string, unknown>
        if (!(method in module)) continue
        const fn = await module[method]
        if (typeof fn !== "function") continue
        return await fn(Object.fromEntries(params.entries()))
      }
      catch { }
    }
  }

  return null
}

Bun.serve({
  async fetch(request, server) {
    const url = new URL(request.url)
    const result = await getResult(url.pathname, request.method, url.searchParams)
    if (result === null) return new Response("Not Found", { status: 404 })
    return new Response(`${result}`, { headers: { "content-type": "text/html" } })
  },
})