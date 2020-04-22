import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css``;

class BaseText extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"}
     * @attr
     */

    this.tag = "";
  }

  static get properties() {
    return {
      tag: {
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
    return html` <${this.tag}><slot></slot></${this.tag}> `;
  }

}

if (!customElements.get("base-text")) {
  customElements.define("base-text", BaseText);
}

export default BaseText;
