import BaseLabel from "./base-label";

if (!customElements.get("base-label")) {
  customElements.define("base-label", BaseLabel);
}

export { BaseLabel };
