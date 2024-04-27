import { html } from "./lib/html.js";

/**
 * @template T
 * @typedef {import("./lib/signal.js").Signal<T>} Signal<T>
 */

/**
 * @type {Signal<number>}
 */
let signal;

let count = 0;
function add() {
  count++;
}

export const counter = html`
  <div>
    <button onclick=${add}>${count}</button>
    <strong>${count}</strong>
  </div>
`;
