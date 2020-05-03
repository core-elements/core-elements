import { LitElement, html } from "lit-element";
import styles from "./toggle.css";
import sharedStyles from "../../shared/sharedstyles.css";

class Toggle extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.full = false;
    /**
     * Toggle size
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
      value: { type: String },
      size: { type: String },
      full: { type: Boolean },
    };
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

  static get styles() {
    return [styles, sharedStyles];
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
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

export default Toggle;
