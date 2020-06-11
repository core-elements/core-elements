import { LitElement, html } from "lit-element";
import styles from "./list-item.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-list-item
 **/

class ListItem extends LitElement {
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
    this.setAttribute("role", "list");
    const isSelectable = this.parentNode.hasAttribute("select");
    if (isSelectable) {
      this.setAttribute("tabindex", "1");
      this.setAttribute("selectable", "");
    }
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

export default ListItem;
