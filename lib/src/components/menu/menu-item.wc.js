import { LitElement, html } from "lit-element";
import styles from "./menu-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-menu-item
 **/

class MenuItem extends LitElement {
  constructor() {
    super();
    this._observeSlotChanges = this._observeSlotChanges.bind(this);
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this._observeSlotChanges();
    this.setAttribute("role", "menuitem");
    this.setAttribute("tabindex", "1");
    this.addEventListener("keydown", (e) => {
      // Enter
      if (e.keyCode === 13) {
        this.dispatchEvent(new CustomEvent("click", { bubbles: true }));
      }
      // Space
      if (e.keyCode === 32) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("click", { bubbles: true }));
      }
      // Down
      if (e.keyCode === 40) {
        e.preventDefault();
        if (this.nextElementSibling) {
          this.nextElementSibling.focus();
        } else if (this.previousElementSibling) {
          this.previousElementSibling.focus();
        }
      }
      // Down
      if (e.keyCode === 38) {
        e.preventDefault();
        if (this.previousElementSibling) {
          this.previousElementSibling.focus();
        } else if (this.nextElementSibling) {
          this.nextElementSibling.focus();
        }
      }
    });
  }

  get showListStart() {
    return this.querySelector("[slot='start']");
  }

  get showListEnd() {
    return this.querySelector("[slot='end']");
  }

  _observeSlotChanges() {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.requestUpdate();
      });
    });
    observer.observe(this, {
      childList: true,
      subtree: true,
    });
  }

  render() {
    return html`
      ${this.showListStart
        ? html`<slot part="start" name="start"></slot>`
        : null}
      <span part="content">
        <slot></slot>
      </span>
      ${this.showListEnd ? html`<slot part="end" name="end"></slot>` : null}
    `;
  }
}

export default MenuItem;
