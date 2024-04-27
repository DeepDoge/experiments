import { countHtml, countId } from "./api/counter";

export const GET = async () => `
    <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    <button hx-post="/api/counter?direction=add" hx-swap="innerHTML" hx-target=".${countId}">+</button>
    ${await countHtml()}
    <button hx-post="/api/counter?direction=subtract" hx-swap="innerHTML" hx-target=".${countId}">-</button>
    <div>${await countHtml()}</div>
`
