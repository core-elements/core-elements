import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;overflow-x:scroll}:host([full]){display:-webkit-box;display:flex;width:100%}:host([position=left]){-webkit-box-pack:start;justify-content:flex-start}:host([position=center]){-webkit-box-pack:center;justify-content:center}:host([position=right]){-webkit-box-pack:end;justify-content:flex-end}`;

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
      value: {
        type: String,
        reflect: "true"
      },
      position: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this._initTabDisplays();

    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        this._handleClick(e);
      }
    });
  }

  _initTabDisplays() {
    this.tabElements.forEach(tab => {
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
    return this.tabElements.find(tab => tab.hasAttribute("selected"));
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (this._value === val) return;
    const oldSelectedTab = this.selectedTab;
    const newSelectedTab = this.tabElements.find(tab => getTabValue(tab) === val);

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

var styles$1 = css`:host{--core-tab-box-shadow:0 0;white-space:nowrap;cursor:default;display:-webkit-inline-box;display:inline-flex}:host([full]){display:-webkit-box;display:flex;width:100%}:host([disabled]){opacity:.5}:host{border:0;color:var(--core-color-font-light);font-size:var(--core-font-size-sm);background:0;box-shadow:var(--core-tab-box-shadow);outline:0;padding:0 var(--core-space-sm);margin-right:var(--core-space-sm);height:var(--core-size-sm);border-bottom:2px solid transparent}:host(:focus),:host(:hover){border-bottom:2px solid var(--core-color-ui-light)}:host(:focus),:host([selected]){color:var(--core-color-font-dark)}:host([selected]){border-bottom:2px solid var(--core-color-focus)}`;

class Tab extends LitElement {
  constructor() {
    super();
    this.selected = false;
    this.target = "";
    this.disabled = false;
    this._value = "";
    this.hash = "";
  }

  static get properties() {
    return {
      hash: {
        type: String
      },
      target: {
        type: String
      },
      selected: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value || this.innerText || this.textContent;
  }

  static get styles() {
    return [styles$1, sharedStyles];
  }

  render() {
    return html` <slot></slot>`;
  }

}

export { Tab, Tabs };
