import BaseAccordion from "./base-accordion";

if (!customElements.get("base-accordion")) {
  customElements.define("base-accordion", BaseAccordion);
}

export { BaseAccordion };
