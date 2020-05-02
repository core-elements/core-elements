import BaseBox from "./base-box";

if (!customElements.get("base-box")) {
  customElements.define("base-box", BaseBox);
}

export { BaseBox };
