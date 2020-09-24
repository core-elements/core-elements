import { LitElement, html } from "lit-element";
import styles from "./button.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-button
 **/

class Button extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {""|"primary"|"transparent"|"success"|"danger"}
     * @attr
     */
    this.variant = "";

    this.squared = false;

    this.rounded = false;

    /**
     * Full button
     * @type {Boolean}
     * @attr
     */
    this.full = false;

    /**
     * Button size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this._disabled = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  static get properties() {
    return {
      href: { type: String },
      disabled: { type: Boolean, reflect: true },
      variant: { type: String },
      rounded: { type: Boolean },
      squared: { type: Boolean },
      size: { type: String },
      full: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
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

  get hasStartSlot() {
    return this.querySelector('[slot="start"]');
  }

  get hasEndSlot() {
    return this.querySelector('[slot="end"]');
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  _handleKeydown(e) {
    if (e.keyCode === 13 && !this.disabled) {
      this.dispatchEvent(new CustomEvent("click"));
    }
    if (e.keyCode === 32 && !this.disabled) {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("click"));
    }
  }

  render() {
    return html`
      ${this.hasStartSlot
        ? html`<slot name="start" part="start"></slot>`
        : null}
      <slot></slot>
      ${this.hasEndSlot ? html`<slot name="end" part="end"></slot>` : null}
    `;
  }
}

export default Button;
