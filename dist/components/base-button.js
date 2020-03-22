import { c as css, L as LitElement, h as html } from './lit-element-c5717db0.js';

var styles = css`:host{--base-button-padding:10px 15px;--base-button-background:var(--base-color-neutral-1,#dcdcdc);--base-button-border:0;--base-button-border-radius:0;--base-button-font-size:16px;--base-button-outline-color:var(--base-color-focus,#2684ff);--base-button-outline:0 0 0 2px var(--base-button-outline-color);--base-button-text-color:inherit}:host,button{display:inline-block}button{outline:0;color:var(--base-button-text-color);cursor:pointer;border-radius:var(--base-button-border-radius);font-size:var(--base-button-font-size);padding:var(--base-button-padding);background:var(--base-button-background);border:var(--base-button-border);-webkit-transition:all .2s ease;transition:all .2s ease}button:hover{--base-button-background:var(--base-color-neutral-2,#d3d3d3)}button:focus{box-shadow:var(--base-button-outline)}:host([type=primary]) button{--base-button-background:var(--base-color-primary,#000);--base-button-text-color:var(--base-color-neutral-0,#fff)}:host([type=secondary]) button{--base-button-background:var(--base-color-neutral-3,#696969);--base-button-text-color:var(--base-color-neutral-0,#fff)}:host([type=transparent]) button{--base-button-background:transparent}:host([type=success]) button{--base-button-background:var(--base-color-success,#3cb371);--base-button-text-color:var(--base-color-neutral-0,#fff)}:host([type=danger]) button{--base-button-background:var(--base-color-danger,#ff4500);--base-button-text-color:var(--base-color-neutral-0,#fff)}:host([style=outline]) button{--base-button-border:2px solid var(--base-button-background);color:var(--base-button-background);background:none !important}:host([style=outline]):not([type]){color:#000}`;

class BaseButton extends LitElement {
  constructor() {
    super();
    this.type = "";
    this.style = "";
  }

  static get properties() {
    return {
      type: {
        type: String
      },
      style: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <button><slot></slot></button>
    `;
  }

}

if (!customElements.get("base-button")) {
  customElements.define("base-button", BaseButton);
}

export default BaseButton;
