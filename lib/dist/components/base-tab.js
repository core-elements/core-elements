import { L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';
import { s as styles } from './base-tab-12545e81.js';

class BaseTab extends LitElement {
  constructor() {
    super();
    this.selected = false;
    this.disabled = false;
    this._value = "";
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value || this.innerText || this.textContent;
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html` <button><slot></slot></button>`;
  }

}

if (!customElements.get("base-tab")) {
  customElements.define("base-tab", BaseTab);
}

export default BaseTab;
