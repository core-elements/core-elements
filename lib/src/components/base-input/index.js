import BaseInput from "./base-input";

if (!customElements.get("base-input")) {
  customElements.define("base-input", BaseInput);
}

export { BaseInput };
