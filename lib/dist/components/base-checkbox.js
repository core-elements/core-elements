import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{--base-checkbox-bg-color:var(--base-color-white);--base-checkbox-border:2px solid var(--base-color-ui-light);--base-checkbox-cursor:pointer;--base-checkbox-box-shadow:none;--base-checkbox-height:var(--base-size-md);--base-checkbox-border-radius:none;vertical-align:middle;height:var(--base-checkbox-height);display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;margin-right:var(--base-space-sm)}:host([full]){display:-webkit-box;display:flex;width:100%;margin-right:0}:host([size=sm]){--base-checkbox-indicator-font-size:.8em;--base-checkbox-height:var(--base-size-sm)}:host([size=md]){--base-checkbox-indicator-font-size:1em;--base-checkbox-height:var(--base-size-md)}:host([size=lg]){--base-checkbox-indicator-font-size:1.4em;--base-checkbox-height:var(--base-size-lg)}:host([disabled]){color:var(--base-color-font-light)}:host label{display:inline-block}input{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);vertical-align:middle}input~[part=box]{box-shadow:var(--base-button-box-shadow);background-color:var(--base-checkbox-bg-color);color:var(--base-color-font);width:calc(var(--base-checkbox-height) - var(--base-space-md));height:calc(var(--base-checkbox-height) - var(--base-space-md));border-radius:var(--base-checkbox-border-radius);border:var(--base-checkbox-border);margin-right:var(--base-space-sm);position:relative;vertical-align:middle;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}input:focus~[part=box]{--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}input:hover~[part=box]{--base-checkbox-bg-color:var(--base-color-ui-lighter)}input:checked~[part=box]{--base-checkbox-bg-color:var(--base-color-focus);--base-checkbox-border:1px solid var(--base-color-focus)}[part=box] [part=indicator]{font-size:var(--base-checkbox-indicator-font-size);color:var(--base-color-white);fill:currentColor;display:block;opacity:0}input:checked~[part=box] [part=indicator]{opacity:1}`;

class BaseCheckbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    this.disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.value = "";
    this._checked = false;
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

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this._checked === checked) return;
    if (checked) this.setAttribute("checked", "");else this.removeAttribute("checked");
    this._checked = checked;

    if (this.inputEl) {
      this.inputEl.checked = checked;
    }

    this.dispatchEvent(new CustomEvent("change"));
    this.requestUpdate();
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
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
        <span part="box">
          <slot name="indicator" part="indicator">&#10003;</slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }

}

if (!customElements.get("base-checkbox")) {
  customElements.define("base-checkbox", BaseCheckbox);
}

export default BaseCheckbox;
