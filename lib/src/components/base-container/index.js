import BaseContainer from "./base-container";

if (!customElements.get("base-container")) {
  customElements.define("base-container", BaseContainer);
}

export { BaseContainer };
