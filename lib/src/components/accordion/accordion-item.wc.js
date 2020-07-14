import { LitElement, html } from "lit-element";
import styles from "./accordion-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-accordion
 **/

class Accordion extends LitElement {
  constructor() {
    super();
    this._open = false;
    this.size = "";
    this.hideDefaultIndicator = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      heading: { type: String },
      size: { type: String, reflect: true },
      open: { type: Boolean, reflect: true },
      hideDefaultIndicator: {
        type: Boolean,
        attribute: "hide-default-indicator",
      },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get contentSlot() {
    return this.shadowRoot.querySelector('slot[part="content"]');
  }

  _handleClick(e) {
    this.open = !this.open;
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.open = !this.open;
      this.dispatchEvent(new CustomEvent("click", { bubbles: true }));
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      this.open = !this.open;
      this.dispatchEvent(new CustomEvent("click", { bubbles: true }));
    }
  }

  get mode() {
    return this.parentNode.mode;
  }

  get open() {
    return this._open;
  }

  set open(val) {
    if (this._open === val) return;
    // close all accordion items if mode is single
    if (this.mode === "single" && val) {
      [...this.parentNode.children].forEach((o) => {
        if (o !== this) o.open = false;
      });
    }

    this._open = val;

    if (val) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
    this.dispatchEvent(new CustomEvent("toggle"), { bubbles: true });
  }

  get hasStartSlot() {
    return this.querySelector('[slot="start"]');
  }

  get hasEndSlot() {
    return this.querySelector('[slot="end"]');
  }

  render() {
    return html`
      <slot
        name="trigger"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <button part="trigger">
          ${this.hasStartSlot
            ? html`<slot name="start" part="start"></slot>`
            : null}
          <slot part="heading" name="heading">
            ${this.heading}
          </slot>
          <slot name="end" part="end"
            >${this.hideDefaultIndicator
              ? null
              : html`<svg
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
                </svg>`}
          </slot>
        </button>
      </slot>
      <slot part="content"></slot>
    `;
  }
}

export default Accordion;
