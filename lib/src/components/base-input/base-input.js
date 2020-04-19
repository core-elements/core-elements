import { LitElement, html } from "lit-element";
import StringMask from "../../utils/stringmask";
import styles from "./base-input.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseInput extends LitElement {
  constructor() {
    super();
    /**
     * Full input
     * @type {Boolean}
     * @attr
     */
    this.full = false;
    this._value = "";

    /**
     * Button state
     * @type {"text"|"password"|"email"|"tel"}
     * @attr
     */
    this.type = "text";
    this.mask = "";
    this.focused = false;
    this.autofocus = false;
    this._handleInputEvent = this._handleInputEvent.bind(this);
    this._handleChangeEvent = this._handleChangeEvent.bind(this);
    this._handleBlurEvent = this._handleBlurEvent.bind(this);
    this._handleFocusEvent = this._handleFocusEvent.bind(this);
  }

  static get properties() {
    return {
      full: { type: Boolean },
      type: { type: String },
      value: { type: String },
      mask: { type: String },
      focused: { type: Boolean, reflect: true },
      autofocus: { type: Boolean, reclect: true },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.requestUpdate();
  }

  get maskedValue() {
    const formatter = new StringMask(this.mask);
    const res = formatter.apply(this.value);
    console.log("res", res);
    return res;
  }

  _handleFocusEvent() {
    this.focused = true;
    this.showSuggestions = true;
  }

  _handleBlurEvent() {
    this.focused = false;
  }

  _handleInputEvent(e) {
    // First stop default input event to bubble up
    e.stopPropagation();
    // Set the value to the target value
    // this will then become the e.target.value of the custom event
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent("input", e));
  }

  _handleChangeEvent(e) {
    // First stop default input event to bubble up
    e.stopPropagation();
    // Set the value to the target value
    // this will then become the e.target.value of the custom event
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent("change", e));
  }

  render() {
    return html`
      <slot part="label"></slot>
      <div part="input">
        <slot part="prepend" name="prepend"></slot>
        <input
          @input=${this._handleInputEvent}
          @focus=${this._handleFocusEvent}
          @blur=${this._handleBlurEvent}
          part="input-field"
          type=${this.type}
          .value=${this.mask ? this.maskedValue : this.value}
        />
        <slot part="append" name="append"></slot>
      </div>
      <slot part="help" name="help"></slot>
    `;
  }
}

if (!customElements.get("base-input")) {
  customElements.define("base-input", BaseInput);
}

export default BaseInput;
