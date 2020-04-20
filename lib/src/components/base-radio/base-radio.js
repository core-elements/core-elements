import { LitElement, html } from "lit-element";
import styles from "./base-radio.css";

class BaseRadio extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.name = "";
    this.size = "";
    this.full = false;
    this.disabled = false;
    this._checked = false;
    this.focus = this.focus.bind(this);
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean },
      full: { type: Boolean },
      size: { type: String },
      name: { type: String, reflect: true },
      value: { type: String },
    };
  }

  static get styles() {
    return [styles];
  }

  get options() {
    return [...document.querySelectorAll(`base-radio[name="${this.name}"]`)];
  }

  get currentCheckedItem() {
    return this.options.find((option) => option.checked);
  }

  get formElement() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (checked === this._checked) {
      return;
    }

    if (checked === true && this.currentCheckedItem) {
      this.currentCheckedItem.checked = false;
    }

    if (this.formElement) {
      this.formElement.checked = checked;
    }

    this._checked = checked;

    this.requestUpdate();
  }

  selectNext() {
    const options = this.options;
    const checkedIndex = options.findIndex((option) => option.checked);
    const isLastOption = options.length === checkedIndex + 1;
    const nextIndex = isLastOption ? 0 : checkedIndex + 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  selectPrevious() {
    const options = this.options;
    const checkedIndex = options.findIndex((option) => option.checked);
    const isFirstOption = checkedIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : checkedIndex - 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  focus() {
    this.formElement.focus();
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
    this.dispatchEvent(new CustomEvent("change", e));
  }

  _handleKeyPress(e) {
    // Left
    if (e.keyCode === 37) {
      this.selectPrevious();
    }
    // Right
    if (e.keyCode === 39) {
      this.selectNext();
    }
  }

  render() {
    return html`
    <label>
      <span part="label"><slot><slot></span>
      <input
        part="input-field"
        name=${this.name}
        ?disabled=${this.disabled}
        @keydown=${this._handleKeyPress}
        @change=${this._handleChange}
        ?checked=${this.checked}
        value=${this.value}
        type="radio"
      />
      <i part="indicator"></i>
  </label>
    `;
  }
}

if (!customElements.get("base-radio")) {
  customElements.define("base-radio", BaseRadio);
}

export default BaseRadio;
