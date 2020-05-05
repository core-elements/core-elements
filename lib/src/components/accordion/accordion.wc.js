import { LitElement, html } from "lit-element";
import styles from "./accordion.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-accordion
 **/

class Accordion extends LitElement {
  constructor() {
    super();
    this._open = false;
    this.hideDefaultIndicator = false;
    this._handleClick = this._handleClick.bind(this);
  }

  static get properties() {
    return {
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

    setTimeout(() => {
      this.open = true;
      this._originalHeight = this.shadowRoot.querySelector(
        'slot[part="content"]'
      ).offsetHeight;
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
            <slot name="start" part="start"></slot>
            <div part="title">${this.title}</div>
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
          </button>`
        : html`<button @click=${this._handleClick} part="trigger">
            <slot name="start" part="start"></slot>
            <slot name="title" part="title"></slot>
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
          </button>`}
      <slot part="content"></slot>
    `;
  }
}

export default Accordion;
