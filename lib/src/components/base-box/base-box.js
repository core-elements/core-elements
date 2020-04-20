import { LitElement, html } from "lit-element";
import styles from "./base-box.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseBox extends LitElement {
  constructor() {
    super();
    /**
     * Box border radius
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.radius = "sm";
    /**
     * Box depth
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.depth = "sm";

    /**
     * Full box
     * @type {Boolean}
     * @attr
     */
    this.full = false;

    /**
     * Box padding
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.padding = "sm";

    /**
     * Box margin
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.margin = "";
  }

  static get properties() {
    return {
      depth: { type: String, reflect: true },
      radius: { type: String, reflect: true },
      padding: { type: String, reflect: true },
      margin: { type: String, reflect: true },
      full: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get("base-box")) {
  customElements.define("base-box", BaseBox);
}

export default BaseBox;
