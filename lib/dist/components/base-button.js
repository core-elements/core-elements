import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{--base-button-padding:0 var(--base-space-md);--base-button-bg-color:var(--base-color-ui-lighter);--base-button-border:0;--base-button-border-radius:none;--base-button-font-size:var(--base-font-size-sm);--base-button-text-color:var(--base-font-color);--base-button-box-shadow:0 0;--base-button-transform:scale(1);--base-button-transition:all .2s ease;--base-button-cursor:pointer;--base-button-display:inline-flex;--base-button-height:var(--base-size-md);vertical-align:middle;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host([full]){--base-button-display:flex;width:100%}:host([size=sm]){--base-button-height:var(--base-size-sm);--base-button-padding:0 var(--base-space-sm)}:host([size=md]){--base-button-height:var(--base-size-md);--base-button-padding:0 var(--base-space-md)}:host([size=lg]){--base-button-height:var(--base-size-lg);--base-button-padding:0 var(--base-space-lg)}:host{height:var(--base-button-height);outline:0;color:var(--base-button-text-color);cursor:var(--base-button-cursor);display:var(--base-button-display);box-shadow:var(--base-button-box-shadow);border-radius:var(--base-button-border-radius);font-size:var(--base-button-font-size);padding:var(--base-button-padding);background:var(--base-button-bg-color);border:var(--base-button-border);-webkit-transform:var(--base-button-transform);transform:var(--base-button-transform);-webkit-transition:var(--base-button-transition);transition:var(--base-button-transition)}:host(:hover){--base-button-bg-color:var(--base-color-ui-light)}:host(:focus){--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}:host([disabled]){opacity:.5;cursor:not-allowed}:host([type=primary]){--base-button-bg-color:var(--base-color-primary);--base-button-text-color:var(--base-color-white)}:host([type=primary]:hover){--base-button-bg-color:var(--base-color-primary-dark)}:host([type=secondary]){--base-button-bg-color:var(--base-color-secondary);--base-button-text-color:var(--base-color-primary)}:host([type=secondary]:hover){--base-button-bg-color:var(--base-color-secondary-dark)}:host([type=transparent]){--base-button-bg-color:transparent;--base-button-text-color:var(--base-color-black)}:host([type=transparent]:hover){--base-button-bg-color:var(--base-color-ui-lighter)}:host([type=success]){--base-button-bg-color:var(--base-color-success);--base-button-text-color:var(--base-color-white)}:host([type=success]:hover){--base-button-bg-color:var(--base-color-success-dark)}:host([type=danger]){--base-button-bg-color:var(--base-color-danger);--base-button-text-color:var(--base-color-white)}:host([type=danger]:hover){--base-button-bg-color:var(--base-color-danger-dark)}:host([outline]){--base-button-border:2px solid var(--base-button-bg-color);color:var(--base-button-bg-color);background:none !important}:host([outline]):not([type]){color:var(--base-color-black)}::slotted([slot=prepend]){vertical-align:text-bottom;margin-right:var(--base-space-sm)}::slotted([slot=append]){vertical-align:text-bottom;margin-left:var(--base-space-sm)}`;

class BaseButton extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"primary"|"secondary"|"transparent"|"success"|"danger"}
     * @attr
     */

    this.type = "";
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
      disabled: {
        type: Boolean,
        relfect: true
      },
      type: {
        type: String
      },
      outline: {
        type: Boolean
      },
      size: {
        type: String
      },
      full: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback(); //  trigger first attribute change

    this.disabled = this.disabled;
    this.addEventListener("keydown", this._handleKeydown);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(disabled) {
    if (disabled) this.removeAttribute("tabindex");else this.setAttribute("tabindex", "0");
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
      <slot name="prepend" part="prepend"></slot>
      <slot></slot>
      <slot name="append" part="append"></slot>
    `;
  }

}

export default BaseButton;
