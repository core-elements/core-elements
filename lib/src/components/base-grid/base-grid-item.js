import { LitElement, html } from "lit-element";
import styles from "./base-grid-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseGridItem extends LitElement {
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

if (!customElements.get("base-grid-item")) {
  customElements.define("base-grid-item", BaseGridItem);
}

export default BaseGridItem;
