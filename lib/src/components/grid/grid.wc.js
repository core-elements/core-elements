import { LitElement, html } from "lit-element";
import styles from "./grid.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-grid
 **/
class Grid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gap = "sm";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gapSm = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gapMd = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gapLg = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.gapXl = "";
    this.columns = "12";
  }

  static get properties() {
    return {
      gap: { type: String },
      gapSm: { type: String },
      gapMd: { type: String },
      gapLg: { type: String },
      gapXl: { type: String },
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

export default Grid;
