import { LitElement, html } from "lit-element";
import styles from "./slider.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-slider
 **/

class Slider extends LitElement {
  static get properties() {
    return {
      autoHeight: { type: Boolean },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get sliderSlot() {
    return this.shadowRoot.querySelector('[part="slider"]');
  }

  get sliderItems() {
    // remove text nodes
    return [...this.childNodes].filter((node) => node.nodeType !== 3);
  }

  render() {
    return html`<slot part="slider"></slot>`;
  }
}

export default Slider;
