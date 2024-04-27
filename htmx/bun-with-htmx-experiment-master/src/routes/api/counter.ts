import { uniqueId } from "../../utils/unique" assert { type: "macro" }

const countFilepath = "/tmp/count.txt" as const

export const countId = uniqueId()
export const countHtml = async () => `<span class="${countId}" hx-get="/api/counter" hx-trigger="every 5s">${await GET()}</span>`

export async function GET() {
    const countFile = Bun.file(countFilepath)
    return await countFile.exists() ? parseInt(await countFile.text()) : 0
}

export async function POST({ direction }: Partial<{ direction: "add" | "subtract" }>) {
    const count = await GET() + (direction === "add" ? 1 : -1)
    await Bun.write(countFilepath, `${count}`)
    return await GET()
}