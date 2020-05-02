import BaseKnobs from "./base-knobs";

if (!customElements.get("base-knobs")) {
  customElements.define("base-knobs", BaseKnobs);
}

export { BaseKnobs };
