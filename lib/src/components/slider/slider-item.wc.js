import { LitElement, html } from "lit-element";
import styles from "./slider-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-slider-item
 **/

class SliderItem extends LitElement {
  constructor() {
    super();
    this.name = "";
  }

  static get properties() {
    return {
      name: {
        type: String,
        reflect: true,
      },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default SliderItem;
