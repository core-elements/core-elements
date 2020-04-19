import { LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";
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
    this.required = false;
    this.full = false;
    this.valid = false;
    this.invalid = false;

    /**
     * Button state
     * @type {"text"|"password"|"email"|"tel"|"number"}
     * @attr
     */
    this.type = "text";
    this.mask = "";
    this.errormessage = "";
    this.max = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.minlength = undefined;
    this.pattern = undefined;
    this.readonly = false;
    this.autovalidate = false;
    this.focused = false;
    this.autofocus = false;
    this._handleInvalidEvent = this._handleInvalidEvent.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this._handleInputEvent = this._handleInputEvent.bind(this);
    this._handleChangeEvent = this._handleChangeEvent.bind(this);
    this._handleKeypress = this._handleKeypress.bind(this);
    this._handleBlurEvent = this._handleBlurEvent.bind(this);
    this._handleFocusEvent = this._handleFocusEvent.bind(this);
  }

  static get properties() {
    return {
      errormessage: { type: String },
      max: { type: String },
      maxlength: { type: String },
      min: { type: String },
      minlength: { type: String },
      pattern: { type: String },
      readonly: { type: Boolean },
      full: { type: Boolean },
      full: { type: Boolean, reflect: true },
      autovalidate: { type: Boolean },
      valid: { type: Boolean, reflect: true },
      invalid: { type: Boolean, reflect: true },
      type: { type: String },
      value: { type: String },
      mask: { type: String },
      focused: { type: Boolean, reflect: true },
      required: { type: Boolean, reflect: true },
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

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  checkValidity() {
    const valid = this.inputEl.checkValidity();
    if (valid) {
      this.invalid = false;
      this.valid = true;
    } else {
      this.valid = false;
      this.invalid = true;
    }
  }

  reportValidity() {
    let valid;
    const slot = this.querySelector('[slot="error"]');
    if (slot && slot.innerHTML) {
      valid = this.inputEl.checkValidity();
    } else {
      valid = this.inputEl.reportValidity();
    }

    if (valid) {
      this.invalid = false;
      this.valid = true;
    } else {
      this.valid = false;
      this.invalid = true;
    }
  }

  _handleFocusEvent() {
    this.focused = true;
    this.showSuggestions = true;
  }

  _handleBlurEvent() {
    this.focused = false;
    if (this.autovalidate) {
      this.checkValidity();
    }
  }

  _handleInvalidEvent(e) {}

  // keypress is run before value is changed
  _handleKeypress(e) {
    // First stop default input event to bubble up
    e.stopPropagation();
    // Set the value to the target value
    // this will then become the e.target.value of the custom event
    if (this.mask) {
      const formatter = new StringMask(this.mask);
      this.value = formatter.apply(e.target.value.replace(/[^\d\p{L}]/g, ""));
    } else {
      this.value = e.target.value;
    }

    this.dispatchEvent(new CustomEvent("keypress", e));
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
    if (this.autovalidate) {
      this.reportValidity();
    }

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
          @invalid=${this._handleInvalidEvent}
          ?readonly=${this.readonly}
          min=${ifDefined(this.min)}
          minlength=${ifDefined(this.minlength)}
          max=${ifDefined(this.max)}
          maxlength=${ifDefined(this.maxlength)}
          pattern=${ifDefined(this.pattern)}
          @keypress=${this._handleKeypress}
          @input=${this._handleInputEvent}
          @change=${this._handleChangeEvent}
          @focus=${this._handleFocusEvent}
          @blur=${this._handleBlurEvent}
          ?required=${this.required}
          part="input-field"
          type=${this.type}
          .value=${this.value}
        />
        <slot part="append" name="append"></slot>
      </div>
      <slot part="help" name="help"></slot>
      ${this.invalid ? html`<slot part="error" name="error"></slot>` : null}
    `;
  }
}

if (!customElements.get("base-input")) {
  customElements.define("base-input", BaseInput);
}

export default BaseInput;
