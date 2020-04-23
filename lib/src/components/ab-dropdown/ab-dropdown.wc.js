import { LitElement, html, css } from "lit-element";
import classnames from "../../utils/classnames";
import styles from "./ab-dropdown.css";

class Dropdown extends LitElement {
  constructor() {
    super();
    this.full = false;
    this.left = false;
    this.top = false;
    this.open = false;
    this.hoverable = false;
  }

  static get properties() {
    return {
      full: { type: Boolean, reflect: true },
      left: { type: Boolean },
      top: { type: Boolean },
      hoverable: { type: Boolean },
      open: { type: Boolean }
    };
  }

  static get styles() {
    return [
      styles,
      css`
        :host {
          display: inline-block;
        }
        :host([full]) {
          display: block;
          width: 100%;
        }
      `
    ];
  }

  render() {
    const classes = classnames({
      "ab-dropdown": true,
      "ab-dropdown--full": this.full,
      "ab-dropdown--left": this.left,
      "ab-dropdown--top": this.top,
      "ab-dropdown--open": this.open,
      "ab-dropdown--hoverable": this.hoverable
    });

    return html`
      <div class="${classes}">
        <slot></slot>
        <slot name="menu" class="ab-dropdown__menu"></slot>
      </div>
    `;
  }
}

if (!customElements.get("ab-dropdown")) {
  customElements.define("ab-dropdown", Dropdown);
}

export default Dropdown;
