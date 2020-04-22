import { LitElement, html } from "lit-element";
import styles from "./base-option.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseOption extends LitElement {
  constructor() {
    super();
    this.hidden = false;
    this.disabled = false;
    this.selected = false;
    this.hidden = false;
    this.active = false;
    this.select = this.select.bind(this);
    this._value = "";
    this._label = "";
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      hidden: { type: Boolean, reflect: true },
      selected: {
        type: Boolean,
        reflect: true,
      },
      active: { type: Boolean, reflect: true },
      hidden: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get label() {
    return this._label || this.innerText || this.value;
  }

  set label(val) {
    this._label = val;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value || this._label || this.innerText;
  }

  select(e) {
    this.selected = true;
  }

  render() {
    return html` <slot>${this.label}</slot> `;
  }
}

if (!customElements.get("base-option")) {
  customElements.define("base-option", BaseOption);
}

export default BaseOption;
