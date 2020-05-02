import BaseTabs from "./base-tabs";
import BaseTab from "./base-tab";

if (!customElements.get("base-tabs")) {
  customElements.define("base-tabs", BaseTabs);
}

if (!customElements.get("base-tab")) {
  customElements.define("base-tab", BaseTab);
}

export { BaseTabs, BaseTab };
