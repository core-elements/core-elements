import { LitElement, html } from "lit-element";
import styles from "./accordion.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-accordion
 **/

class Accordion extends LitElement {
  constructor() {
    super();
    this.mode = "";
    this.size = "";
  }

  static get properties() {
    return {
      size: { type: String, reflect: true },
      mode: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot> `;
  }
}

export default Accordion;
