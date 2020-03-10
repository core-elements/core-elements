import { LitElement, html } from "lit-element";
import styles from "./base-optgroup.css";

class BaseOptGroup extends LitElement {
  constructor() {
    super();
    this.label = "";
    this.icon = "";
  }

  static get properties() {
    return {
      label: { type: String },
      icon: { type: String }
    };
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="base-optgroup">
        <div class="base-optgroup__label">
          ${this.icon
            ? html`
                <span class="base-optgroup__icon">
                  <base-icon name=${this.icon} size="small"></base-icon>
                </span>
              `
            : null}
          <span>${this.label}</span>
        </div>
        <div class="base-optgroup__option-list">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("base-optgroup")) {
  customElements.define("base-optgroup", BaseOptGroup);
}

export default BaseOptGroup;
