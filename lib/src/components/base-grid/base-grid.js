import { LitElement, html } from "lit-element";
import styles from "./base-grid.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseGrid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gutter
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.gutter = "sm";
  }

  static get properties() {
    return {
      gutter: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }
}

if (!customElements.get("base-grid")) {
  customElements.define("base-grid", BaseGrid);
}

export default BaseGrid;
