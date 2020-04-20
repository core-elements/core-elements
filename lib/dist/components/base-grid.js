import { c as css, L as LitElement, h as html } from './lit-element-6bb3323a.js';
import { s as sharedStyles } from './sharedstyles-fd1d7228.js';

var styles = css`:host{--base-grid-gutter:var(--base-space-md);box-sizing:border-box;display:grid;grid-template-columns:repeat(12,1fr);grid-row-gap:var(--base-grid-gutter);grid-column-gap:var(--base-grid-gutter);margin:0}:host([gutter=none]){--base-grid-gutter:0}:host([gutter=sm]){--base-grid-gutter:var(--base-space-sm)}:host([gutter=md]){--base-grid-gutter:var(--base-space-md)}:host([gutter=lg]){--base-grid-gutter:var(--base-space-lg)}`;

class BaseGrid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gutter
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.gutter = "sm";
  }

  static get properties() {
    return {
      gutter: {
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
