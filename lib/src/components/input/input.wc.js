import { LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";
import StringMask from "../../utils/stringmask";
import styles from "./input.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-input
 **/
class Input extends LitElement {
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
    this.disabled = false;

    /**
     * Input type
     * @type {"text"|"password"|"email"|"tel"|"number"|"url"|"search"}
     * @attr
     */
    this.type = "text";
    this.type = "placeholder";
    this.mask = "";
    this.errormessage = "";
    this.inputmode = undefined;
    this.autocomplete = undefined;
    this.max = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.minlength = undefined;
    this.pattern = undefined;
    this.step = undefined;
    /**
     * Input size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    /**
     * Validate input value on event
     * @type {"blur"|"change"|"input"}
     * @attr
     */
    this.validateOn = "blur";
    this.readonly = false;
    /**
     * Validate input value on event
     * @type {"invalid"|"valid"|"both"}
     * @attr
     */
    this.validate = undefined;
    this.id = undefined;
    this.name = undefined;
    this.autofocus = false;
    this._maskedValue = "";
    this._handleInvalidEvent = this._handleInvalidEvent.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this._handleInputEvent = this._handleInputEvent.bind(this);
    this._handleChangeEvent = this._handleChangeEvent.bind(this);
  }

  static get properties() {
    return {
      id: { type: String },
      name: { type: String },
      errormessage: { type: String },
      max: { type: String },
      maxlength: { type: String },
      min: { type: String },
      minlength: { type: String },
      pattern: { type: String },
      size: { type: String },
      step: { type: String },
      placeholder: { type: String },
      autocomplete: { type: String },
      readonly: { type: Boolean },
      disabled: { type: Boolean },
      full: { type: Boolean, reflect: true },
      validate: { type: String },
      validateOn: { type: String, attribute: "validate-on" },
      valid: { type: Boolean, reflect: true },
      invalid: { type: Boolean, reflect: true },
      type: { type: String },
      value: { type: String },
      mask: { type: String },
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
    if (this.mask) {
      const formatter = new StringMask(this.mask);
      this._maskedValue = formatter.apply(val);
    }
    this._value = val || "";

    this.requestUpdate();
  }

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  get hasHelpSlot() {
    return this.querySelector('[slot="help"]');
  }

  get hasErrorSlot() {
    return this.querySelector('[slot="error"]');
  }

  get hasStartSlot() {
    return this.querySelector('[slot="start"]');
  }

  get hasEndSlot() {
    return this.querySelector('[slot="end"]');
  }

  checkValidity() {
    return this.inputEl.checkValidity();
  }

  reportValidity() {
    const valid = this.inputEl.checkValidity();

    if (valid && this.validate !== "success") {
      this.invalid = false;
    }

    if (!valid && this.validate !== "success") {
      this.invalid = true;
    }

    if (valid && (this.validate === "valid" || this.validate === "both")) {
      this.valid = true;
    }

    if (!valid && this.validate !== "valid") {
      this.valid = false;
    }
  }

  stepUp() {
    this.inputEl.stepUp();
  }

  stepDown() {
    this.inputEl.stepDown();
  }

  _handleBlurEvent() {
    if (this.validate !== undefined && this.validateOn === "blur") {
      this.reportValidity();
    }
  }

  _handleInvalidEvent(e) {}

  _handleInputEvent(e) {
    if (this.validate !== undefined && this.validateOn === "input") {
      this.reportValidity();
    }
    // First stop default input event to bubble up
    e.stopPropagation();
    // Set the value to the target value
    // this will then become the e.target.value of the custom event
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent("input", e));
  }

  _handleChangeEvent(e) {
    if (this.validate !== undefined && this.validateOn === "change") {
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
      <div part="input">
        ${this.hasStartSlot
          ? html`<slot part="start" name="start"></slot>`
          : null}
        <input
          id=${ifDefined(this.id)}
          name=${ifDefined(this.name)}
          autocomplete=${ifDefined(this.autocomplete)}
          inputmode=${ifDefined(this.inputmode)}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          @invalid=${this._handleInvalidEvent}
          ?readonly=${this.readonly}
          min=${ifDefined(this.min)}
          minlength=${ifDefined(this.minlength)}
          max=${ifDefined(this.max)}
          maxlength=${ifDefined(this.maxlength)}
          step=${ifDefined(this.step)}
          pattern=${ifDefined(this.pattern)}
          @input=${this._handleInputEvent}
          @change=${this._handleChangeEvent}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          part="input-field"
          type=${this.type}
          .value=${this.value}
        />
        ${this.hasEndSlot ? html`<slot part="end" name="end"></slot>` : null}
      </div>
      ${this.hasHelpSlot ? html`<slot part="help" name="help"></slot>` : null}
      ${this.invalid ? html`<slot part="error" name="error"></slot>` : null}
    `;
  }
}

export default Input;
