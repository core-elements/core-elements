import { LitElement, html } from "lit-element";
import styles from "./base-accordion.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseAccordion extends LitElement {
  constructor() {
    super();
    this._open = false;
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    //  trigger first attribute change
    this.setAttribute("tabindex", "0");
  }

  get open() {}

  set open(val) {
    if (this._open === val) return;
    if (val) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
    this._open = val;
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  render() {
    return html`
      ${this.title
        ? html`<button @click=${(this.open = !this.open)} part="trigger">
            <slot name="prepend" part="prepend"></slot>
            ${this.title}
            <slot name="append" part="append"></slot>
          </button>`
        : html`<button @click=${(this.open = !this.open)} part="trigger">
            <slot name="prepend" part="prepend"></slot>
            <slot name="title" part="title"></slot>
            <slot name="append" part="append"></slot>
          </button>`}
      <slot part="content"></slot>
    `;
  }
}

if (!customElements.get("base-accordion")) {
  customElements.define("base-accordion", BaseAccordion);
}

export default BaseAccordion;
