import { c as css, L as LitElement, h as html } from './lit-element-6bb3323a.js';
import { s as sharedStyles } from './sharedstyles-fd1d7228.js';

var styles = css`:host{display:inline-block;--base-button-padding:var(--base-space-sm) var(--base-space-md);--base-button-bg-color:var(--base-color-ui-lighter);--base-button-border:0;--base-button-border-radius:var(--base-border-radius-sm);--base-button-font-size:var(--base-font-size-sm);--base-button-text-color:var(--base-font-color);--base-button-box-shadow:0 0;--base-button-transform:scale(1);--base-button-transition:all .2s ease;--base-button-cursor:pointer;--base-button-display:inline-block}:host button{outline:0;color:var(--base-button-text-color);cursor:var(--base-button-cursor);display:var(--base-button-display);box-shadow:var(--base-button-box-shadow);border-radius:var(--base-button-border-radius);font-size:var(--base-button-font-size);padding:var(--base-button-padding);background:var(--base-button-bg-color);border:var(--base-button-border);-webkit-transform:var(--base-button-transform);transform:var(--base-button-transform);-webkit-transition:var(--base-button-transition);transition:var(--base-button-transition)}:host button:hover{--base-button-bg-color:var(--base-color-ui-light)}:host button:focus{--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}:host[full] button{width:100%}:host([type=primary]) button{--base-button-bg-color:var(--base-color-primary-light);--base-button-text-color:var(--base-color-white)}:host([type=primary]) button:hover{--base-button-bg-color:var(--base-color-primary)}:host([type=secondary]) button{--base-button-bg-color:var(--base-color-secondary-light);--base-button-text-color:var(--base-color-white)}:host([type=secondary]) button:hover{--base-button-bg-color:var(--base-color-secondary)}:host([type=transparent]) button{--base-button-bg-color:transparent;--base-button-text-color:var(--base-color-black)}:host([type=transparent]) button:hover{--base-button-bg-color:var(--base-color-ui-lighter)}:host([type=success]) button{--base-button-bg-color:var(--base-color-success-light);--base-button-text-color:var(--base-color-white)}:host([type=success]) button:hover{--base-button-bg-color:var(--base-color-success)}:host([type=danger]) button{--base-button-bg-color:var(--base-color-danger-light);--base-button-text-color:var(--base-color-white)}:host([type=danger]) button:hover{--base-button-bg-color:var(--base-color-danger)}:host([style=outline]) button{--base-button-border:2px solid var(--base-button-bg-color);color:var(--base-button-bg-color);background:none !important}:host([style=outline]):not([type]){color:var(--base-color-black)}`;

class BaseButton extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"primary"|"secondary"|"transparent"|"success"|"danger"}
     * @attr
     */

    this.type = "";
    /**
     * Button state
     * @type {"normal"|"outline"}
     * @attr
     */

    this.style = "";
    /**
     * Full button
     * @type {Boolean}
     * @attr
     */

    this.full = false;
  }

  static get properties() {
    return {
      type: {
        type: String
      },
      style: {
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
    super.connectedCallback();
  }

  render() {
    return html` <button><slot></slot></button> `;
  }

}

if (!customElements.get("base-button")) {
  customElements.define("base-button", BaseButton);
}

export default BaseButton;
