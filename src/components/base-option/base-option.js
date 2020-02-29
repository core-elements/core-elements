import { LitElement, html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import classnames from "../../utils/classnames";
import styles from "./base-option.css";

class Option extends LitElement {
  constructor() {
    super();
    this.hidden = false;
    this.disabled = false;
    this.selected = false;
    this.active = false;
    this.select = this.select.bind(this);
    this._value = "";
    this._label = "";
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      selected: {
        type: Boolean,
        reflect: true
      },
      active: { type: Boolean, reflect: true },
      hidden: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return [styles];
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
    return this._value || this.label || this.innerText;
  }

  select(e) {
    this.selected = true;
  }

  render() {
    return html`
      <slot>${this.label}</slot>
    `;
  }
}

if (!customElements.get("base-option")) {
  customElements.define("base-option", Option);
}

export default Option;
