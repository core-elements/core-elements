import { LitElement, html } from "lit-element";
import styles from "./toggle.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-toggle
 **/
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
    this.disabled = false;
    this._checked = false;
    this._handleChange = this._handleChange.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      value: { type: String },
      size: { type: String },
      full: { type: Boolean },
      disabled: { type: Boolean },
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

    this._checked = checked;

    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

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
          ?disabled=${this.disabled}
          part="input-field"
          @change=${this._handleChange}
          .checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <span part="box">
          <slot part="on" name="on"></slot>
          <slot part="indicator" name="indicator"></slot>
          <slot part="off" name="off"></slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }
}

export default Toggle;
