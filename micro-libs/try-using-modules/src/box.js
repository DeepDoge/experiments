import { counter } from "./counter.js";
import { todo } from "./todo.js";
import { html } from "./lib/html.js";

function sayHello() {
  alert("Hello!");
}

export default html`
  <div>
    <div>
      <h1>Box</h1>
      <p>This is a box.</p>
      <button onclick=${sayHello}>Hello</button>
    </div>

    ${todo} ${counter}

    <style>
      @scope {
        :scope {
          display: grid;
          gap: 1em;
        }
      }
    </style>
  </div>
`;
