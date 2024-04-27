const $LIB = "__$lib__";

const functions = new Map();
window[$LIB] = {
  functions,
};

/**
@param {TemplateStringsArray[]} strings
@param {unknown[]} values
*/
export function html(strings, ...values) {
  values.forEach((value, i) => {
    if (typeof value === "function") {
      const id = Math.random().toString(36).slice(2);
      functions.set(id, value);
      values[i] = `window.${$LIB}.functions.get("${id}")(event)`;
    }
  });

  return String.raw(strings, ...values);
}

export function fragment(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}
