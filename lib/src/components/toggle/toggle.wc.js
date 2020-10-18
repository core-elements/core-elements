import { html } from "lit-element";
import CheckboxMixin from '../../mixins/CheckboxMixin';
import { ifDefined } from "lit-html/directives/if-defined.js";
import styles from "./toggle.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-toggle
 **/
class Toggle extends CheckboxMixin {

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
