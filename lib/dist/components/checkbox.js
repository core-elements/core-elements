import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{--core-checkbox-bg-color:var(--core-color-white);--core-checkbox-border:2px solid var(--core-color-ui-light);--core-checkbox-cursor:pointer;--core-checkbox-box-shadow:none;--core-checkbox-height:var(--core-size-md);--core-checkbox-border-radius:none;cursor:default;outline:0;vertical-align:middle;height:var(--core-checkbox-height);display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;margin-right:var(--core-space-sm)}:host([full]){display:-webkit-box;display:flex;width:100%;margin-right:0}:host([size=sm]){--core-checkbox-indicator-font-size:.8em;--core-checkbox-height:var(--core-size-sm)}:host([size=md]){--core-checkbox-indicator-font-size:1em;--core-checkbox-height:var(--core-size-md)}:host([size=lg]){--core-checkbox-indicator-font-size:1.4em;--core-checkbox-height:var(--core-size-lg)}:host([disabled]){color:var(--core-color-font-light)}:host [part=label]{line-height:1.5;font-size:var(--hw-font-size-small);display:block;-webkit-box-flex:1;flex:1;margin-left:var(--core-space-sm)}input{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}[part=box],input{vertical-align:middle}[part=box]{box-shadow:var(--core-button-box-shadow);background-color:var(--core-checkbox-bg-color);color:var(--core-color-font);width:calc(var(--core-checkbox-height) - var(--core-space-md));height:calc(var(--core-checkbox-height) - var(--core-space-md));border-radius:var(--core-checkbox-border-radius);border:var(--core-checkbox-border);position:relative;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host(:focus) [part=box]{--core-button-box-shadow:0 0 0 2px var(--core-color-focus)}:host(:hover) [part=box]{--core-checkbox-bg-color:var(--core-color-ui-lighter)}:host([checked]) [part=box]{--core-checkbox-bg-color:var(--core-color-focus);--core-checkbox-border:1px solid var(--core-color-focus)}[part=box] [part=indicator]{font-size:var(--core-checkbox-indicator-font-size);color:var(--core-color-white);fill:currentColor;display:block;opacity:0}:host([checked]) [part=indicator]{opacity:1}`;

class Checkbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    this._disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.value = "";
    this._checked = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
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

  connectedCallback() {
    super.connectedCallback(); // init disabled

    this.disabled = this.disabled;
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(disabled) {
    if (disabled) this.removeAttribute("tabindex");else this.setAttribute("tabindex", "0");
    this._disabled = disabled;
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

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = !this.checked;
    }
  }

  _handleClick(e) {
    this.checked = !this.checked;
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  render() {
    return html`
      <input
        id="checkbox-input"
        ?disabled=${this.disabled}
        @change=${this._handleChange}
        ?checked=${this.checked}
        value=${this.value}
        type="checkbox"
      />
      <slot name="box">
        <span part="box">
          <slot name="indicator" part="indicator">&#10003;</slot>
        </span>
      </slot>
      <div for="checkbox-input" part="label"><slot></slot></div>
    `;
  }

}

export { Checkbox };
