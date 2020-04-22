import { LitElement, html } from "lit-element";
import styles from "./base-grid.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseGrid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gutter = "sm";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gutterSm = "";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gutterMd = "";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gutterLg = "";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gutterXl = "";
    this.columns = "12";
  }

  static get properties() {
    return {
      gutter: { type: String },
      gutterSm: { type: String },
      gutterMd: { type: String },
      gutterLg: { type: String },
      gutterXl: { type: String },
      columns: { type: String },
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
