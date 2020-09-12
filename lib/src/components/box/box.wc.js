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
     * Text align
     * @type {"left"|"center"|"right"}
     * @attr
     */
    this.textAlign = "";

    /**
     * Box background image
     * @type {String}
     * @attr
     */
    this.bgSrc = "";

    /**
     * Box font color
     * @type {"primary"|"secondary"|"success"|"danger"}
     * @attr
     */
    this.color = "";

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
     * Overflow
     * @type {"hidden"}
     * @attr
     */
    this.overflow = "";

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
      overflow: { type: String },
      border: { type: String },
      color: { type: String },
      bg: { type: String },
      bgSrc: { type: String, attribute: "bg-src" },
      depth: { type: String },
      radius: { type: String },
      padding: { type: String, attribute: "p" },
      textAlign: { type: String, attribute: "text-align" },
      paddingX: { type: String, attribute: "px" },
      paddingY: { type: String, attribute: "py" },
      paddingL: { type: String, attribute: "pl" },
      paddingR: { type: String, attribute: "pr" },
      paddingT: { type: String, attribute: "pt" },
      paddingB: { type: String, attribute: "pb" },
      margin: { type: String, attribute: "m" },
      marginX: { type: String, attribute: "mx" },
      marginY: { type: String, attribute: "my" },
      marginL: { type: String, attribute: "ml" },
      marginR: { type: String, attribute: "mr" },
      marginT: { type: String, attribute: "mt" },
      marginB: { type: String, attribute: "mb" },
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

  set bgSrc(src) {
    if (src) {
      this.style.backgroundImage = `url(${src})`;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default Box;
