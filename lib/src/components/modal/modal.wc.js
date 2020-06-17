import { LitElement, html } from "lit-element";
import styles from "./modal.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-modal
 **/
class Modal extends LitElement {
  constructor() {
    super();
    this.title = "";
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    this.toggle = this.toggle.bind(this);
    this._open = false;
  }

  static get properties() {
    return {
      title: { type: String },
      open: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = "visible";
  }

  get showHeader() {
    return (
      this.querySelector("[slot='header']") ||
      this.querySelector("[slot='header-start']") ||
      this.querySelector("[slot='header-middle']") ||
      this.querySelector("[slot='header-end']") ||
      this.title
    );
  }

  get showFooter() {
    return this.querySelector("[slot='footer']");
  }

  get open() {
    return this._open;
  }

  set open(open) {
    if (open === this._open) return;

    this._open = open;

    if (open) {
      document.body.style.overflow = "hidden";
      this.setAttribute("open", "");
      this.dispatchEvent(new CustomEvent("open"));
    } else {
      document.body.style.overflow = "visible";
      this.removeAttribute("open");
      this.dispatchEvent(new CustomEvent("close"));
    }
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  close() {
    this.open = false;
  }

  show() {
    this.open = true;
  }

  toggle(e) {
    this.open = !this.open;
  }

  render() {
    return html`
      <slot @click=${this.close} part="backdrop" name="backdrop"></slot>
      <div slot="modal" part="modal">
        ${this.showHeader
          ? html` <slot part="header" name="header">
              <slot part="header-start" name="header-start"></slot>
              <slot part="header-middle" name="header-middle"
                >${this.title}</slot
              >
              <slot part="header-end" name="header-end">
                <slot part="close" @click=${this.close} name="close"
                  >&#10005;</slot
                >
              </slot>
            </slot>`
          : null}
        <div part="content"><slot></slot></div>
        ${this.showFooter
          ? html`<slot part="footer" name="footer"></slot>`
          : null}
      </div>
    `;
  }
}

export default Modal;
