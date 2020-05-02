import BaseCheckbox from "./base-checkbox";

if (!customElements.get("base-checkbox")) {
  customElements.define("base-checkbox", BaseCheckbox);
}

export { BaseCheckbox };
