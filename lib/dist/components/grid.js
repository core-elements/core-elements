import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{--core-grid-columns:12;--core-grid-gap:var(--core-space-md);box-sizing:border-box;display:grid;grid-template-columns:repeat(var(--core-grid-columns),1fr);grid-row-gap:var(--core-grid-gap);grid-column-gap:var(--core-grid-gap);margin:0;width:100%;max-width:100%}:host([gap=sm]){--core-grid-gap:var(--core-space-sm)}:host([gap=md]){--core-grid-gap:var(--core-space-md)}:host([gap=lg]){--core-grid-gap:var(--core-space-lg)}:host([gap=xl]){--core-grid-gap:var(--core-space-xl)}:host([gap-sm=sm]){--core-grid-gap:var(--core-space-sm)}:host([gap-sm=md]){--core-grid-gap:var(--core-space-md)}:host([gap-sm=lg]){--core-grid-gap:var(--core-space-lg)}:host([gap-sm=xl]){--core-grid-gap:var(--core-space-xl)}@media(min-width:800px){:host([gap-md=sm]){--core-grid-gap:var(--core-space-sm)}:host([gap-md=md]){--core-grid-gap:var(--core-space-md)}:host([gap-md=lg]){--core-grid-gap:var(--core-space-lg)}:host([gap-md=xl]){--core-grid-gap:var(--core-space-xl)}}@media(min-width:1200px){:host([gap-lg=sm]){--core-grid-gap:var(--core-space-sm)}:host([gap-lg=md]){--core-grid-gap:var(--core-space-md)}:host([gap-lg=lg]){--core-grid-gap:var(--core-space-lg)}:host([gap-lg=xl]){--core-grid-gap:var(--core-space-xl)}}@media(min-width:1400px){:host([gap-xl=sm]){--core-grid-gap:var(--core-space-sm)}:host([gap-xl=md]){--core-grid-gap:var(--core-space-md)}:host([gap-xl=lg]){--core-grid-gap:var(--core-space-lg)}:host([gap-xl=xl]){--core-grid-gap:var(--core-space-xl)}}:host([columns="1"]){--core-grid-columns:1}:host([columns="2"]){--core-grid-columns:2}:host([columns="3"]){--core-grid-columns:3}:host([columns="4"]){--core-grid-columns:4}:host([columns="5"]){--core-grid-columns:5}:host([columns="6"]){--core-grid-columns:6}:host([columns="7"]){--core-grid-columns:7}:host([columns="8"]){--core-grid-columns:8}:host([columns="9"]){--core-grid-columns:9}:host([columns="10"]){--core-grid-columns:10}:host([columns="11"]){--core-grid-columns:11}:host([columns="12"]){--core-grid-columns:12}`;

class Grid extends LitElement {
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

var styles$1 = css`:host{display:block;width:100%;max-width:100%;grid-column-end:span var(--core-grid-ce,1);grid-row-end:span var(--core-grid-re,1);-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-bottom:0;box-sizing:border-box;padding:0}:host:first-of-type{margin-top:unset}:host([sm="1"]){display:block;max-width:100%;--core-grid-ce:1}:host([sm="2"]){display:block;max-width:100%;--core-grid-ce:2}:host([sm="3"]){display:block;max-width:100%;--core-grid-ce:3}:host([sm="4"]){display:block;max-width:100%;--core-grid-ce:4}:host([sm="5"]){display:block;max-width:100%;--core-grid-ce:5}:host([sm="6"]){display:block;max-width:100%;--core-grid-ce:6}:host([sm="7"]){display:block;max-width:100%;--core-grid-ce:7}:host([sm="8"]){display:block;max-width:100%;--core-grid-ce:8}:host([sm="9"]){display:block;max-width:100%;--core-grid-ce:9}:host([sm="10"]){display:block;max-width:100%;--core-grid-ce:10}:host([sm="11"]){display:block;max-width:100%;--core-grid-ce:11}:host([sm="12"]){display:block;max-width:100%;--core-grid-ce:12}@media(min-width:800px){:host([md="1"]){display:block;max-width:100%;--core-grid-ce:1}:host([md="2"]){display:block;max-width:100%;--core-grid-ce:2}:host([md="3"]){display:block;max-width:100%;--core-grid-ce:3}:host([md="4"]){display:block;max-width:100%;--core-grid-ce:4}:host([md="5"]){display:block;max-width:100%;--core-grid-ce:5}:host([md="6"]){display:block;max-width:100%;--core-grid-ce:6}:host([md="7"]){display:block;max-width:100%;--core-grid-ce:7}:host([md="8"]){display:block;max-width:100%;--core-grid-ce:8}:host([md="9"]){display:block;max-width:100%;--core-grid-ce:9}:host([md="10"]){display:block;max-width:100%;--core-grid-ce:10}:host([md="11"]){display:block;max-width:100%;--core-grid-ce:11}:host([md="12"]){display:block;max-width:100%;--core-grid-ce:12}}@media(min-width:1200px){:host([lg="1"]){display:block;max-width:100%;--core-grid-ce:1}:host([lg="2"]){display:block;max-width:100%;--core-grid-ce:2}:host([lg="3"]){display:block;max-width:100%;--core-grid-ce:3}:host([lg="4"]){display:block;max-width:100%;--core-grid-ce:4}:host([lg="5"]){display:block;max-width:100%;--core-grid-ce:5}:host([lg="6"]){display:block;max-width:100%;--core-grid-ce:6}:host([lg="7"]){display:block;max-width:100%;--core-grid-ce:7}:host([lg="8"]){display:block;max-width:100%;--core-grid-ce:8}:host([lg="9"]){display:block;max-width:100%;--core-grid-ce:9}:host([lg="10"]){display:block;max-width:100%;--core-grid-ce:10}:host([lg="11"]){display:block;max-width:100%;--core-grid-ce:11}:host([lg="12"]){display:block;max-width:100%;--core-grid-ce:12}}@media(min-width:1400px){:host([xl="1"]){display:block;max-width:100%;--core-grid-ce:1}:host([xl="2"]){display:block;max-width:100%;--core-grid-ce:2}:host([xl="3"]){display:block;max-width:100%;--core-grid-ce:3}:host([xl="4"]){display:block;max-width:100%;--core-grid-ce:4}:host([xl="5"]){display:block;max-width:100%;--core-grid-ce:5}:host([xl="6"]){display:block;max-width:100%;--core-grid-ce:6}:host([xl="7"]){display:block;max-width:100%;--core-grid-ce:7}:host([xl="8"]){display:block;max-width:100%;--core-grid-ce:8}:host([xl="9"]){display:block;max-width:100%;--core-grid-ce:9}:host([xl="10"]){display:block;max-width:100%;--core-grid-ce:10}:host([xl="11"]){display:block;max-width:100%;--core-grid-ce:11}:host([xl="12"]){display:block;max-width:100%;--core-grid-ce:12}}`;

class GridItem extends LitElement {
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
    return [styles$1, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }

}

export { Grid, GridItem };
