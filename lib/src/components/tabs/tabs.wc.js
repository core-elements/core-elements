import { LitElement, html } from "lit-element";
import styles from "./tabs.css";
import sharedStyles from "../../shared/sharedstyles.css";

function getTabValue(tab) {
  return tab.value || tab.getAttribute("value") || tab.innerText;
}

class Tabs extends LitElement {
  constructor() {
    super();
    this.position = "";
    this._value = "";
    this._handleClick = this._handleClick.bind(this);
    this._initTabDisplays = this._initTabDisplays.bind(this);
  }

  static get properties() {
    return {
      value: { type: String, reflect: "true" },
      position: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._initTabDisplays();
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
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
    this.value = getTabValue(e.target);
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

    const newSelectedTab = this.tabElements.find(
      (tab) => getTabValue(tab) === val
    );

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
