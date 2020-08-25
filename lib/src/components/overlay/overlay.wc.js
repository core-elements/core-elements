import { LitElement, html, css } from "lit-element";
import styles from "./overlay.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-overlay
 **/

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
     * Close when overlay is clicked on
     * @type {Boolean}
     * @attr
     */
    this.closeOnClick = false;
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
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      closeOnClick: {
        type: Boolean,
        reflect: true,
        attribute: "close-on-click",
      },
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
    this.addEventListener("keydown", this._handleKeyDown);
    document.addEventListener("mousedown", this._handleClick);
    document.addEventListener("touchstart", this._handleClick);
  }

  get triggerEl() {
    return this.querySelector('[slot="trigger"]');
  }

  get contentEl() {
    return this.querySelector('[slot="content"]');
  }

  _handleClick(e) {
    const inside = this.contentEl.contains(e.target);
    const isTrigger = this.triggerEl.contains(e.target);

    if (inside && this.closeOnClick) {
      this.open = false;
    }

    if (isTrigger) {
      this.toggle();
    }

    if (!inside && !isTrigger) {
      this.open = false;
    }
  }

  _handleKeyDown(e) {
    const isTrigger = this.triggerEl.contains(e.target);
    // Enter
    if (e.keyCode === 13 && isTrigger) {
      this.toggle();
    }
    // Space
    if (e.keyCode === 32 && isTrigger) {
      e.preventDefault();
      this.toggle();
    }
    // Esc
    if (e.keyCode === 27) {
      e.preventDefault();
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
    if (this.hoverable) return;
    if (val) {
      this.setAttribute("open", "");
      this.dispatchEvent(new CustomEvent("open", { bubbles: true }));
    } else {
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    }
    this._open = val;
    this.dispatchEvent(new CustomEvent("toggle", { bubbles: true }));
  }

  toggle() {
    this.open = !this.open;
  }

  render() {
    return html`<slot part="trigger" name="trigger"></slot
      ><slot part="content" name="content"></slot>`;
  }
}

export default Overlay;
