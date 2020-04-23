import { LitElement, html } from "lit-element";
import styles from "./base-box.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseBox extends LitElement {
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
      border: { type: String },
      bg: { type: String },
      depth: { type: String },
      radius: { type: String },
      padding: { type: String },
      paddingX: { type: String, attribute: "padding-x" },
      paddingY: { type: String, attribute: "padding-y" },
      margin: { type: String },
      marginX: { type: String, attribute: "margin-x" },
      marginY: { type: String, attribute: "margin-y" },
      inline: { type: Boolean },
      clickable: { type: Boolean },
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
