import { LitElement, html } from "lit-element";
import styles from "./flex.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-flex
 **/
class Flex extends LitElement {
  constructor() {
    super();

    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */
    this.j = "";

    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */
    this.a = "";

    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */
    this.d = "";

    this.wrap = false;

    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */
    this.sJ = "";

    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */
    this.sA = "";
    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */
    this.sD = "";

    this.sWrap = false;

    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */
    this.mJ = "";

    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */
    this.mA = "";

    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */
    this.mD = "";

    this.mWrap = false;

    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */
    this.lJ = "";

    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */
    this.lA = "";

    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */
    this.lD = "";

    this.lWrap = false;
  }

  static get properties() {
    return {
      j: { type: String, attribute: "justify-content" },
      a: { type: String, attribute: "align-items" },
      d: { type: String, attribute: "direction" },
      wrap: { type: Boolean },
      sJ: { type: String, attribute: "sm-justify-content" },
      sA: { type: String, attribute: "sm-align-items" },
      sD: { type: String, attribute: "sm-direction" },
      sWrap: { type: Boolean, attribute: "sm-wrap" },
      mJ: { type: String, attribute: "md-justify-content" },
      mA: { type: String, attribute: "md-align-items" },
      mD: { type: String, attribute: "md-direction" },
      mWrap: { type: Boolean, attribute: "m-wrap" },
      lJ: { type: String, attribute: "lg-justify-content" },
      lA: { type: String, attribute: "lg-align-items" },
      lD: { type: String, attribute: "lg-direction" },
      lWrap: { type: Boolean, attribute: "lg-wrap" },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }
}

export default Flex;
