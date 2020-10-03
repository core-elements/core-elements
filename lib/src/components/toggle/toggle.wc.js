import { LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";
import styles from "./toggle.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-toggle
 **/
class Toggle extends LitElement {
  constructor() {
    super();
    this.full = false;
    /**
     * Toggle size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    this.value = "";
    this.label = "";
    this.name = "";
    this._checked = false;
    this._disabled = false;
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      label: { type: String },
      checked: { type: Boolean, reflect: true },
      value: { type: String },
      size: { type: String },
      full: { type: Boolean },
      name: { type: String },
      disabled: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(disabled) {
    if (disabled === this._disabled) return;
    this._disabled = disabled;
    if (disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("disabled", "");
    } else {
      this.setAttribute("tabindex", "0");
      this.removeAttribute("disabled");
    }
  }

  get formElement() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return;
    if (this._checked === checked) return;

    this._checked = checked;

    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));

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

  render() {
    return html`
      <slot
        name="box"
        part="box"
        role="checkbox"
        aria-disabled=${this.disabled}
        aria-labelledby="toggle"
        aria-label=${ifDefined(this.label)}
        aria-checked=${this.checked}
      >
        <slot part="on" name="on"></slot>
        <slot part="indicator" name="indicator"></slot>
        <slot part="off" name="off"></slot>
      </slot>
      <span id="toggle" part="label"><slot>${this.label}</slot></span>
    `;
  }
}

export default Toggle;
