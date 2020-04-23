import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{--base-radio-height:var(--base-size-md);vertical-align:top;cursor:pointer;display:inline-block;height:var(--base-radio-height);margin-right:var(--base-space-sm)}:host([full]){display:block;width:100%;margin-right:0}:host([size=sm]){--base-radio-height:var(--base-size-sm)}:host([size=md]){--base-radio-height:var(--base-size-md)}:host([size=lg]){--base-radio-height:var(--base-size-lg)}:host label{height:var(--base-radio-height);display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse;font-size:var(--hw-font-size-small);position:relative;line-height:1.5}:host([full]) label{display:-webkit-box;display:flex}:host [part=indicator]{display:inline-block;position:relative;margin-right:var(--base-space-xs);border:2px solid var(--base-color-ui-light);border-radius:50%;background:var(--hw-color-white);width:calc(var(--base-radio-height) - var(--base-space-md));height:calc(var(--base-radio-height) - var(--base-space-md));-webkit-transition:border-color .3s ease,max-height .3s ease,-webkit-transform .3s ease;transition:border-color .3s ease,max-height .3s ease,-webkit-transform .3s ease;transition:border-color .3s ease,max-height .3s ease,transform .3s ease;transition:border-color .3s ease,max-height .3s ease,transform .3s ease,-webkit-transform .3s ease}:host [part=label]{display:inline-block}:host [part=input-field]{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);vertical-align:middle}:host [part=input-field]:hover:not([disabled]):not(:checked)~[part=indicator]{background-color:var(--base-color-ui-lighter)}:host [part=input-field]:checked~[part=indicator]{border-color:var(--base-color-focus)}:host [part=input-field]:checked~[part=indicator]:after{content:"";position:absolute;width:60%;height:60%;border-radius:50%;top:50%;left:50%;-webkit-transform:translateY(-50%) translateX(-50%);transform:translateY(-50%) translateX(-50%);background:var(--base-color-focus)}:host [part=input-field]:focus~[part=indicator]{border-color:var(--base-color-focus)}:host [part=input-field]:disabled~[part=indicator]{border-color:var(--base-color-ui-lighter);background-color:transparent;cursor:not-allowed}`;

class BaseRadio extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.name = "";
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.full = false;
    this.disabled = false;
    this._checked = false;
    this.focus = this.focus.bind(this);
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
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
        type: String
      },
      name: {
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

  get options() {
    return [...document.querySelectorAll(`base-radio[name="${this.name}"]`)];
  }

  get currentCheckedItem() {
    return this.options.find(option => option.checked);
  }

  get formElement() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (checked === this._checked) {
      return;
    }

    if (checked === true && this.currentCheckedItem) {
      this.currentCheckedItem.checked = false;
    }

    if (this.formElement) {
      this.formElement.checked = checked;
    }

    this._checked = checked;
    this.requestUpdate();
  }

  selectNext() {
    const options = this.options;
    const checkedIndex = options.findIndex(option => option.checked);
    const isLastOption = options.length === checkedIndex + 1;
    const nextIndex = isLastOption ? 0 : checkedIndex + 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  selectPrevious() {
    const options = this.options;
    const checkedIndex = options.findIndex(option => option.checked);
    const isFirstOption = checkedIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : checkedIndex - 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  focus() {
    this.formElement.focus();
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
    this.dispatchEvent(new CustomEvent("change", e));
  }

  _handleKeyPress(e) {
    // Left
    if (e.keyCode === 37) {
      this.selectPrevious();
    } // Right


    if (e.keyCode === 39) {
      this.selectNext();
    }
  }

  render() {
    return html`
    <label>
      <span part="label"><slot><slot></span>
      <input
        part="input-field"
        name=${this.name}
        ?disabled=${this.disabled}
        @keydown=${this._handleKeyPress}
        @change=${this._handleChange}
        ?checked=${this.checked}
        value=${this.value}
        type="radio"
      />
      <i part="indicator"></i>
  </label>
    `;
  }

}

if (!customElements.get("base-radio")) {
  customElements.define("base-radio", BaseRadio);
}

export default BaseRadio;
