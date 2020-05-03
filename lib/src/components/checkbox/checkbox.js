import { LitElement, html } from "lit-element";
import styles from "./checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

class Checkbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    this._disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.value = "";
    this._checked = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
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

  connectedCallback() {
    super.connectedCallback();
    // init disabled
    this.disabled = this.disabled;

    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(disabled) {
    if (disabled) this.removeAttribute("tabindex");
    else this.setAttribute("tabindex", "0");
    this._disabled = disabled;
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

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = !this.checked;
    }
  }

  _handleClick(e) {
    this.checked = !this.checked;
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  render() {
    return html`
      <input
        id="checkbox-input"
        ?disabled=${this.disabled}
        @change=${this._handleChange}
        ?checked=${this.checked}
        value=${this.value}
        type="checkbox"
      />
      <slot name="box">
        <span part="box">
          <slot name="indicator" part="indicator">&#10003;</slot>
        </span>
      </slot>
      <div for="checkbox-input" part="label"><slot></slot></div>
    `;
  }
}

export default Checkbox;
