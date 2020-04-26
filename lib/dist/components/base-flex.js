import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{width:100%;display:-webkit-box;display:flex}:host([wrap]){flex-wrap:wrap}:host([justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([justify-content=around]){justify-content:space-around}:host([justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([align-items=center]){-webkit-box-align:center;align-items:center}:host([align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}@media(min-width:600px){:host([sm-wrap]){flex-wrap:wrap}:host([sm-justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([sm-justify-content=around]){justify-content:space-around}:host([sm-justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([sm-justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([sm-justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([sm-align-items=center]){-webkit-box-align:center;align-items:center}:host([sm-align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([sm-align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([sm-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([sm-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([sm-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([sm-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}@media(min-width:1280px){:host([md-wrap]){flex-wrap:wrap}:host([md-justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([md-justify-content=around]){justify-content:space-around}:host([md-justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([md-justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([md-justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([md-align-items=center]){-webkit-box-align:center;align-items:center}:host([md-align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([md-align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([md-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([md-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([md-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([md-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}@media(min-width:1400px){:host([lg-wrap]){flex-wrap:wrap}:host([lg-justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([lg-justify-content=around]){justify-content:space-around}:host([lg-justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([lg-justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([lg-justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([lg-align-items=center]){-webkit-box-align:center;align-items:center}:host([lg-align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([lg-align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([lg-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([lg-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([lg-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([lg-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}`;

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
        attribute: "justify-content"
      },
      a: {
        type: String,
        attribute: "align-items"
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
        attribute: "sm-justify-content"
      },
      sA: {
        type: String,
        attribute: "sm-align-items"
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
        attribute: "md-justify-content"
      },
      mA: {
        type: String,
        attribute: "md-align-items"
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
        attribute: "lg-justify-content"
      },
      lA: {
        type: String,
        attribute: "lg-align-items"
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
