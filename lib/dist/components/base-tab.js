import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{--base-tab-box-shadow:0 0;white-space:nowrap;cursor:default;display:-webkit-inline-box;display:inline-flex}:host([full]){display:-webkit-box;display:flex;width:100%}:host([disabled]){opacity:.5}:host{border:0;color:var(--base-color-font-light);font-size:var(--base-font-size-sm);background:0;box-shadow:var(--base-tab-box-shadow);outline:0;padding:0 var(--base-space-sm);margin-right:var(--base-space-sm);height:var(--base-size-sm);border-bottom:2px solid transparent}:host(:focus),:host(:hover){border-bottom:2px solid var(--base-color-ui-light)}:host(:focus),:host([selected]){color:var(--base-color-font-dark)}:host([selected]){border-bottom:2px solid var(--base-color-focus)}`;

class BaseTab extends LitElement {
  constructor() {
    super();
    this.selected = false;
    this.target = "";
    this.disabled = false;
    this._value = "";
    this.hash = "";
  }

  static get properties() {
    return {
      hash: {
        type: String
      },
      target: {
        type: String
      },
      selected: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value || this.innerText || this.textContent;
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html` <slot></slot>`;
  }

}

export default BaseTab;
