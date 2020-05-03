import { LitElement, html } from "lit-element";
import styles from "./label.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-label
 **/
class Label extends LitElement {
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

export default Label;
