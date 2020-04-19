import { LitElement, html } from "lit-element";
import styles from "./base-modal.css";
import sharedStyles from "../../shared/sharedstyles.css";

class BaseModal extends LitElement {
  constructor() {
    super();
    this.open = false;
    this.noBackdrop = false;
    this._onToggle = this._onToggle.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        reflect: true,
        hasChanged(newVal, oldVal) {
          if (newVal) {
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "visible";
          }
          return true;
        },
      },
      noBackdrop: { type: Boolean, reflect: true, attribute: "no-backdrop" },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  _onToggle(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("toggle", e));
  }

  close(e) {
    this.open = false;
    this._onToggle(e);
  }

  show(e) {
    this.open = true;
    this._onToggle(e);
  }

  toggle(e) {
    this.open = !this.open;
    this._onToggle(e);
  }

  render() {
    return html`
      <div part="backdrop" @click=${this.close}></div>
      <div part="box">
        <slot part="close-button" name="close-button" @click=${this.close}>
          &#10005;
        </slot>

        <slot part="header" name="header"></slot>

        <div part="content"><slot></slot></div>
      </div>
    `;
  }
}

if (!customElements.get("base-modal")) {
  customElements.define("base-modal", BaseModal);
}

export default BaseModal;
