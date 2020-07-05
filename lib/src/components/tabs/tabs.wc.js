import { LitElement, html } from "lit-element";
import styles from "./tabs.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-tabs
 **/

class Tabs extends LitElement {
  constructor() {
    super();
    this._value = "";
    this.size = "";
    this.vertical = false;
    this._handleClick = this._handleClick.bind(this);
    this._initTabDisplays = this._initTabDisplays.bind(this);
  }

  static get properties() {
    return {
      value: { type: String, reflect: true },
      size: { type: String, reflect: true },
      vertical: { type: Boolean, relfect: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._initTabDisplays();
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", (e) => {
      // Enter
      if (e.keyCode === 13) {
        this._handleClick(e);
      }
      // Space
      if (e.keyCode === 32) {
        e.preventDefault();
        this._handleClick(e);
      }
    });
  }

  _initTabDisplays() {
    this.tabElements.forEach((tab) => {
      const isSelected = tab.hasAttribute("selected");
      const targetVal = tab.getAttribute("target");
      if (targetVal && !isSelected) {
        const node = document.getElementById(targetVal);
        if (node) node.style.display = "none";
      }
    });
  }

  _handleClick(e) {
    this.value = e.target.value;
  }

  get tabElements() {
    return [...this.children];
  }

  get selectedTab() {
    return this.tabElements.find((tab) => tab.hasAttribute("selected"));
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (this._value === val) return;

    const oldSelectedTab = this.selectedTab;

    const newSelectedTab = this.tabElements.find((tab) => tab.value === val);

    if (newSelectedTab && !newSelectedTab.hasAttribute("disabled")) {
      if (oldSelectedTab) {
        const oldTarget = oldSelectedTab.getAttribute("target");
        if (oldTarget) {
          const oldTargetEl = document.getElementById(oldTarget);
          if (oldTargetEl) oldTargetEl.style.display = "none";
        }
        oldSelectedTab.removeAttribute("selected");
      }

      newSelectedTab.setAttribute("selected", "");

      this.setAttribute("value", val);
      this._value = val;

      const newTarget = newSelectedTab.getAttribute("target");

      if (newTarget) {
        const newTargetEl = document.getElementById(newTarget);
        if (newTargetEl) newTargetEl.style.display = "";
      }

      this.dispatchEvent(new CustomEvent("change"));
    }
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default Tabs;
