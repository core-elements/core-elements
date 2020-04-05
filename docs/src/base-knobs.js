import { LitElement, html, css } from "lit-element";

class BaseKnobs extends LitElement {
  constructor() {
    super();
    this.src = "";
    this.name = "";
    this.tab = "props";
    this.hideProps = false;
    this.attributes = [];
    this.properties = [];
    this._fetchJson = this._fetchJson.bind(this);
    this._observeProps = this._observeProps.bind(this);
    this._handleAttrChange = this._handleAttrChange.bind(this);
    this._renderTabs = this._renderTabs.bind(this);
    this._renderSrcTab = this._renderSrcTab.bind(this);
    this._renderPropTab = this._renderPropTab.bind(this);
    this._propComponent = this._propComponent.bind(this);
  }

  static get properties() {
    return {
      tab: { type: String },
      src: { type: String },
      name: { type: String },
      attributes: { type: Array },
      properties: { type: Array },
      hideProps: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchJson();
    this._observeProps();
  }

  _observeProps() {
    var observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        this.requestUpdate();
      });
    });
    observer.observe(this.componentEl, { attributes: true });
  }

  get componentEl() {
    return this.children[0];
  }

  async _fetchJson() {
    try {
      const res = await fetch(this.src);
      const json = await res.json();
      const component = json.tags.find(tag => tag.name === this.name);
      this.properties = component.properties;
      this.attributes = component.attributes;
    } catch (e) {
      console.log("error", e);
    }
  }

  get srcHTML() {
    return this.innerHTML;
  }

  _getPropValue(attr) {
    if (attr.type.includes("|")) {
      return attr.type.split("|")[0];
    }
    if (attr.type === "boolean") {
      return this.componentEl.hasAttribute(attr.name);
    }
    if (attr.type === "string") {
      return this.componentEl[attr.name];
    }
    return null;
  }

  _handleAttrChange(e, attr) {
    if (attr.type.includes("|")) {
      console.log(e.target.value);
      this.componentEl.setAttribute(attr.name, e.target.value);
    }
    if (attr.type === "string") {
      this.componentEl.setAttribute(attr.name, e.target.value);
    }
    if (attr.type === "boolean") {
      if (e.target.checked) {
        this.componentEl.setAttribute(attr.name, "");
      } else {
        this.componentEl.removeAttribute(attr.name);
      }
    }
  }

  _handleTabChange(e) {
    this.tab = e.target.value;
  }

  _renderTabs() {
    if (this.tab === "props") return this._renderPropTab();
    if (this.tab === "src") return this._renderSrcTab();
  }

  _propComponent(attr) {
    if (attr.type.includes("|")) {
      const options = attr.type.replace(/"/g, "").split("|");

      return html`
        <div class="prop">
          <label>
            <select @change=${e => this._handleAttrChange(e, attr)}>
              ${options.map(opt => {
                return html`
                  <option
                    ?selected=${this.componentEl.getAttribute(attr.name) ===
                      opt}
                    value=${opt}
                    >${opt}</option
                  >
                `;
              })}
            </select>
          </label>
        </div>
      `;
    }

    if (attr.type === "string") {
      return html`
        <div class="prop">
          <label>
            <input
              name=${attr.name}
              .value=${this.componentEl[attr.name]}
              @input=${e => this._handleAttrChange(e, attr)}
              type="text"
            />
            ${attr.name}
          </label>
        </div>
      `;
    }

    if (attr.type === "boolean") {
      return html`
        <div class="prop">
          <label>
            <input
              name=${attr.name}
              ?checked=${this.componentEl.hasAttribute(attr.name)}
              .value=${this.componentEl[attr.name]}
              @input=${e => this._handleAttrChange(e, attr)}
              type="checkbox"
            />
            ${attr.name}
          </label>
        </div>
      `;
    }

    return null;
  }

  _renderPropTab() {
    return html`
      <div class="props">
        ${this.attributes.map(attr => {
          return this._propComponent(attr);
        })}
      </div>
    `;
  }

  _renderSrcTab() {
    return html`
      <div class="src">
        <h2>${this.srcHTML}</h2>
      </div>
    `;
  }

  render() {
    return html`
      <style>
        .prop {
          margin-top: 10px;
        }
        nav {
          margin-top: 20px;
          display: flex;
        }
        nav[vertical] {
          display: flex;
          flex-direction: column;
        }
        button {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          padding: 10px 15px;
          border: 1px solid #eee;
          cursor: pointer;
          border-radius: 4px;
          background: white;
        }
        button:hover:not([active]) {
          background: #eee;
        }
        button[active] {
          background: #34f;
          border: 1px solid #34f;
          color: white;
        }
        nav button:not(:first-of-type),
        nav button:not(:last-of-type) {
          border-radius: 0;
        }
        nav button:first-of-type {
          border-radius: 4px 0 0 4px;
        }
        nav button:last-of-type {
          border-radius: 0 4px 4px 0;
        }
        input[type="checkbox"]:checked,
        input[type="radio"]:checked {
          background-color: #34f;
          border-color: #34f;
          color: #fff;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
        }

        input[type="checkbox"]:checked:before,
        input[type="radio"]:checked:before {
          opacity: 1;
        }
        input[type="checkbox"],
        input[type="radio"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          color: #34f;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1px solid #e3e3e3;
          cursor: pointer;
          position: relative;
          background: #f1f2f4;
          vertical-align: middle;
        }
        input[type="radio"] {
          border-radius: 100%;
        }
        input[type="checkbox"]:before,
        input[type="radio"]:before {
          content: "";
          position: absolute;
          pointer-events: none;
          left: 50%;
          top: 50%;
          height: 5px;
          width: 10px;
          border-radius: 2px 0 2px 2px;
          border-bottom: 2px solid;
          border-left: 2px solid;
          transform: translate(-50%, calc(-50% - 1px)) rotate(-45deg);
          opacity: 0;
        }
        input[type="radio"]:before {
          border-radius: 100%;
          border: 0;
          width: 8px;
          height: 8px;
          transform: translate(-50%, -50%);
          background-color: currentColor;
        }
      </style>
      <slot></slot>
      <nav>
        ${this.hideProps
          ? html`
              <button
                ?active=${this.tab === "props"}
                value="props"
                @click=${this._handleTabChange}
              >
                Props
              </button>
            `
          : null}
        <button
          ?active=${this.tab === "src"}
          value="src"
          @click=${this._handleTabChange}
        >
          Src
        </button>
        <button
          ?active=${this.tab === "events"}
          value="events"
          @click=${this._handleTabChange}
        >
          Events
        </button>
      </nav>

      <div class="tabs">
        ${this._renderTabs()}
      </div>
    `;
  }
}

if (!customElements.get("base-knobs")) {
  customElements.define("base-knobs", BaseKnobs);
}

export default BaseKnobs;
