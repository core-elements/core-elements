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
    this._calculateHeight = this._calculateHeight.bind(this);
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

    // TODO: Why not slots accessible without timeout?
    setTimeout(() => {
      this._calculateHeight();
    }, 0);
  }

  _calculateHeight() {
    this.open = true;
    this.contentSlot.style.maxHeight = "max-content";
    this._originalHeight = this.contentSlot.offsetHeight;
    this.open = false;
  }

  get contentSlot() {
    return this.shadowRoot.querySelector('slot[part="content"]');
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
      this.contentSlot.style.maxHeight = `${this._originalHeight}px`;
      this.setAttribute("open", "");
    } else {
      this.contentSlot.style.maxHeight = "0px";
      this.removeAttribute("open");
    }
    this._open = val;
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  get hasStartSlot() {
    return this.querySelector('[slot="start"]');
  }

  get hasEndSlot() {
    return this.querySelector('[slot="end"]');
  }

  render() {
    return html`
      <slot @click=${this._handleClick} name="trigger" part="trigger">
        ${this.hasStartSlot
          ? html`<slot name="start" part="start"></slot>`
          : null}
        <slot
          @slotchange=${() => this._calculateHeight()}
          part="title"
          name="title"
        >
          ${this.title}
        </slot>
        <slot @slotchange=${() => this._calculateHeight()} name="end" part="end"
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
      </slot>
      <slot part="content"></slot>
    `;
  }
}

export default Accordion;
