import { c as css, L as LitElement, h as html } from './lit-element-7a30dcec.js';

var styles = css`.base-optgroup{display:block}.base-optgroup__label{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;font-weight:500;color:var(--base-color-ui-600);padding:var(--base-spacing-200);text-transform:uppercase;font-size:var(--base-heading-100)}.base-optgroup__icon{margin-right:var(--base-spacing-100)}.base-optgroup__option-list{list-style:none;padding:0;margin:0}`;

class BaseOptGroup extends LitElement {
  constructor() {
    super();
    this.label = "";
    this.icon = "";
  }

  static get properties() {
    return {
      label: {
        type: String
      },
      icon: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="base-optgroup">
        <div class="base-optgroup__label">
          ${this.icon ? html`
                <span class="base-optgroup__icon">
                  <base-icon name=${this.icon} size="small"></base-icon>
                </span>
              ` : null}
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
