import { LitElement, html } from "lit-element";
import styles from "./menu.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-menu
 **/

class Menu extends LitElement {
  constructor() {
    super();
    this.bordered = false;
    this.full = false;
  }

  static get properties() {
    return {
      bordered: { type: Boolean },
      full: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default Menu;
