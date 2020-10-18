import { html, LitElement } from "lit-element";
import  CheckboxMixin from '../../mixins/CheckboxMixin';
import { ifDefined } from "lit-html/directives/if-defined.js";
import styles from "./checkbox.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-checkbox
 * @cssprop --height
 * @cssprop --box-background
 * @cssprop --box-border-width
 * @cssprop --box-border-color
 * @cssprop --box-border-style
 * @cssprop --box-cursor
 * @cssprop --box-box-shadow
 * @cssprop --box-size
 * @cssprop --box-border-radius
 * @cssprop --indicator-color
 * @cssprop --indicator-font-size
 * @cssprop --label-font-size
 * @cssprop --label-color
 * @cssprop --label-display
 **/

class Checkbox extends CheckboxMixin {

  constructor() {
    super();
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html`
      <slot
        name="box"
        aria-disabled=${this.disabled}
        aria-labelledby="checkbox"
        aria-label=${ifDefined(this.label)}
        aria-checked=${this.checked}
        role="checkbox"
        part="box"
      >
        <slot name="indicator" part="indicator">&#10003;</slot>
      </slot>
      ${this.hasLabel
        ? html`<span id="checkbox" part="label">
            ${this.label ? this.label : html`<slot></slot>`}
          </span>`
        : null}
    `;
  }
}

export default Checkbox;
