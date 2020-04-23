import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{--base-checkbox-bg-color:var(--base-color-white);--base-checkbox-border:2px solid var(--base-color-ui-light);--base-checkbox-cursor:pointer;--base-checkbox-box-shadow:none;--base-checkbox-height:var(--base-size-md);--base-checkbox-border-radius:none;height:var(--base-checkbox-height);display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;margin-right:var(--base-space-sm)}:host([full]){display:-webkit-box;display:flex;width:100%;margin-right:0}:host([size=sm]){--base-checkbox-height:var(--base-size-sm)}:host([size=md]){--base-checkbox-height:var(--base-size-md)}:host([size=lg]){--base-checkbox-height:var(--base-size-lg)}:host([disabled]){color:var(--base-color-font-light)}:host label{display:inline-block}:host input[type=checkbox]{outline:0;box-shadow:var(--base-button-box-shadow);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--base-checkbox-bg-color);color:var(--base-color-font);width:calc(var(--base-checkbox-height) - var(--base-space-md));height:calc(var(--base-checkbox-height) - var(--base-space-md));border-radius:var(--base-checkbox-border-radius);border:var(--base-checkbox-border);position:relative;vertical-align:middle}input[type=checkbox]:focus{--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}input[type=checkbox]:hover{--base-checkbox-bg-color:var(--base-color-ui-lighter)}input[type=checkbox]:checked{--base-checkbox-bg-color:var(--base-color-focus);--base-checkbox-border:1px solid var(--base-color-focus);color:var(--base-color-white)}input[type=checkbox]:checked:before{opacity:1}input[type=checkbox]:before{border-color:var(--base-color-white);content:"";position:absolute;pointer-events:none;left:50%;top:50%;height:5px;width:10px;border-radius:2px 0 2px 2px;border-bottom:2px solid;border-left:2px solid;-webkit-transform:translate(-50%,calc(-50% - 1px)) rotate(-45deg);transform:translate(-50%,calc(-50% - 1px)) rotate(-45deg);opacity:0}`;

class BaseCheckbox extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.full = false;
    this.disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.value = "";
    this._handleChange = this._handleChange.bind(this);
  }

  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean
      },
      full: {
        type: Boolean
      },
      size: {
        type: String,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
    this.dispatchEvent(new CustomEvent("change", e));
    this.dispatchEvent(new CustomEvent("input", e));
  }

  render() {
    return html`
      <label>
        <input
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          ?checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <slot></slot>
      </label>
    `;
  }

}

if (!customElements.get("base-checkbox")) {
  customElements.define("base-checkbox", BaseCheckbox);
}

export default BaseCheckbox;
