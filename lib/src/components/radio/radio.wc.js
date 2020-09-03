import { LitElement, html } from "lit-element";
import styles from "./radio.css";
import sharedStyles from "../../shared/sharedstyles.css";
import { ifDefined } from "lit-html/directives/if-defined.js";

/**
 * @element core-radio
 * @cssprop --box-shadow
 * @cssprop --cursor
 * @cssprop --height
 * @cssprop --box-border-color
 * @cssprop --box-border-width
 * @cssprop --box-border-style
 * @cssprop --box-background-color
 * @cssprop --box-border-radius
 * @cssprop --box-size
 * @cssprop --indicator-color
 * @cssprop --indicator-size
 * @cssprop --indicator-border-radius
 * @cssprop --label-font-size
 **/
class Radio extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.name = "";
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.label = null;
    this.full = false;
    this.disabled = false;
    this._checked = false;
    this.focus = this.focus.bind(this);
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      full: { type: Boolean, reflect: true },
      size: { type: String, reflect: true },
      name: { type: String, reflect: true },
      value: { type: String },
      label: { type: String },
    };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  get options() {
    return [...document.querySelectorAll(`[name="${this.name}"]`)];
  }

  get currentCheckedItem() {
    return this.options.find((option) => option.hasAttribute("checked"));
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return;
    if (this._checked === checked) return;

    this._checked = checked;

    // TODO: Why do we need to set this manually even after reflect attribute?
    if (checked) {
      if (this.currentCheckedItem) {
        this.currentCheckedItem.checked = false;
      }
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));

    this.requestUpdate();
  }

  selectNext() {
    const options = this.options.filter((o) => !o.disabled);
    const checkedIndex = options.findIndex((option) => option.checked);
    const isLastOption = options.length === checkedIndex + 1;
    const nextIndex = isLastOption ? 0 : checkedIndex + 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  selectPrevious() {
    const options = this.options.filter((o) => !o.disabled);
    const checkedIndex = options.findIndex((option) => option.checked);
    const isFirstOption = checkedIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : checkedIndex - 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  focus() {
    this.shadowRoot.querySelector('[part="box"]').focus();
  }

  _handleClick(e) {
    e.stopPropagation();
    this.checked = true;
  }

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = true;
    }
    // Left or up
    if (e.keyCode === 37 || e.keyCode === 38) {
      e.preventDefault();
      this.selectPrevious();
    }
    // Right or down
    if (e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault();
      this.selectNext();
    }
  }

  render() {
    return html`
      <span
        tabindex=${this.disabled ? "-1" : "0"}
        role="radio"
        aria-disabled=${this.disabled}
        aria-labelledby="radio"
        aria-label=${ifDefined(this.label)}
        aria-checked=${this.checked}
        part="box"
      >
        <slot name="indicator" part="indicator"><span></span></slot>
      </span>
      <span tabindex="-1" id="radio" part="label"
        ><slot>${this.label}</slot></span
      >
    `;
  }
}

export default Radio;
