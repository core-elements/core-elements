import { LitElement, html } from "lit-element";
import styles from "./tab.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-tab
 **/
class Tab extends LitElement {
  constructor() {
    super();
    this.selected = false;
    this.target = "";
    this._disabled = false;
    this._value = "";
    this.hash = "";
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  static get properties() {
    return {
      hash: { type: String },
      target: { type: String },
      selected: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      value: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeydown);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(disabled) {
    if (disabled === this._disabled) return;
    this._disabled = disabled;
    if (disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("disabled", "");
    } else {
      this.setAttribute("tabindex", "0");
      this.removeAttribute("disabled");
    }
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  _handleKeydown(e) {
    if (e.keyCode === 13 && !this.disabled) {
      this.dispatchEvent(new CustomEvent("click"), { bubbles: true });
    }
    if (e.keyCode === 32 && !this.disabled) {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("click"), { bubbles: true });
    }
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value || this.innerText || this.textContent;
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html` <slot></slot>`;
  }
}

export default Tab;
