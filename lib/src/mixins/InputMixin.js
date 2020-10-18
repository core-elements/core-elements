import { LitElement } from "lit-element";

export default class InputMixin extends LitElement {
  constructor() {
    super();

    this.label = null;
    this.value = "";
    this.name = "";

    /* placeholder values */
    this._disabled = false;
  }

  static get properties() {
    return {
      disabled: { type: Boolean, reflect: true },
      label: { type: String },
      name: { type: String },
      value: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get hasLabel() {
    return this.innerHTML || this.label ? true : false;
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
}
