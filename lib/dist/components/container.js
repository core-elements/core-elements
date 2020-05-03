import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{width:100%;max-width:var(--core-container);display:block}:host([center]){margin:0 auto}:host([size=xs]){max-width:var(--core-container-xs)}:host([size=sm]){max-width:var(--core-container-sm)}:host([size=md]){max-width:var(--core-container-md)}:host([size=lg]){max-width:var(--core-container-lg)}:host([size=xl]){max-width:var(--core-container-xl)}`;

class Container extends LitElement {
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

export { Container };
