import { c as css, L as LitElement, h as html } from './lit-element-c5717db0.js';
import { s as sharedStyles } from './sharedstyles-81aa33c4.js';

var styles = css`:host{--base-checkbox-bg-color:var(--base-color-ui-lightest);--base-checkbox-border:1px solid var(--base-color-ui-light);--base-checkbox-cursor:pointer;--base-checkbox-box-shadow:none}input[type=checkbox]{outline:0;box-shadow:var(--base-button-box-shadow);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--base-checkbox-bg-color);color:var(--base-color-font);width:var(--base-space-lg);height:var(--base-space-lg);border-radius:var(--base-border-radius-sm);border:var(--base-checkbox-border);position:relative;vertical-align:middle}input[type=checkbox]:focus{--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}input[type=checkbox]:hover{--base-checkbox-bg-color:var(--base-color-ui-lighter)}input[type=checkbox]:checked{--base-checkbox-bg-color:var(--base-color-focus);--base-checkbox-border:1px solid var(--base-color-focus);color:#fff;-webkit-filter:drop-shadow(0 1px 1px rgba(0,0,0,.2));filter:drop-shadow(0 1px 1px rgba(0,0,0,.2))}input[type=checkbox]:checked:before{opacity:1}input[type=checkbox]:before{content:"";position:absolute;pointer-events:none;left:50%;top:50%;height:5px;width:10px;border-radius:2px 0 2px 2px;border-bottom:2px solid;border-left:2px solid;-webkit-transform:translate(-50%,calc(-50% - 1px)) rotate(-45deg);transform:translate(-50%,calc(-50% - 1px)) rotate(-45deg);opacity:0}`;

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
