import { LitElement, html } from "lit-element";
import styles from "./base-checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseCheckbox extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.full = false;
    this.disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.value = "";
    this._handleChange = this._handleChange.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean },
      full: { type: Boolean },
      size: { type: String, reflect: true },
      value: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
    this.dispatchEvent(new CustomEvent("change", e));
    this.dispatchEvent(new CustomEvent("input", e));
  }

  render() {
    return html`
      <label>
        <input
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          ?checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <slot></slot>
      </label>
    `;
  }
}

if (!customElements.get("base-checkbox")) {
  customElements.define("base-checkbox", BaseCheckbox);
}

export default BaseCheckbox;
