import BaseSelect from "./base-select";
import BaseOption from "./base-option";
import BaseOptGroup from "./base-optgroup";

if (!customElements.get("base-select")) {
  customElements.define("base-select", BaseSelect);
}

if (!customElements.get("base-option")) {
  customElements.define("base-option", BaseOption);
}

if (!customElements.get("base-optgroup")) {
  customElements.define("base-optgroup", BaseOptGroup);
}

export { BaseSelect, BaseOption, BaseOptGroup };
