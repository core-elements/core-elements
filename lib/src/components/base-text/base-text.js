import { LitElement, html } from "lit-element";
import styles from "./base-text.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseText extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"}
     * @attr
     */
    this.tag = "";
    this.type = "p";
    this.weight = "";
  }

  static get properties() {
    return {
      tag: { type: String },
      type: { type: String },
      weight: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    if (this.tag || this.type) {
      switch (this.tag || this.type) {
        case "h1":
          return html`<h1><slot></slot></h1>`;
        case "h2":
          return html`<h2><slot></slot></h2>`;
        case "h3":
          return html`<h3><slot></slot></h3>`;
        case "h4":
          return html`<h4><slot></slot></h4>`;
        case "h5":
          return html`<h5><slot></slot></h5>`;
        case "h6":
          return html`<h6><slot></slot></h6>`;
        case "p":
          return html`<p><slot></slot></p>`;
        case "small":
          return html`<small><slot></slot></small>`;
        case "b":
          return html`<b><slot></slot></b>`;
        case "i":
          return html`<i><slot></slot></i>`;
        case "span":
          return html`<span><slot></slot></span>`;
        case "div":
          return html`<div><slot></slot></div>`;
        case "lead":
          return html`<p><slot></slot></p>`;
        default:
          return html`<p><slot></slot></p>`;
      }
    }
  }
}

if (!customElements.get("base-text")) {
  customElements.define("base-text", BaseText);
}

export default BaseText;
