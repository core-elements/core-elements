import { LitElement, html } from "lit-element";
import styles from "./base-optgroup.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseOptGroup extends LitElement {
  constructor() {
    super();
    this.label = "";
    this.icon = "";
  }

  static get properties() {
    return {
      label: { type: String },
      icon: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html`
      <span part="label">
        <slot name="prepend"></slot>
        ${this.label}
      </span>
      <div part="list">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get("base-optgroup")) {
  customElements.define("base-optgroup", BaseOptGroup);
}

export default BaseOptGroup;
