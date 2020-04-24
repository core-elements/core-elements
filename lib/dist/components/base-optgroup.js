import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{display:block}:host [part=label]{display:-webkit-box;display:flex;height:var(--base-size-sm);-webkit-box-align:center;align-items:center;font-weight:400;color:var(--base-color-font);padding:var(--base-space-xs);text-transform:uppercase;font-size:var(--base-font-size-xs)}:host [part=list]{list-style:none;padding:0;margin:0}::slotted([slot=prepend]){margin-right:var(--base-space-sm)}`;

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
