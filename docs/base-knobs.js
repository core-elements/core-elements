import {
  LitElement,
  html,
  css
} from "https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module";

class BaseKnobs extends LitElement {
  constructor() {
    super();
    this.src = "";
    this.name = "";
    this.attributes = [];
    this.properties = [];
    this._fetchJson = this._fetchJson.bind(this);
    this._getInputType = this._getInputType.bind(this);
    this._handleAttrChange = this._handleAttrChange.bind(this);
  }

  static get properties() {
    return {
      src: { type: String },
      name: { type: String },
      attributes: { type: Array },
      properties: { type: Array }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchJson();
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

  _getInputType(type) {
    if (type === "boolean") return "checkbox";
    if (type === "string") return "text";
  }

  _handleAttrChange(e, attr) {
    console.log(e);
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

  render() {
    return html`
      ${this.attributes.map(attr => {
        return html`
          <input

            @input=${e => this._handleAttrChange(e, attr)}
            type=${this._getInputType(attr.type)}>
            ${attr.name}
          </div>
        `;
      })}
      <slot></slot>
    `;
  }
}

if (!customElements.get("base-knobs")) {
  customElements.define("base-knobs", BaseKnobs);
}

export default BaseKnobs;
