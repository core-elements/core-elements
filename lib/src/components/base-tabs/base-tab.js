import { LitElement, html } from "lit-element";
import styles from "./base-tab.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseTab extends LitElement {
  constructor() {
    super();
    this.selected = false;
    this.target = "";
    this.disabled = false;
    this._value = "";
    this.hash = "";
  }

  static get properties() {
    return {
      hash: { type: String },
      target: { type: String },
      selected: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      value: { type: String },
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
    return html` <slot></slot>`;
  }
}

export default BaseTab;
