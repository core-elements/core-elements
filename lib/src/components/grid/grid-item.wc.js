import { LitElement, html } from "lit-element";
import styles from "./grid-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-grid-item
 **/

class GridItem extends LitElement {
  constructor() {
    super();
    this.sm = "";
    this.md = "";
    this.lg = "";
    this.xl = "";
  }

  static get properties() {
    return {
      sm: { type: String },
      md: { type: String },
      lg: { type: String },
      xl: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }
}

export default GridItem;
