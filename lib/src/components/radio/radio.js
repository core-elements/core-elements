import { LitElement, html } from "lit-element";
import styles from "./radio.css";
import sharedStyles from "../../shared/sharedstyles.css";

class Radio extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.name = "";
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.full = false;
    this.disabled = false;
    this._checked = false;
    this.focus = this.focus.bind(this);
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
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

  connectedCallback() {
    super.connectedCallback();
    if (!this.disabled) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  get options() {
    return [...document.querySelectorAll(`core-radio[name="${this.name}"]`)];
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
    if (this.disabled) return;
    // TODO: Why do we need to set this manually even after reflect attribute?
    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

    if (checked === this._checked) return;

    if (checked === true && this.currentCheckedItem) {
      this.currentCheckedItem.checked = false;
    }

    if (this.formElement) {
      this.formElement.checked = checked;
    }

    this._checked = checked;

    this.dispatchEvent(new CustomEvent("change"));

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

  _handleClick(e) {
    e.stopPropagation();
    this.checked = true;
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  _handleKeyDown(e) {
    console.log(e);
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = true;
    }
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
      <input
        tabindex="-1"
        id="radio-input"
        part="input-field"
        name=${this.name}
        ?disabled=${this.disabled}
        @keydown=${this._handleKeyDown}
        @change=${this._handleChange}
        ?checked=${this.checked}
        value=${this.value}
        type="radio"
      />
      <span part="box">
        <slot name="indicator" part="indicator"><i></i></slot>
      </span>
      <label for="radio-input" part="label"><slot></slot></label>
    `;
  }
}

export default Radio;