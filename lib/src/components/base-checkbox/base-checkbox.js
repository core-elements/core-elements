import { LitElement, html } from "lit-element";
import styles from "./base-checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseCheckbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    this.disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.value = "";
    this._checked = false;
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

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this._checked === checked) return;

    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

    this._checked = checked;

    if (this.inputEl) {
      this.inputEl.checked = checked;
    }

    this.dispatchEvent(new CustomEvent("change"));

    this.requestUpdate();
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
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
        <span part="box">
          <slot name="indicator" part="indicator">&#10003;</slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }
}

if (!customElements.get("base-checkbox")) {
  customElements.define("base-checkbox", BaseCheckbox);
}

export default BaseCheckbox;
