import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{display:inline-block}:host([full]),:host([full]) textarea{display:block;width:100%}:host textarea{box-sizing:border-box;display:inline-block;outline:0;font-size:var(--base-font-size-sm);font-family:var(--base-font-family);color:var(--base-color-black);background-color:var(--base-color-white);padding:var(--base-space-md);border:2px solid var(--base-color-ui-lighter)}:host textarea:hover{border-color:var(--base-color-ui-light);background-color:var(--base-color-ui-lighter)}:host textarea:focus{border-color:var(--base-color-focus);background-color:var(--base-color-white)}`;

class BaseTextArea extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      full: {
        type: Boolean
      },
      cols: {
        type: String
      },
      rows: {
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
    return html`<textarea part="input-field"></textarea>`;
  }

}

if (!customElements.get("base-textarea")) {
  customElements.define("base-textarea", BaseTextArea);
}

export default BaseTextArea;