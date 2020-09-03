import { LitElement, html } from "lit-element";
import styles from "./textarea.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-textarea
 **/
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

  createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<textarea part="input-field"></textarea>`;
  }
}

export default TextArea;
