import { LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";
import styles from "./checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-checkbox
 * @cssprop --height - var(--core-element-height-default)
 * @cssprop --box-background - var(--core-color-white)
 * @cssprop --box-border-width - var(--core-border-width-default)
 * @cssprop --box-border-color - var(--core-color-ui)
 * @cssprop --box-border-style - solid
 * @cssprop --box-cursor - pointer
 * @cssprop --box-box-shadow - none
 * @cssprop --box-size - calc(var(--height) - var(--core-space-md))
 * @cssprop --box-border-radius - var(--core-border-radius-default)
 * @cssprop --indicator-color - transparent
 * @cssprop --indicator-font-size - var(--core-font-size-md)
 * @cssprop --label-font-size - var(--core-font-size-md)
 * @cssprop --label-color - currentColor
 * @cssprop --label-display - inline-block
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
    this.disabled = false;
    this.value = "";
    this.name = "";
    this._checked = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean },
      label: { type: String },
      name: { type: String },
      full: { type: Boolean },
      size: { type: String, reflect: true },
      value: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.disabled) {
      this.setAttribute("tabindex", 0);
    }
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
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

  _handleClick(e) {
    this.checked = !this.checked;
  }

  render() {
    return html`
      <span
        aria-disabled=${this.disabled}
        aria-labelledby="checkbox"
        aria-label=${ifDefined(this.label)}
        aria-checked=${this.checked}
        role="checkbox"
        part="box"
      >
        <slot name="indicator" part="indicator">&#10003;</slot>
      </span>
      <span id="checkbox" part="label">
        <slot>${this.label}</slot>
      </span>
    `;
  }
}

export default Checkbox;
