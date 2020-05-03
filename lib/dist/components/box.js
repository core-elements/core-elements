import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{vertical-align:middle;display:block;width:100%}:host([inline]){display:inline-block;width:auto}:host([clickable]){cursor:pointer;-webkit-transition:all .2s ease;transition:all .2s ease}:host([clickable]:hover){-webkit-transform:translateY(-2px);transform:translateY(-2px)}:host([clickable]:active){-webkit-transform:translateY(0);transform:translateY(0)}:host([bg=primary]){background-color:var(--core-color-primary)}:host([bg=secondary]){background-color:var(--core-color-secondary)}:host([bg=success]){background-color:var(--core-color-success)}:host([bg=danger]){background-color:var(--core-color-danger)}:host([bg=ui-light]){background-color:var(--core-color-ui-light)}:host([bg=ui-lighter]){background-color:var(--core-color-ui-lighter)}:host([bg=ui-lightest]){background-color:var(--core-color-ui-lightest)}:host([bg=ui-dark]){background-color:var(--core-color-ui-dark)}:host([bg=white]){background-color:var(--core-color-white)}:host([bg=black]){background-color:var(--core-color-black)}:host([border=primary]){border:1px solid var(--core-color-primary)}:host([border=secondary]){border:1px solid var(--core-color-secondary)}:host([border=success]){border:1px solid var(--core-color-success)}:host([border=danger]){border:1px solid var(--core-color-danger)}:host([border=ui-light]){border:1px solid var(--core-color-ui-light)}:host([border=ui-lighter]){border:1px solid var(--core-color-ui-lighter)}:host([border=ui-lightest]){border:1px solid var(--core-color-ui-lightest)}:host([border=ui-dark]){border:1px solid var(--core-color-ui-dark)}:host([border=white]){border:1px solid var(--core-color-white)}:host([border=black]){border:1px solid var(--core-color-black)}:host([depth=none]){box-shadow:var(--core-depth-none)}:host([depth=xs]){box-shadow:var(--core-depth-xs)}:host([depth=sm]){box-shadow:var(--core-depth-sm)}:host([depth=md]){box-shadow:var(--core-depth-md)}:host([depth=lg]){box-shadow:var(--core-depth-lg)}:host([depth=xl]){box-shadow:var(--core-depth-xl)}:host([padding=none]){padding:var(--core-space-none)}:host([padding=xs]){padding:var(--core-space-xs)}:host([padding=sm]){padding:var(--core-space-sm)}:host([padding=md]){padding:var(--core-space-md)}:host([padding=lg]){padding:var(--core-space-lg)}:host([padding=xl]){padding:var(--core-space-xl)}:host([padding-x=none]){padding-left:var(--core-space-none);padding-right:var(--core-space-none)}:host([padding-x=xs]){padding-left:var(--core-space-xs);padding-right:var(--core-space-xs)}:host([padding-x=sm]){padding-left:var(--core-space-sm);padding-right:var(--core-space-sm)}:host([padding-x=md]){padding-left:var(--core-space-md);padding-right:var(--core-space-md)}:host([padding-x=lg]){padding-left:var(--core-space-lg);padding-right:var(--core-space-lg)}:host([padding-x=xl]){padding-left:var(--core-space-xl);padding-right:var(--core-space-xl)}:host([padding-y=none]){padding-top:var(--core-space-none);padding-bottom:var(--core-space-none)}:host([padding-y=xs]){padding-top:var(--core-space-xs);padding-bottom:var(--core-space-xs)}:host([padding-y=sm]){padding-top:var(--core-space-sm);padding-bottom:var(--core-space-sm)}:host([padding-y=md]){padding-top:var(--core-space-md);padding-bottom:var(--core-space-md)}:host([padding-y=lg]){padding-top:var(--core-space-lg);padding-bottom:var(--core-space-lg)}:host([padding-y=xl]){padding-top:var(--core-space-xl);padding-bottom:var(--core-space-xl)}:host([margin=none]){margin:var(--core-space-none)}:host([margin=xs]){margin:var(--core-space-xs)}:host([margin=sm]){margin:var(--core-space-sm)}:host([margin=md]){margin:var(--core-space-md)}:host([margin=lg]){margin:var(--core-space-lg)}:host([margin=xl]){margin:var(--core-space-xl)}:host([margin-x=none]){margin-left:var(--core-space-none);margin-right:var(--core-space-none)}:host([margin-x=xs]){margin-left:var(--core-space-xs);margin-right:var(--core-space-xs)}:host([margin-x=sm]){margin-left:var(--core-space-sm);margin-right:var(--core-space-sm)}:host([margin-x=md]){margin-left:var(--core-space-md);margin-right:var(--core-space-md)}:host([margin-x=lg]){margin-left:var(--core-space-lg);margin-right:var(--core-space-lg)}:host([margin-x=xl]){margin-left:var(--core-space-xl);margin-right:var(--core-space-xl)}:host([margin-y=none]){margin-top:var(--core-space-none);margin-bottom:var(--core-space-none)}:host([margin-y=xs]){margin-top:var(--core-space-xs);margin-bottom:var(--core-space-xs)}:host([margin-y=sm]){margin-top:var(--core-space-sm);margin-bottom:var(--core-space-sm)}:host([margin-y=md]){margin-top:var(--core-space-md);margin-bottom:var(--core-space-md)}:host([margin-y=lg]){margin-top:var(--core-space-lg);margin-bottom:var(--core-space-lg)}:host([margin-y=xl]){margin-top:var(--core-space-xl);margin-bottom:var(--core-space-xl)}:host([radius=none]){border-radius:var(--core-border-radius-none)}:host([radius=xs]){border-radius:var(--core-border-radius-xs)}:host([radius=sm]){border-radius:var(--core-border-radius-sm)}:host([radius=md]){border-radius:var(--core-border-radius-md)}:host([radius=lg]){border-radius:var(--core-border-radius-lg)}:host([radius=xl]){border-radius:var(--core-border-radius-xl)}`;

class Box extends LitElement {
  constructor() {
    super();
    /**
     * Box background color
     * @type {"primary"|"secondary"|"success"|"danger"}
     * @attr
     */

    this.bg = "";
    /**
     * Box border
     * @type {"primary"|"secondary"|"success"|"danger"}
     * @attr
     */

    this.border = "";
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
    this.clickable = false;
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
      border: {
        type: String
      },
      bg: {
        type: String
      },
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
      },
      clickable: {
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

export { Box };
