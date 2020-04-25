import { L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';
import { s as styles } from './base-tab-121da457.js';

function getTabValue(tab) {
  return tab.value || tab.getAttribute("value") || tab.innerText;
}

class BaseTabs extends LitElement {
  constructor() {
    super();
    this._value = "";
    this._handleClick = this._handleClick.bind(this);
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._handleClick);
  }

  _handleClick(e) {
    this.value = getTabValue(e.target);
  }

  get tabElements() {
    return [...this.children];
  }

  get selectedTab() {
    return this.tabElements.find(tab => tab.hasAttribute("selected"));
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;

    if (this.selectedTab) {
      this.selectedTab.removeAttribute("selected");
    }

    const newSelectedTab = this.tabElements.find(tab => getTabValue(tab) === val);

    if (newSelectedTab) {
      newSelectedTab.setAttribute("selected", "");
    }

    this.dispatchEvent(new CustomEvent("change"));
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  render() {
    return html`<slot></slot>`;
  }

}

if (!customElements.get("base-tabs")) {
  customElements.define("base-tabs", BaseTabs);
}

export default BaseTabs;
