import { LitElement, html } from "lit-element";
import styles from "./toggle.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-toggle
 **/
class Toggle extends LitElement {
  constructor() {
    super();
    this.full = false;
    /**
     * Toggle size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.value = "";
    this.label = "";
    this.name = "";
    this._checked = false;
    this.disabled = false;
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      label: { type: String },
      checked: { type: Boolean, reflect: true },
      value: { type: String },
      size: { type: String },
      full: { type: Boolean },
      name: { type: String },
      disabled: { type: Boolean },
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

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));

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
        aria-labelledby="toggle"
        @focus=${() => (this.focused = true)}
        @blur=${() => (this.focused = false)}
        ?disabled=${this.disabled}
        @change=${this._handleChange}
        .checked=${this.checked}
        name=${this.name}
        value=${this.value}
        type="checkbox"
      />
      <span part="box">
        <slot part="on" name="on"></slot>
        <slot part="indicator" name="indicator"></slot>
        <slot part="off" name="off"></slot>
      </span>
      <span id="toggle" part="label"><slot>${this.label}</slot></span>
    `;
  }
}

export default Toggle;
