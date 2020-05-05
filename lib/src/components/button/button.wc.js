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
     * @type {"primary"|"secondary"|"transparent"|"success"|"danger"}
     * @attr
     */
    this.type = "";

    this.squared = false;

    this.outline = false;

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
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  static get properties() {
    return {
      disabled: { type: Boolean, relfect: true },
      type: { type: String },
      outline: { type: Boolean },
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
    //  trigger first attribute change
    this.disabled = this.disabled;

    this.addEventListener("keydown", this._handleKeydown);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(disabled) {
    if (disabled) this.removeAttribute("tabindex");
    else this.setAttribute("tabindex", "0");
    this._disabled = disabled;
  }

  _handleKeydown(e) {
    // Enter
    if (e.keyCode === 13) {
      this.dispatchEvent(new CustomEvent("click"));
    }
  }

  render() {
    return html`
      <slot name="start" part="start"></slot>
      <slot></slot>
      <slot name="end" part="end"></slot>
    `;
  }
}

export default Button;
