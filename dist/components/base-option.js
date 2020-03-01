import { c as css, L as LitElement, h as html } from './lit-element-c5717db0.js';

var styles = css`:host{--base-option-padding:10px;box-sizing:border-box;width:100%;max-width:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;cursor:pointer;background:var(--base-color-white);text-align:left;border-radius:var(--base-border-radius-200);padding:var(--base-option-padding);margin-top:var(--base-spacing-100);border:2px solid transparent}:host(:first-child){margin-top:0}:host:focus{border-color:var(--base-color-active-600);background-color:var(--base-color-ui-200)}:host([disabled]){opacity:.5;cursor:not-allowed}:host([hidden]){display:none}:host([active]:not([disabled])){background-color:#deebff}:host([selected]:not([disabled])){background-color:#2684ff;color:#fff}:host([selected] .base-option__desc),:host([selected] .base-option__icon),:host([selected] .base-option__label){color:var(--base-color-active-800)}.base-option__icon{margin-right:var(--base-spacing-300)}.base-option__label{margin:0;padding:0;color:var(--base-color-ui-800);font-size:var(--base-heading-300);font-weight:400;display:block}.base-option__label b{font-weight:600}.base-option__desc{margin:0;padding:0;margin-top:var(--base-spacing-200);font-size:var(--base-paragraph-400);color:var(--base-color-ui-600);display:block;font-weight:400}.base-option--disabled{opacity:.5;color:var(--base-color-ui-500);cursor:not-allowed;background-color:var(--base-color-white)}`;

class Option extends LitElement {
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
  customElements.define("base-option", Option);
}

export default Option;
