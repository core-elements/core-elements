import { LitElement, html } from "lit-element";
import styles from "./checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-checkbox
 **/

class Checkbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.label = "";
    this.disabled = false;
    this.value = "";
    this.name = "";
    this._checked = false;
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      focused: { type: Boolean, reflect: true },
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean },
      label: { type: String },
      name: { type: String },
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
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  get formElement() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return;
    if (this._checked === checked) return;

    this._checked = checked;

    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

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
    this.formElement.focus();
    this.checked = !this.checked;
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  render() {
    return html`
      <input
        aria-labelledby="checkbox"
        @focus=${() => (this.focused = true)}
        @blur=${() => (this.focused = false)}
        ?disabled=${this.disabled}
        @change=${this._handleChange}
        .checked=${this.checked}
        name=${this.name}
        value=${this.value}
        type="checkbox"
      />
      <slot name="box">
        <span part="box">
          <slot name="indicator" part="indicator">&#10003;</slot>
        </span>
      </slot>
      <span id="checkbox" part="label">
        <slot>${this.label}</slot>
      </span>
    `;
  }
}

export default Checkbox;
