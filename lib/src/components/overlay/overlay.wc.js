import { LitElement, html, css } from "lit-element";
import styles from "./overlay.css";
import sharedStyles from "../../shared/sharedStyles.css";

class Overlay extends LitElement {
  constructor() {
    super();
    /**
     * Full width
     * @type {Boolean}
     * @attr
     */
    this.full = false;
    /**
     * Overlay horisontal position
     * @type {"left"|"center"|"right"}
     * @attr
     */
    this.positionX = "";
    /**
     * Overlay vertical position
     * @type {"top"|"center"|"bottom"}
     * @attr
     */
    this.positionY = "";
    /**
     * Show overlay on hover
     * @type {Boolean}
     * @attr
     */
    this.hoverable = false;
    /**
     * Show overlay
     * @type {Boolean}
     * @attr
     */
    this._open = false;
    /**
     * Toggle overlay
     * @type {Function}
     * @attr
     */
    this.toggle = this.toggle.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  static get properties() {
    return {
      full: { type: Boolean, reflect: true },
      positionX: { type: String, reflect: true, attribute: "position-x" },
      positionY: { type: String, reflect: true, attribute: "position-y" },
      hoverable: { type: Boolean, reflect: true },
      open: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    // Stop from bubbling up to docuemnt
    //  so handleDown fires both on toggle and element click
    this.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", (e) => {
      // Enter
      if (e.keyCode === 13) {
        this.toggle();
      }
      // Space
      if (e.keyCode === 32) {
        e.preventDefault();
        this.toggle();
      }
      // Esc
      if (e.keyCode === 27) {
        e.preventDefault();
        this.open = false;
      }
    });
  }

  _handleClick(e) {
    const inside = this.querySelector('[slot="content"]').contains(e.target);
    const isTrigger = this.querySelector('[slot="trigger"]').contains(e.target);

    if (!inside && !isTrigger) {
      this.open = false;
    }
  }

  get open() {
    return this._open;
  }

  set open(val) {
    if (this._open === val) {
      return;
    }
    if (val) {
      this.setAttribute("open", "");
      this.dispatchEvent(new CustomEvent("open"));
    } else {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close"));
    }
    this._open = val;
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  toggle() {
    this.open = !this.open;
  }

  render() {
    return html`<slot part="trigger" name="trigger" @click=${this.toggle}></slot
      ><slot part="content" name="content"></slot>`;
  }
}

export default Overlay;
