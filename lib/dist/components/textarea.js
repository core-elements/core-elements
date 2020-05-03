import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{display:inline-block}:host([full]),:host([full]) textarea{display:block;width:100%}:host textarea{box-sizing:border-box;display:inline-block;outline:0;font-size:var(--core-font-size-sm);font-family:var(--core-font-family);color:var(--core-color-black);background-color:var(--core-color-white);padding:var(--core-space-md);border:2px solid var(--core-color-ui-lighter)}:host textarea:hover{border-color:var(--core-color-ui-light);background-color:var(--core-color-ui-lighter)}:host textarea:focus{border-color:var(--core-color-focus);background-color:var(--core-color-white)}`;

class TextArea extends LitElement {
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

export { TextArea };
