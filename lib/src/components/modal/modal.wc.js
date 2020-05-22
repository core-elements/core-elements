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
        <slot part="header" name="header">
          <slot part="title" name="title">${this.title}</slot>
          <slot part="close-button" name="close-button" @click=${this.close}>
            &#10005;
          </slot>
        </slot>
        <div part="content"><slot></slot></div>
        <slot part="footer" name="footer"></slot>
      </div>
    `;
  }
}

export default Modal;
