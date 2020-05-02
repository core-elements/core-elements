import { LitElement, html } from "lit-element";
import styles from "./base-label.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseLabel extends LitElement {
  constructor() {
    super();
    this.for = "";
  }

  static get properties() {
    return {
      for: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html` <label for=${this.for}><slot></slot></label> `;
  }
}

export default BaseLabel;
