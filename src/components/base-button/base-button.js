import { LitElement, html } from "lit-element";
import styles from "./base-button.css";

class BaseButton extends LitElement {
  constructor() {
    super();
    this.type = "";
    this.style = "";
  }

  static get properties() {
    return {
      type: { type: String },
      style: { type: String }
    };
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <button><slot></slot></button>
    `;
  }
}

if (!customElements.get("base-button")) {
  customElements.define("base-button", BaseButton);
}

export default BaseButton;
