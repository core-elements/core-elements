import { c as css, L as LitElement, h as html } from './lit-element-7a30dcec.js';

var styles = css`:host{--base-option-padding:var(--base-space-sm);--base-option-bg-color:var(--base-color-white);--base-option-border-radius:var(--base-border-radius-sm);--base-option-active-color:var(--base-color-focus-light);--base-option-selected-color:var(--base-color-focus);--base-option-font-color:var(--base-color-black);box-sizing:border-box;width:100%;max-width:100%;display:-webkit-box;display:flex;color:var(--base-option-font-color);-webkit-box-align:center;align-items:center;cursor:pointer;background:var(--base-option-bg-color);text-align:left;border-radius:var(--base-option-border-radius);padding:var(--base-option-padding);margin-top:var(--base-spacing-100);border:2px solid transparent}:host(:first-child){margin-top:0}:host([disabled]){opacity:.5;cursor:not-allowed}:host([hidden]){display:none}:host([active]:not([disabled])){--base-color-font-color:var(--base-color-black);--base-option-bg-color:var(--base-option-active-color)}:host([selected]:not([active]):not([disabled])),:host([selected][active]){--base-option-bg-color:var(--base-option-selected-color);--base-option-font-color:var(--base-color-white)}`;

class BaseOption extends LitElement {
  constructor() {
    super();
    this.hidden = false;
    this.disabled = false;
    this.selected = false;
    this.hidden = false;
    this.active = false;
    this.select = this.select.bind(this);
    this._value = "";
    this._label = "";
  }

  static get properties() {
    return {
      value: {
        type: String
      },
      label: {
        type: String
      },
      hidden: {
        type: Boolean,
        reflect: true
      },
      selected: {
        type: Boolean,
        reflect: true
      },
      active: {
        type: Boolean,
        reflect: true
      },
      hidden: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get label() {
    return this._label || this.innerText || this.value;
  }

  set label(val) {
    this._label = val;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value || this.label || this.innerText;
  }

  select(e) {
    this.selected = true;
  }

  render() {
    return html`
      <slot>${this.label}</slot>
    `;
  }

}

if (!customElements.get("base-option")) {
  customElements.define("base-option", BaseOption);
}

export default BaseOption;
