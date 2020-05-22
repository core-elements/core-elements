import { LitElement, html, css } from "lit-element";
import styles from "./overlay.css";
import sharedStyles from "../../shared/sharedStyles.css";

class Overlay extends LitElement {
  constructor() {
    super();
    this.full = false;
    this.positionX = "";
    this.positionY = "";
    this.hoverable = false;
    this._open = false;
    this.toggle = this.toggle.bind(this);
    this._handleDown = this._handleDown.bind(this);
  }

  static get properties() {
    return {
      full: { type: Boolean, reflect: true },
      positionX: { type: String, reflect: true, attribute: "position-x" },
      positionY: { type: String, reflect: true, attribute: "position-y" },
      hoverable: { type: Boolean, reflect: true },
      open: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this._handleDown);
  }

  _handleDown(e) {
    const inside = this.querySelector('[slot="content"]').contains(e.target);
    const isTrigger = this.querySelector('[slot="trigger"]') === e.target;

    if (!inside && !isTrigger) {
      this.open = false;
    }
  }

  get open() {
    return this._open;
  }

  set open(val) {
    if (val === this._open) return;
    if (val) {
      this.setAttribute("open", "");
      this.dispatchEvent(new CustomEvent("open"));
    } else {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close"));
    }
    this.dispatchEvent(new CustomEvent("toggle"));
    this._open = val;
  }

  toggle() {
    this.open = !this.open;
  }

  render() {
    return html`<slot @click=${this.toggle} part="trigger" name="trigger"></slot
      ><slot part="content" name="content"></slot>`;
  }
}

export default Overlay;
