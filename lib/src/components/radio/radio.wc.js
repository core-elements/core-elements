import { html } from "lit-element";
import RadioMixin  from '../../mixins/RadioMixin';
import styles from "./radio.css";
import sharedStyles from "../../shared/sharedstyles.css";
import { ifDefined } from "lit-html/directives/if-defined.js";

/**
 * @element core-radio
 * @cssprop --box-shadow
 * @cssprop --cursor
 * @cssprop --height
 * @cssprop --box-border-color
 * @cssprop --box-border-width
 * @cssprop --box-border-style
 * @cssprop --box-background-color
 * @cssprop --box-border-radius
 * @cssprop --box-size
 * @cssprop --indicator-color
 * @cssprop --indicator-size
 * @cssprop --indicator-border-radius
 * @cssprop --label-font-size
 **/
class Radio extends RadioMixin {
  constructor() {
    super();
    this.size = "";
    this.full = false;
  }

  static get properties() {
    return {
      full: { type: Boolean, reflect: true },
      size: { type: String, reflect: true },
    };
  }


  connectedCallback() {
    super.connectedCallback();
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html`
      <slot
        role="radio"
        aria-disabled=${this.disabled}
        aria-labelledby="radio"
        aria-label=${ifDefined(this.label)}
        aria-checked=${this.checked}
        part="box"
        name="box"
      >
        <slot name="indicator" part="indicator"><span></span></slot>
      </slot>
      ${this.hasLabel
        ? html`<span id="radio" part="label">
            ${this.label ? this.label : html`<slot></slot>`}
          </span>`
        : null}
    `;
  }
}

export default Radio;
