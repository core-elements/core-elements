import { LitElement, html, css } from "lit-element";
import styles from "./dropdown.css";
import sharedStyles from "../../shared/sharedStyles.css";

class Dropdown extends LitElement {
  constructor() {
    super();
    this.full = false;
    this.position = "";
    this._open = false;
    this.hoverable = false;
    this.handleDown = this.handleDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("mousedown", this.handleDown);
  }

  handleDown(e) {
    const open = this.open;
    const inside = this.contains(e.target);
    setTimeout(() => {
      const openHasChanged = open !== this.open;
      if (openHasChanged) return;
      if (!inside && open) {
        this.open = false;
      }
    }, 10);
  }

  static get styles() {
    return [styles, sharedStyles];
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

  static get properties() {
    return {
      full: { type: Boolean, reflect: true },
      position: { type: String, reflect: true },
      hoverable: { type: Boolean, reflect: true },
      open: { type: Boolean, reflect: true },
    };
  }

  render() {
    return html`<slot></slot> `;
  }
}

export default Dropdown;
