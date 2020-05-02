import BaseRadio from "./base-radio";

if (!customElements.get("base-radio")) {
  customElements.define("base-radio", BaseRadio);
}

export { BaseRadio };
