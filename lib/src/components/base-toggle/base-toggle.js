import { LitElement, html } from "lit-element";
import styles from "./base-toggle.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseToggle extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.loading = false;
    this.full = false;
    /**
     * Toggle size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.value = "";
    this._handleChange = this._handleChange.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean },
      loading: { type: Boolean },
      value: { type: String },
      size: { type: String },
      full: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
    this.dispatchEvent(new CustomEvent("change", e));
  }

  render() {
    return html`
      <label>
        <input
          part="input-field"
          @change=${this._handleChange}
          ?checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <span part="box">
          <slot part="on" name="on"></slot>
          <span part="indicator"></span>
          <slot part="off" name="off"></slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }
}

if (!customElements.get("base-toggle")) {
  customElements.define("base-toggle", BaseToggle);
}

export default BaseToggle;
