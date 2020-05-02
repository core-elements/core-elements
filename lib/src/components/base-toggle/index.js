import BaseToggle from "./base-toggle";

if (!customElements.get("base-toggle")) {
  customElements.define("base-toggle", BaseToggle);
}

export { BaseToggle };
