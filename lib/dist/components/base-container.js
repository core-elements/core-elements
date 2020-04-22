import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host{max-width:var(--base-container);display:block}:host([center]){margin:0 auto}:host([size=xs]){max-width:var(--base-container-xs)}:host([size=sm]){max-width:var(--base-container-sm)}:host([size=md]){max-width:var(--base-container-md)}:host([size=lg]){max-width:var(--base-container-lg)}:host([size=xl]){max-width:var(--base-container-xl)}`;

class BaseContainer extends LitElement {
  constructor() {
    super();
    /**
     * Center  container
     * @type {Boolean}
     * @attr
     */

    this.center;
    /**
     * Width of container
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.size;
  }

  static get properties() {
    return {
      center: {
        type: Boolean
      },
      size: {
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
    return html`<slot></slot>`;
  }

}

if (!customElements.get("base-container")) {
  customElements.define("base-container", BaseContainer);
}

export default BaseContainer;
