import { html, fragment } from "./lib/html.js";

/**
 * @param {SubmitEvent} event
 */
function addTodo(event) {
  event.preventDefault();
  event.target
    .closest(".root")
    .querySelector("ul")
    .append(
      fragment(html`
        <li>
          ${event.target.$todo.value}
          <button onclick=${(event) => event.target.closest("li").remove()}>
            Remove
          </button>
        </li>
      `)
    );
  event.target.reset();
}

export const todo = html`
  <div class="root">
    <strong>TODO</strong>
    <form onsubmit=${addTodo}>
      <input type="text" name="$todo" />
      <button type="submit">Add</button>
    </form>
    <ul></ul>
  </div>
`;
