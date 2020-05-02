import BaseGrid from "./base-grid";
import BaseGridItem from "./base-grid-item";

if (!customElements.get("base-grid")) {
  customElements.define("base-grid", BaseGrid);
}

if (!customElements.get("base-grid-item")) {
  customElements.define("base-grid-item", BaseGridItem);
}

export { BaseGrid, BaseGridItem };
