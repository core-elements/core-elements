import { LitElement, html } from "lit-element";
import styles from "./box.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-box
 **/
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
     * Box margin left
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.paddingL = "";

    /**
     * Box padding right
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.paddingR = "";

    /**
     * Box padding top
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.paddingT = "";

    /**
     * Box padding bottom
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.paddingB = "";

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

    /**
     * Box margin left
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.marginL = "";

    /**
     * Box margin right
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.marginR = "";

    /**
     * Box margin top
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.marginT = "";

    /**
     * Box margin bottom
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */
    this.marginB = "";
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
      paddingL: { type: String, attribute: "padding-l" },
      paddingR: { type: String, attribute: "padding-r" },
      paddingT: { type: String, attribute: "padding-t" },
      paddingB: { type: String, attribute: "padding-b" },
      margin: { type: String },
      marginX: { type: String, attribute: "margin-x" },
      marginY: { type: String, attribute: "margin-y" },
      marginL: { type: String, attribute: "margin-l" },
      marginR: { type: String, attribute: "margin-r" },
      marginT: { type: String, attribute: "margin-t" },
      marginB: { type: String, attribute: "margin-b" },
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

export default Box;
