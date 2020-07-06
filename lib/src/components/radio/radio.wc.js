import { LitElement, html } from "lit-element";
import styles from "./radio.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-radio
 **/
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
      disabled: { type: Boolean, reflect: true },
      full: { type: Boolean, reflect: true },
      size: { type: String, reflect: true },
      name: { type: String },
      value: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  focus() {
    this.formElement.focus();
  }

  get options() {
    return [...document.querySelectorAll(`core-radio[name="${this.name}"]`)];
  }

  get currentCheckedItem() {
    return this.options.find((option) => option.hasAttribute("checked"));
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

    // TODO: Why do we need to set this manually even after reflect attribute?
    if (checked) {
      if (this.currentCheckedItem) {
        this.currentCheckedItem.checked = false;
      }
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }

    this.dispatchEvent(new CustomEvent("change"));

    this.requestUpdate();
  }

  selectNext() {
    const options = this.options.filter((o) => !o.disabled);
    const checkedIndex = options.findIndex((option) => option.checked);
    const isLastOption = options.length === checkedIndex + 1;
    const nextIndex = isLastOption ? 0 : checkedIndex + 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  selectPrevious() {
    const options = this.options.filter((o) => !o.disabled);
    const checkedIndex = options.findIndex((option) => option.checked);
    const isFirstOption = checkedIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : checkedIndex - 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  _handleClick(e) {
    e.stopPropagation();
    this.formElement.focus();
    this.checked = true;
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = true;
    }
    // Left
    if (e.keyCode === 37 || e.keyCode === 40) {
      e.preventDefault();
      this.selectPrevious();
    }
    // Right
    if (e.keyCode === 39 || e.keyCode === 38) {
      e.preventDefault();
      this.selectNext();
    }
  }

  render() {
    return html`
      <input
        aria-labelledby="radio"
        part="input-field"
        name=${this.name}
        ?disabled=${this.disabled}
        @change=${this._handleChange}
        .checked=${this.checked}
        value=${this.value}
        type="radio"
      />
      <span part="box">
        <slot name="indicator" part="indicator"><i></i></slot>
      </span>
      <span id="radio" part="label"><slot></slot></span>
    `;
  }
}

export default Radio;
