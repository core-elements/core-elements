import { LitElement, html } from "lit-element";
import styles from "./base-accordion.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseAccordion extends LitElement {
  constructor() {
    super();
    this._open = true;
    this._handleClick = this._handleClick.bind(this);
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

    setTimeout(() => {
      this._originalHeight = this.offsetHeight;
      this.open = false;
    });
  }

  _handleClick() {
    this.open = !this.open;
  }

  get open() {
    return this._open;
  }

  set open(val) {
    if (this._open === val) return;
    if (val) {
      const content = this.shadowRoot.querySelector('slot[part="content"]');
      content.style.maxHeight = `${this._originalHeight}px`;
      this.setAttribute("open", "");
    } else {
      const content = this.shadowRoot.querySelector('slot[part="content"]');
      content.style.maxHeight = "0px";
      this.removeAttribute("open");
    }
    this._open = val;
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  render() {
    return html`
      ${this.title
        ? html`<button @click=${this._handleClick} part="trigger">
            <slot name="prepend" part="prepend"></slot>
            <div part="title">${this.title}</div>
            <slot name="append" part="append"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                  fill="currentColor"
                />
              </svg>
            </slot>
          </button>`
        : html`<button @click=${this._handleClick} part="trigger">
            <slot name="prepend" part="prepend"></slot>
            <slot name="title" part="title"></slot>
            <slot name="append" part="append"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                  fill="currentColor"
                />
              </svg>
            </slot>
          </button>`}
      <slot part="content"></slot>
    `;
  }
}

if (!customElements.get("base-accordion")) {
  customElements.define("base-accordion", BaseAccordion);
}

export default BaseAccordion;
