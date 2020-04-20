import { LitElement, html } from "lit-element";
import styles from "./base-button.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseButton extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"primary"|"secondary"|"transparent"|"success"|"danger"}
     * @attr
     */
    this.type = "";
    /**
     * Button state
     * @type {"normal"|"outline"}
     * @attr
     */
    this.style = "";

    /**
     * Full button
     * @type {Boolean}
     * @attr
     */
    this.full = false;

    /**
     * Button size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
  }

  static get properties() {
    return {
      type: { type: String },
      style: { type: String },
      size: { type: String },
      full: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html` <button><slot></slot></button> `;
  }
}

if (!customElements.get("base-button")) {
  customElements.define("base-button", BaseButton);
}

export default BaseButton;
