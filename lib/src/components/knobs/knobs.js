import { LitElement, html, css } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import hljs from "highlight.js";
import highlightStyles from "./shades-of-purple.css";
import styles from "./knobs.css";
import sharedStyles from "../../shared/sharedstyles.css";

class Knobs extends LitElement {
  constructor() {
    super();
    this.src = "";
    this.name = "";
    this.tab = "src";
    this.hideTabs = false;
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
      hideTabs: { type: Boolean },
      hideProps: { type: Boolean },
      hideSrc: { type: Boolean },
      hideEvents: { type: Boolean },
    };
  }

  static get styles() {
    return [styles, highlightStyles, sharedStyles];
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
    return [...this.children].find((el) => {
      return el.tagName.toLowerCase() === this.name;
    });
  }

  async _fetchJson() {
    try {
      const res = await fetch(this.src);
      const json = await res.json();
      const component = json.tags.find((tag) => tag.name === this.name);
      this.properties = component ? component.properties : [];
      this.attributes = component ? component.attributes : [];
    } catch (e) {
      console.log("error", e);
    }
  }

  get srcHTML() {
    return hljs.highlight("html", this.innerHTML).value;
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
    if (attr.type === "string" || attr.type === "String") {
      this.componentEl.setAttribute(attr.name, e.target.value);
    }
    if (attr.type === "boolean" || attr.type === "Boolean") {
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
        <tr>
          <td>${attr.name}</td>
          <td>string</td>
          <td>
            <core-select
              .value=${this.componentEl.getAttribute(attr.name)}
              @change=${(e) => this._handleAttrChange(e, attr)}
            >
              ${options.map((opt) => {
                return html`
                  <core-option
                    ?selected=${this.componentEl.getAttribute(attr.name) ===
                    opt}
                    value=${opt}
                    >${opt}</core-option
                  >
                `;
              })}
            </core-select>
          </td>
        </tr>
      `;
    }

    if (attr.type === "string" || attr.type === "String") {
      return html`
        <tr>
          <td>${attr.name}</td>
          <td>${attr.type}</td>
          <td>
            <core-input
              name=${attr.name}
              .value=${this.componentEl[attr.name]}
              @input=${(e) => this._handleAttrChange(e, attr)}
              type="text"
            >
            </core-input>
          </td>
        </tr>
      `;
    }

    if (attr.type === "boolean" || attr.type === "Boolean") {
      return html`
        <tr>
          <td>${attr.name}</td>
          <td>${attr.type}</td>
          <td>
            <core-checkbox
              name=${attr.name}
              ?checked=${this.componentEl.hasAttribute(attr.name)}
              .value=${this.componentEl[attr.name]}
              @change=${(e) => this._handleAttrChange(e, attr)}
            >
            </core-checkbox>
          </td>
        </tr>
      `;
    }

    return null;
  }

  _renderPropTab() {
    return html`
      <table class="props">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${this.attributes.map((attr) => {
            return this._propComponent(attr);
          })}
        </tbody>
      </table>
    `;
  }

  _renderSrcTab() {
    return html`
      <div class="src">
        <h2>
          <pre><code><div class="hljs">${unsafeHTML(
            this.srcHTML
          )}</div></code></pre>
        </h2>
      </div>
    `;
  }

  render() {
    return html`
      <slot></slot>
      <core-box padding-y="md">
        ${this.hideTabs
          ? null
          : html`
              <core-tabs full @change=${this._handleTabChange}>
                ${this.hideSrc
                  ? null
                  : html`
                      <core-tab ?selected=${this.tab === "src"} value="src">
                        Src
                      </core-tab>
                    `}
                ${this.hideProps
                  ? null
                  : html`
                      <core-tab ?selected=${this.tab === "props"} value="props">
                        Props
                      </core-tab>
                    `}
                ${this.hideEvents
                  ? null
                  : html`
                      <core-tab
                        ?selected=${this.tab === "events"}
                        value="events"
                      >
                        Events
                      </core-tab>
                    `}
              </core-tabs>
            `}
        <div class="tabs">
          ${this._renderTabs()}
        </div>
      </core-box>
    `;
  }
}

export default Knobs;