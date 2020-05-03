import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{--core-button-padding:0 var(--core-space-md);--core-button-bg-color:var(--core-color-ui-lighter);--core-button-border:0;--core-button-border-radius:none;--core-button-font-size:var(--core-font-size-sm);--core-button-text-color:var(--core-font-color);--core-button-box-shadow:0 0;--core-button-transform:scale(1);--core-button-transition:all .2s ease;--core-button-cursor:pointer;--core-button-display:inline-flex;--core-button-height:var(--core-size-md);vertical-align:middle;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host([full]){--core-button-display:flex;width:100%}:host([size=sm]){--core-button-height:var(--core-size-sm);--core-button-padding:0 var(--core-space-sm)}:host([size=md]){--core-button-height:var(--core-size-md);--core-button-padding:0 var(--core-space-md)}:host([size=lg]){--core-button-height:var(--core-size-lg);--core-button-padding:0 var(--core-space-lg)}:host{height:var(--core-button-height);outline:0;color:var(--core-button-text-color);cursor:var(--core-button-cursor);display:var(--core-button-display);box-shadow:var(--core-button-box-shadow);border-radius:var(--core-button-border-radius);font-size:var(--core-button-font-size);padding:var(--core-button-padding);background:var(--core-button-bg-color);border:var(--core-button-border);-webkit-transform:var(--core-button-transform);transform:var(--core-button-transform);-webkit-transition:var(--core-button-transition);transition:var(--core-button-transition)}:host(:hover){--core-button-bg-color:var(--core-color-ui-light)}:host(:focus){--core-button-box-shadow:0 0 0 2px var(--core-color-focus)}:host([disabled]){opacity:.5;cursor:not-allowed}:host([type=primary]){--core-button-bg-color:var(--core-color-primary);--core-button-text-color:var(--core-color-white)}:host([type=primary]:hover){--core-button-bg-color:var(--core-color-primary-dark)}:host([type=secondary]){--core-button-bg-color:var(--core-color-secondary);--core-button-text-color:var(--core-color-primary)}:host([type=secondary]:hover){--core-button-bg-color:var(--core-color-secondary-dark)}:host([type=transparent]){--core-button-bg-color:transparent;--core-button-text-color:var(--core-color-black)}:host([type=transparent]:hover){--core-button-bg-color:var(--core-color-ui-lighter)}:host([type=success]){--core-button-bg-color:var(--core-color-success);--core-button-text-color:var(--core-color-white)}:host([type=success]:hover){--core-button-bg-color:var(--core-color-success-dark)}:host([type=danger]){--core-button-bg-color:var(--core-color-danger);--core-button-text-color:var(--core-color-white)}:host([type=danger]:hover){--core-button-bg-color:var(--core-color-danger-dark)}:host([outline]){--core-button-border:2px solid var(--core-button-bg-color);color:var(--core-button-bg-color);background:none !important}:host([outline]):not([type]){color:var(--core-color-black)}::slotted([slot=prepend]){vertical-align:text-bottom;margin-right:var(--core-space-sm)}::slotted([slot=append]){vertical-align:text-bottom;margin-left:var(--core-space-sm)}`;

class Button extends LitElement {
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

export { Button };
