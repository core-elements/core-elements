import { LitElement, html } from "lit-element";
import styles from "./list.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-list
 **/

class List extends LitElement {
  constructor() {
    super();
    this.selectable = false;
    this.bordered = false;
  }

  static get properties() {
    return {
      bordered: { type: Boolean },
      selectable: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "list");
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default List;
