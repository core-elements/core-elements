import { c as css, L as LitElement, h as html } from './lit-element-c5717db0.js';

var styles = css`:host{display:-webkit-box;display:flex;--base-button-border:10px}::slotted(base-button){color:#000;background:red !important;--base-button-border:10px}`;

class BaseButtonGroup extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}

if (!customElements.get("base-button-group")) {
  customElements.define("base-button-group", BaseButtonGroup);
}

export default BaseButtonGroup;
