import BaseText from "./base-text";

if (!customElements.get("base-text")) {
  customElements.define("base-text", BaseText);
}

export { BaseText };
