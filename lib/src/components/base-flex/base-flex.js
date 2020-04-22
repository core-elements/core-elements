import { LitElement, html } from "lit-element";
import styles from "./base-flex.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseFlex extends LitElement {
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
      j: { type: String, attribute: "justify" },
      a: { type: String, attribute: "align" },
      d: { type: String, attribute: "direction" },
      wrap: { type: Boolean },
      sJ: { type: String, attribute: "sm-justify" },
      sA: { type: String, attribute: "sm-align" },
      sD: { type: String, attribute: "sm-direction" },
      sWrap: { type: Boolean, attribute: "sm-wrap" },
      mJ: { type: String, attribute: "md-justify" },
      mA: { type: String, attribute: "md-align" },
      mD: { type: String, attribute: "md-direction" },
      mWrap: { type: Boolean, attribute: "m-wrap" },
      lJ: { type: String, attribute: "lg-justify" },
      lA: { type: String, attribute: "lg-align" },
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

if (!customElements.get("base-flex")) {
  customElements.define("base-flex", BaseFlex);
}

export default BaseFlex;
