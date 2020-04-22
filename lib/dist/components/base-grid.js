import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{--base-grid-columns:12;--base-grid-gutter:var(--base-space-md);box-sizing:border-box;display:grid;grid-template-columns:repeat(var(--base-grid-columns),1fr);grid-row-gap:var(--base-grid-gutter);grid-column-gap:var(--base-grid-gutter);margin:0}:host([gutter=sm]){--base-grid-gutter:var(--base-space-sm)}:host([gutter=md]){--base-grid-gutter:var(--base-space-md)}:host([gutter=lg]){--base-grid-gutter:var(--base-space-lg)}:host([gutter=xl]){--base-grid-gutter:var(--base-space-xl)}:host([gutter-sm=sm]){--base-grid-gutter:var(--base-space-sm)}:host([gutter-sm=md]){--base-grid-gutter:var(--base-space-md)}:host([gutter-sm=lg]){--base-grid-gutter:var(--base-space-lg)}:host([gutter-sm=xl]){--base-grid-gutter:var(--base-space-xl)}@media(min-width:800px){:host([gutter-md=sm]){--base-grid-gutter:var(--base-space-sm)}:host([gutter-md=md]){--base-grid-gutter:var(--base-space-md)}:host([gutter-md=lg]){--base-grid-gutter:var(--base-space-lg)}:host([gutter-md=xl]){--base-grid-gutter:var(--base-space-xl)}}@media(min-width:1200px){:host([gutter-lg=sm]){--base-grid-gutter:var(--base-space-sm)}:host([gutter-lg=md]){--base-grid-gutter:var(--base-space-md)}:host([gutter-lg=lg]){--base-grid-gutter:var(--base-space-lg)}:host([gutter-lg=xl]){--base-grid-gutter:var(--base-space-xl)}}@media(min-width:1400px){:host([gutter-xl=sm]){--base-grid-gutter:var(--base-space-sm)}:host([gutter-xl=md]){--base-grid-gutter:var(--base-space-md)}:host([gutter-xl=lg]){--base-grid-gutter:var(--base-space-lg)}:host([gutter-xl=xl]){--base-grid-gutter:var(--base-space-xl)}}:host([columns="1"]){--base-grid-columns:1}:host([columns="2"]){--base-grid-columns:2}:host([columns="3"]){--base-grid-columns:3}:host([columns="4"]){--base-grid-columns:4}:host([columns="5"]){--base-grid-columns:5}:host([columns="6"]){--base-grid-columns:6}:host([columns="7"]){--base-grid-columns:7}:host([columns="8"]){--base-grid-columns:8}:host([columns="9"]){--base-grid-columns:9}:host([columns="10"]){--base-grid-columns:10}:host([columns="11"]){--base-grid-columns:11}:host([columns="12"]){--base-grid-columns:12}`;

class BaseGrid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gutter = "sm";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gutterSm = "";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gutterMd = "";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gutterLg = "";
    /**
     * Grid gutter
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gutterXl = "";
    this.columns = "12";
  }

  static get properties() {
    return {
      gutter: {
        type: String
      },
      gutterSm: {
        type: String
      },
      gutterMd: {
        type: String
      },
      gutterLg: {
        type: String
      },
      gutterXl: {
        type: String
      },
      columns: {
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

if (!customElements.get("base-grid")) {
  customElements.define("base-grid", BaseGrid);
}

export default BaseGrid;
