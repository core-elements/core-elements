import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{--base-toggle-height:var(--base-size-md);--base-toggle-box-size:var(--base-size-sm);--base-toggle-indicator-margin:var(--base-space-xs);--base-toggle-indicator-size:calc(var(--base-toggle-box-size) - var(--base-toggle-indicator-margin)*2);--base-toggle-icon-size:calc(var(--base-toggle-indicator-size)*0.8);vertical-align:middle;cursor:default;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;height:var(--base-toggle-height)}:host([full]){width:100%}:host([full]),:host label{display:-webkit-box;display:flex}:host label{-webkit-box-align:center;align-items:center}:host input{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);vertical-align:middle}:host input:focus+[part=box]{box-shadow:0 0 0 2px var(--base-color-focus)}[part=box]{position:relative;background:var(--base-color-ui-light);border:2px solid var(--base-color-ui-light);border-radius:300px;display:inline-block;-webkit-transition:all .2s ease;transition:all .2s ease;height:var(--base-toggle-box-size);width:calc(var(--base-toggle-box-size)*1.8);flex-basis:calc(var(--base-toggle-box-size)*1.8);flex-shrink:0;-webkit-box-flex:0;flex-grow:0}:host input:checked+[part=box]{border-color:var(--base-color-focus);background:var(--base-color-focus)}[part=indicator]{background:var(--base-color-white);position:absolute;left:var(--base-toggle-indicator-margin);top:50%;-webkit-transition:all .2s ease;transition:all .2s ease;-webkit-transform:translateY(-50%) translateX(0);transform:translateY(-50%) translateX(0);border-radius:50%;width:var(--base-toggle-indicator-size);height:var(--base-toggle-indicator-size)}:host(:hover) [part=indicator]{box-shadow:0 1px 4px 0 rgba(0,0,0,.2)}[part=box] [part=on]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;display:block;left:var(--base-toggle-indicator-margin)}[part=box] [part=off],[part=box] [part=on]{color:var(--base-color-white);position:absolute;width:var(--base-toggle-icon-size);height:var(--base-toggle-icon-size);border-radius:50%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:""}[part=box] [part=off]{text-align:center;display:block;right:var(--base-toggle-indicator-margin)}:host input:checked+[part=box] [part=indicator]{left:calc(100% - var(--base-toggle-indicator-margin));-webkit-transform:translateY(-50%) translateX(-100%);transform:translateY(-50%) translateX(-100%)}[part=label]{padding-left:var(--base-space-md);font-weight:400}:host([size=sm]){--base-toggle-height:var(--base-size-sm);--base-toggle-box-size:var(--base-size-xs);--base-toggle-indicator-margin:4px}:host([size=md]){--base-toggle-height:var(--base-size-md);--base-toggle-box-size:var(--base-size-sm);--base-toggle-indicator-margin:4px}:host([size=lg]){--base-toggle-height:var(--base-size-lg);--base-toggle-box-size:var(--base-size-md);--base-toggle-indicator-margin:4px}`;

class BaseToggle extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.full = false;
    /**
     * Toggle size
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
      value: {
        type: String
      },
      size: {
        type: String
      },
      full: {
        type: Boolean
      }
    };
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

  static get styles() {
    return [styles, sharedStyles];
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  render() {
    return html`
      <label>
        <input
          part="input-field"
          @change=${this._handleChange}
          ?checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <span part="box">
          <slot part="on" name="on"></slot>
          <span part="indicator"></span>
          <slot part="off" name="off"></slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }

}

export default BaseToggle;
