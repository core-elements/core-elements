import { LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";
import styles from "./checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-checkbox
 * @cssprop --height
 * @cssprop --box-background
 * @cssprop --box-border-width
 * @cssprop --box-border-color
 * @cssprop --box-border-style
 * @cssprop --box-cursor
 * @cssprop --box-box-shadow
 * @cssprop --box-size
 * @cssprop --box-border-radius
 * @cssprop --indicator-color
 * @cssprop --indicator-font-size
 * @cssprop --label-font-size
 * @cssprop --label-color
 * @cssprop --label-display
 **/

class Checkbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.label = null;
    this.value = "";
    this.name = "";
    this._disabled = false;
    this._checked = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      label: { type: String },
      name: { type: String },
      full: { type: Boolean, reflect: true },
      size: { type: String, reflect: true },
      value: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
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

  get hasLabel() {
    return this.innerHTML || this.label ? true : false;
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return;
    if (this._checked === checked) return;

    this._checked = checked;

    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));

    this.requestUpdate();
  }

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = !this.checked;
    }
  }

  _handleClick() {
    this.checked = !this.checked;
  }

  render() {
    return html`
      <slot
        name="box"
        aria-disabled=${this.disabled}
        aria-labelledby="checkbox"
        aria-label=${ifDefined(this.label)}
        aria-checked=${this.checked}
        role="checkbox"
        part="box"
      >
        <slot name="indicator" part="indicator">&#10003;</slot>
      </slot>
      ${this.hasLabel
        ? html`<span id="checkbox" part="label">
            ${this.label ? this.label : html`<slot></slot>`}
          </span>`
        : null}
    `;
  }
}

export default Checkbox;
