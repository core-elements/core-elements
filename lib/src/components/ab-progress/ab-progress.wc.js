import { LitElement, html } from "lit-element";
import styles from "./ab-progress.css";
import classnames from "../../utils/classnames";

class Progress extends LitElement {
  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.type = "";
    this.size = "";
    this.border = "";
    this.shape = "";
  }

  static get properties() {
    return {
      value: { type: Number },
      max: { type: Number },
      type: { type: String },
      size: { type: String },
      border: { type: String },
      shape: { type: String }
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    const classes = classnames({
      "ab-progress": true,
      "ab-progress--bar": this.shape === "bar",
      [`ab-progress--${this.type}`]: this.type ? true : false,
      [`ab-progress--${this.size}`]: this.size ? true : false,
      [`ab-progress--border-${this.border}`]: this.size ? true : false
    });

    return html`
      <progress class=${classes} max=${this.max} value=${this.value}></progress>
    `;
  }
}

if (!customElements.get("ab-progress")) {
  customElements.define("ab-progress", Progress);
}

export default Progress;
