import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{display:block;width:100%;margin-bottom:var(--base-space-sm)}`;

class BaseLabel extends LitElement {
  constructor() {
    super();
    this.for = "";
  }

  static get properties() {
    return {
      for: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html` <label for=${this.for}><slot></slot></label> `;
  }

}

if (!customElements.get("base-label")) {
  customElements.define("base-label", BaseLabel);
}

export default BaseLabel;
