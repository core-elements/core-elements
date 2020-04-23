import { LitElement, html } from "lit-element";
import styles from "./ab-dropdown__item.css";

class DropdownItem extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="ab-dropdown__item"><slot></slot></div>
    `;
  }
}

if (!customElements.get("ab-dropdown-item")) {
  customElements.define("ab-dropdown-item", DropdownItem);
}

export default DropdownItem;
