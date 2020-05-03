import { LitElement, html } from "lit-element";
import styles from "./textarea.css";
import sharedStyles from "../../shared/sharedstyles.css";

class TextArea extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      full: { type: Boolean },
      cols: { type: String },
      rows: { type: String },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<textarea part="input-field"></textarea>`;
  }
}

export default TextArea;
