import { LitElement, html } from "lit-element";
import styles from "./menu.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-menu
 **/

class Menu extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menu");
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default Menu;
