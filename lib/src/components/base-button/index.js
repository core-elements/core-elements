import BaseButton from "./base-button";

if (!customElements.get("base-button")) {
  customElements.define("base-button", BaseButton);
}

export { BaseButton };
