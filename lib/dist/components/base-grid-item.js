import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{display:block;width:100%;max-width:100%;grid-column-end:span var(--base-grid-ce,1);grid-row-end:span var(--base-grid-re,1);-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-bottom:0;box-sizing:border-box;padding:0}:host:first-of-type{margin-top:unset}:host([sm="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([sm="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([sm="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([sm="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([sm="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([sm="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([sm="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([sm="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([sm="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([sm="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([sm="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([sm="12"]){display:block;max-width:100%;--base-grid-ce:12}@media(min-width:800px){:host([md="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([md="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([md="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([md="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([md="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([md="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([md="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([md="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([md="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([md="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([md="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([md="12"]){display:block;max-width:100%;--base-grid-ce:12}}@media(min-width:1200px){:host([lg="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([lg="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([lg="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([lg="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([lg="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([lg="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([lg="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([lg="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([lg="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([lg="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([lg="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([lg="12"]){display:block;max-width:100%;--base-grid-ce:12}}@media(min-width:1400px){:host([xl="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([xl="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([xl="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([xl="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([xl="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([xl="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([xl="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([xl="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([xl="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([xl="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([xl="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([xl="12"]){display:block;max-width:100%;--base-grid-ce:12}}`;

class BaseGridItem extends LitElement {
  constructor() {
    super();
    this.sm = "";
    this.md = "";
    this.lg = "";
    this.xl = "";
  }

  static get properties() {
    return {
      sm: {
        type: String
      },
      md: {
        type: String
      },
      lg: {
        type: String
      },
      xl: {
        type: String
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

if (!customElements.get("base-grid-item")) {
  customElements.define("base-grid-item", BaseGridItem);
}

export default BaseGridItem;
