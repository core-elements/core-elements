import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{--base-grid-columns:12;--base-grid-gap:var(--base-space-md);box-sizing:border-box;display:grid;grid-template-columns:repeat(var(--base-grid-columns),1fr);grid-row-gap:var(--base-grid-gap);grid-column-gap:var(--base-grid-gap);margin:0;width:100%;max-width:100%}:host([gap=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap=md]){--base-grid-gap:var(--base-space-md)}:host([gap=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap=xl]){--base-grid-gap:var(--base-space-xl)}:host([gap-sm=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-sm=md]){--base-grid-gap:var(--base-space-md)}:host([gap-sm=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-sm=xl]){--base-grid-gap:var(--base-space-xl)}@media(min-width:800px){:host([gap-md=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-md=md]){--base-grid-gap:var(--base-space-md)}:host([gap-md=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-md=xl]){--base-grid-gap:var(--base-space-xl)}}@media(min-width:1200px){:host([gap-lg=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-lg=md]){--base-grid-gap:var(--base-space-md)}:host([gap-lg=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-lg=xl]){--base-grid-gap:var(--base-space-xl)}}@media(min-width:1400px){:host([gap-xl=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-xl=md]){--base-grid-gap:var(--base-space-md)}:host([gap-xl=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-xl=xl]){--base-grid-gap:var(--base-space-xl)}}:host([columns="1"]){--base-grid-columns:1}:host([columns="2"]){--base-grid-columns:2}:host([columns="3"]){--base-grid-columns:3}:host([columns="4"]){--base-grid-columns:4}:host([columns="5"]){--base-grid-columns:5}:host([columns="6"]){--base-grid-columns:6}:host([columns="7"]){--base-grid-columns:7}:host([columns="8"]){--base-grid-columns:8}:host([columns="9"]){--base-grid-columns:9}:host([columns="10"]){--base-grid-columns:10}:host([columns="11"]){--base-grid-columns:11}:host([columns="12"]){--base-grid-columns:12}`;

class BaseGrid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gap = "sm";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapSm = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapMd = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapLg = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapXl = "";
    this.columns = "12";
  }

  static get properties() {
    return {
      gap: {
        type: String
      },
      gapSm: {
        type: String
      },
      gapMd: {
        type: String
      },
      gapLg: {
        type: String
      },
      gapXl: {
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
