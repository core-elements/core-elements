import { LitElement, html } from "lit-element";
import styles from "./list-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-list-item
 **/

class ListItem extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "list");
    const isSelectable = this.parentNode.hasAttribute("select");
    if (isSelectable) {
      this.setAttribute("tabindex", "1");
      this.setAttribute("selectable", "");
    }
  }

  render() {
    return html`
      <div part="start">
        <slot name="start"></slot>
      </div>
      <span part="content">
        <slot></slot>
      </span>
      <div part="end">
        <slot name="end"></slot>
      </div>
    `;
  }
}

export default ListItem;
