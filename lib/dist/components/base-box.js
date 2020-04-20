import { c as css, L as LitElement, h as html } from './lit-element-6bb3323a.js';
import { s as sharedStyles } from './sharedstyles-fd1d7228.js';

var styles = css`:host{display:inline-block}:host([full]){display:block;width:100%}:host([depth=none]){box-shadow:0 0}:host([depth=sm]){box-shadow:var(--base-depth-sm)}:host([depth=md]){box-shadow:var(--base-depth-md)}:host([depth=lg]){box-shadow:var(--base-depth-lg)}:host([padding=none]){padding:0}:host([padding=sm]){padding:var(--base-space-sm)}:host([padding=md]){padding:var(--base-space-md)}:host([padding=lg]){padding:var(--base-space-lg)}:host([margin=none]){margin:0}:host([margin=sm]){margin:var(--base-space-sm)}:host([margin=md]){margin:var(--base-space-md)}:host([margin=lg]){margin:var(--base-space-lg)}:host([radius=none]){border-radius:0}:host([radius=sm]){border-radius:var(--base-border-radius-sm)}:host([radius=md]){border-radius:var(--base-border-radius-md)}:host([radius=lg]){border-radius:var(--base-border-radius-lg)}`;

class BaseBox extends LitElement {
  constructor() {
    super();
    /**
     * Box border radius
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.radius = "sm";
    /**
     * Box depth
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.depth = "sm";
    /**
     * Full box
     * @type {Boolean}
     * @attr
     */

    this.full = false;
    /**
     * Box padding
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.padding = "sm";
    /**
     * Box margin
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.margin = "";
  }

  static get properties() {
    return {
      depth: {
        type: String,
        reflect: true
      },
      radius: {
        type: String,
        reflect: true
      },
      padding: {
        type: String,
        reflect: true
      },
      margin: {
        type: String,
        reflect: true
      },
      full: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

}

if (!customElements.get("base-box")) {
  customElements.define("base-box", BaseBox);
}

export default BaseBox;
