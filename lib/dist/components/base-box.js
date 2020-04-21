import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{display:block}:host([inline]){display:inline-block}:host([depth=none]){box-shadow:var(--base-depth-none)}:host([depth=xs]){box-shadow:var(--base-depth-xs)}:host([depth=sm]){box-shadow:var(--base-depth-sm)}:host([depth=md]){box-shadow:var(--base-depth-md)}:host([depth=lg]){box-shadow:var(--base-depth-lg)}:host([depth=xl]){box-shadow:var(--base-depth-xl)}:host([padding=none]){padding:var(--base-space-none)}:host([padding=xs]){padding:var(--base-space-xs)}:host([padding=sm]){padding:var(--base-space-sm)}:host([padding=md]){padding:var(--base-space-md)}:host([padding=lg]){padding:var(--base-space-lg)}:host([padding=xl]){padding:var(--base-space-xl)}:host([padding-x=none]){padding-left:var(--base-space-none);padding-right:var(--base-space-none)}:host([padding-x=xs]){padding-left:var(--base-space-xs);padding-right:var(--base-space-xs)}:host([padding-x=sm]){padding-left:var(--base-space-sm);padding-right:var(--base-space-sm)}:host([padding-x=md]){padding-left:var(--base-space-md);padding-right:var(--base-space-md)}:host([padding-x=lg]){padding-left:var(--base-space-lg);padding-right:var(--base-space-lg)}:host([padding-x=xl]){padding-left:var(--base-space-xl);padding-right:var(--base-space-xl)}:host([padding-y=none]){padding-top:var(--base-space-none);padding-bottom:var(--base-space-none)}:host([padding-y=xs]){padding-top:var(--base-space-xs);padding-bottom:var(--base-space-xs)}:host([padding-y=sm]){padding-top:var(--base-space-sm);padding-bottom:var(--base-space-sm)}:host([padding-y=md]){padding-top:var(--base-space-md);padding-bottom:var(--base-space-md)}:host([padding-y=lg]){padding-top:var(--base-space-lg);padding-bottom:var(--base-space-lg)}:host([padding-y=xl]){padding-top:var(--base-space-xl);padding-bottom:var(--base-space-xl)}:host([margin=none]){margin:var(--base-space-none)}:host([margin=xs]){margin:var(--base-space-xs)}:host([margin=sm]){margin:var(--base-space-sm)}:host([margin=md]){margin:var(--base-space-md)}:host([margin=lg]){margin:var(--base-space-lg)}:host([margin=xl]){margin:var(--base-space-xl)}:host([margin-x=none]){margin-left:var(--base-space-none);margin-right:var(--base-space-none)}:host([margin-x=xs]){margin-left:var(--base-space-xs);margin-right:var(--base-space-xs)}:host([margin-x=sm]){margin-left:var(--base-space-sm);margin-right:var(--base-space-sm)}:host([margin-x=md]){margin-left:var(--base-space-md);margin-right:var(--base-space-md)}:host([margin-x=lg]){margin-left:var(--base-space-lg);margin-right:var(--base-space-lg)}:host([margin-x=xl]){margin-left:var(--base-space-xl);margin-right:var(--base-space-xl)}:host([margin-y=none]){margin-top:var(--base-space-none);margin-bottom:var(--base-space-none)}:host([margin-y=xs]){margin-top:var(--base-space-xs);margin-bottom:var(--base-space-xs)}:host([margin-y=sm]){margin-top:var(--base-space-sm);margin-bottom:var(--base-space-sm)}:host([margin-y=md]){margin-top:var(--base-space-md);margin-bottom:var(--base-space-md)}:host([margin-y=lg]){margin-top:var(--base-space-lg);margin-bottom:var(--base-space-lg)}:host([margin-y=xl]){margin-top:var(--base-space-xl);margin-bottom:var(--base-space-xl)}:host([radius=none]){border-radius:var(--base-border-radius-none)}:host([radius=xs]){border-radius:var(--base-border-radius-xs)}:host([radius=sm]){border-radius:var(--base-border-radius-sm)}:host([radius=md]){border-radius:var(--base-border-radius-md)}:host([radius=lg]){border-radius:var(--base-border-radius-lg)}:host([radius=xl]){border-radius:var(--base-border-radius-xl)}`;

class BaseBox extends LitElement {
  constructor() {
    super();
    /**
     * Box border radius
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.radius = "";
    /**
     * Box depth
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.depth = "";
    /**
     * Full box
     * @type {Boolean}
     * @attr
     */

    this.inline = false;
    /**
     * Box padding
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.padding = "";
    /**
     * Box padding horistonal
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.paddingX = "";
    /**
     * Box padding vertical
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.paddingY = "";
    /**
     * Box margin
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.margin = "";
    /**
     * Box padding vertical
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.marginX = "";
    /**
     * Box padding vertical
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.marginY = "";
  }

  static get properties() {
    return {
      depth: {
        type: String
      },
      radius: {
        type: String
      },
      padding: {
        type: String
      },
      paddingX: {
        type: String,
        attribute: "padding-x"
      },
      paddingY: {
        type: String,
        attribute: "padding-y"
      },
      margin: {
        type: String
      },
      marginX: {
        type: String,
        attribute: "margin-x"
      },
      marginY: {
        type: String,
        attribute: "margin-y"
      },
      inline: {
        type: Boolean
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
