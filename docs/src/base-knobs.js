import { LitElement, html, css } from "lit-element";

class BaseKnobs extends LitElement {
  constructor() {
    super();
    this.src = "";
    this.name = "";
    this.tab = "props";
    this.hideProps = false;
    this.hideSrc = false;
    this.hideEvents = false;
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
      hideProps: { type: Boolean },
      hideSrc: { type: Boolean },
      hideEvents: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchJson();
    this._observeProps();
  }

  _observeProps() {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
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
      const component = json.tags.find((tag) => tag.name === this.name);
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
            <base-select @change=${(e) => this._handleAttrChange(e, attr)}>
              ${options.map((opt) => {
                return html`
                  <base-option
                    ?selected=${this.componentEl.getAttribute(attr.name) ===
                      opt}
                    value=${opt}
                    >${opt}</base-option
                  >
                `;
              })}
            </select>

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
              @input=${(e) => this._handleAttrChange(e, attr)}
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
          <base-checkbox
              name=${attr.name}
              ?checked=${this.componentEl.hasAttribute(attr.name)}
              .value=${this.componentEl[attr.name]}
              @change=${(e) => this._handleAttrChange(e, attr)}
            />
            ${attr.name}
          </base-checkbox>
        </div>
      `;
    }

    return null;
  }

  _renderPropTab() {
    return html`
      <div class="props">
        ${this.attributes.map((attr) => {
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
      </style>
      <slot></slot>
      <nav>
        ${this.hideProps
          ? null
          : html`
              <button
                ?active=${this.tab === "props"}
                value="props"
                @click=${this._handleTabChange}
              >
                Props
              </button>
            `}
        ${this.hideSrc
          ? null
          : html`
              <button
                ?active=${this.tab === "src"}
                value="src"
                @click=${this._handleTabChange}
              >
                Src
              </button>
            `}
        ${this.hideEvents
          ? null
          : html`
              <button
                ?active=${this.tab === "events"}
                value="events"
                @click=${this._handleTabChange}
              >
                Events
              </button>
            `}
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
