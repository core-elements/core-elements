import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{display:-webkit-box;display:flex}:host([wrap]){flex-wrap:wrap}:host([justify=between]){-webkit-box-pack:justify;justify-content:space-between}:host([justify=around]){justify-content:space-around}:host([justify=center]){-webkit-box-pack:center;justify-content:center}:host([justify=start]){-webkit-box-pack:start;justify-content:flex-start}:host([justify=end]){-webkit-box-pack:end;justify-content:flex-end}:host([align=center]){-webkit-box-align:center;align-items:center}:host([align=start]){-webkit-box-align:start;align-items:flex-start}:host([align=end]){-webkit-box-align:end;align-items:flex-end}:host([direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}@media(min-width:600px){:host([sm-wrap]){flex-wrap:wrap}:host([sm-justify=between]){-webkit-box-pack:justify;justify-content:space-between}:host([sm-justify=around]){justify-content:space-around}:host([sm-justify=center]){-webkit-box-pack:center;justify-content:center}:host([sm-justify=start]){-webkit-box-pack:start;justify-content:flex-start}:host([sm-justify=end]){-webkit-box-pack:end;justify-content:flex-end}:host([sm-align=center]){-webkit-box-align:center;align-items:center}:host([sm-align=start]){-webkit-box-align:start;align-items:flex-start}:host([sm-align=end]){-webkit-box-align:end;align-items:flex-end}:host([sm-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([sm-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([sm-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([sm-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}@media(min-width:1280px){:host([md-wrap]){flex-wrap:wrap}:host([md-justify=between]){-webkit-box-pack:justify;justify-content:space-between}:host([md-justify=around]){justify-content:space-around}:host([md-justify=center]){-webkit-box-pack:center;justify-content:center}:host([md-justify=start]){-webkit-box-pack:start;justify-content:flex-start}:host([md-justify=end]){-webkit-box-pack:end;justify-content:flex-end}:host([md-align=center]){-webkit-box-align:center;align-items:center}:host([md-align=start]){-webkit-box-align:start;align-items:flex-start}:host([md-align=end]){-webkit-box-align:end;align-items:flex-end}:host([md-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([md-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([md-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([md-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}@media(min-width:1400px){:host([lg-wrap]){flex-wrap:wrap}:host([lg-justify=between]){-webkit-box-pack:justify;justify-content:space-between}:host([lg-justify=around]){justify-content:space-around}:host([lg-justify=center]){-webkit-box-pack:center;justify-content:center}:host([lg-justify=start]){-webkit-box-pack:start;justify-content:flex-start}:host([lg-justify=end]){-webkit-box-pack:end;justify-content:flex-end}:host([lg-align=center]){-webkit-box-align:center;align-items:center}:host([lg-align=start]){-webkit-box-align:start;align-items:flex-start}:host([lg-align=end]){-webkit-box-align:end;align-items:flex-end}:host([lg-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([lg-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([lg-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([lg-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}`;

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
      j: {
        type: String,
        attribute: "justify"
      },
      a: {
        type: String,
        attribute: "align"
      },
      d: {
        type: String,
        attribute: "direction"
      },
      wrap: {
        type: Boolean
      },
      sJ: {
        type: String,
        attribute: "sm-justify"
      },
      sA: {
        type: String,
        attribute: "sm-align"
      },
      sD: {
        type: String,
        attribute: "sm-direction"
      },
      sWrap: {
        type: Boolean,
        attribute: "sm-wrap"
      },
      mJ: {
        type: String,
        attribute: "md-justify"
      },
      mA: {
        type: String,
        attribute: "md-align"
      },
      mD: {
        type: String,
        attribute: "md-direction"
      },
      mWrap: {
        type: Boolean,
        attribute: "m-wrap"
      },
      lJ: {
        type: String,
        attribute: "lg-justify"
      },
      lA: {
        type: String,
        attribute: "lg-align"
      },
      lD: {
        type: String,
        attribute: "lg-direction"
      },
      lWrap: {
        type: Boolean,
        attribute: "lg-wrap"
      }
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
