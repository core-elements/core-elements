import { LitElement, html } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import classnames from "../../utils/classnames";
import styles from "./base-option.css";

class Option extends LitElement {
  constructor() {
    super();
    this.name = "";
    this.highlight = "";
    this._selected = false;
    this._active = false;
    this.hidden = false;
    this.disabled = false;
    this.icon = "";
    this.label = "";
    this.desc = "";
    this.value = "";
    this.focus = this.focus.bind(this);
    this.select = this.select.bind(this);
    this.activeNext = this.activeNext.bind(this);
    this.activePrevious = this.activePrevious.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  static get properties() {
    return {
      value: { type: String },
      highlight: { type: String },
      icon: { type: String },
      label: { type: String },
      desc: { type: String },
      name: { type: String, reflect: true },
      selected: {
        type: Boolean,
        reflect: true
      },
      active: { type: Boolean, reflect: true },
      hidden: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return [styles];
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("keydown", e => {
      if (this.disabled) return;
      this._handleKeyPress(e);
    });

    this.addEventListener("click", e => {
      if (this.disabled) return;
      this.select(e);
    });

    this.addEventListener("focus", e => {
      this._handleFocus(e);
    });
  }

  get options() {
    return [...document.querySelectorAll(`base-option[name="${this.name}"]`)];
  }

  get selectedOption() {
    return this.options.find(option => option.selected);
  }

  get activeOption() {
    return this.options.find(option => option.active);
  }

  select(e) {
    this.selected = true;
  }

  get selected() {
    return this._selected;
  }

  set selected(selected) {
    if (selected === this._selected) {
      return;
    }

    if (selected === true && this.selectedOption) {
      this.selectedOption.selected = false;
    }

    if (selected === true) {
      this.active = true;
    }

    this._selected = selected;

    this.requestUpdate();
  }

  focus() {
    this.shadowRoot.querySelector("button").focus();
  }

  get active() {
    return this._active;
  }

  set active(active) {
    if (active === this._active) {
      return;
    }

    if (active === true && this.activeOption) {
      this.activeOption.active = false;
    }

    this._active = active;

    this.requestUpdate();
  }

  _handleFocus(e) {
    this.active = true;
  }

  _handleKeyPress(e) {
    // Up
    if (e.keyCode === 38) {
      e.preventDefault(); // no scrolling
      this.activePrevious();
    }
    // Down
    if (e.keyCode === 40) {
      e.preventDefault(); // no scrolling
      this.activeNext();
    }
  }

  activeNext() {
    const options = this.options;
    const activeIndex = options.findIndex(option => option.active);
    const isLastOption = options.length === activeIndex + 1;
    const nextIndex = isLastOption ? 0 : activeIndex + 1;
    let nextOption = options[nextIndex];
    if (nextOption.disabled) {
      nextOption = options[nextIndex + 1];
    }
    nextOption.focus();
    nextOption.active = true;
  }

  activePrevious() {
    const options = this.options;
    const activeIndex = options.findIndex(option => option.active);
    const isFirstOption = activeIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : activeIndex - 1;
    let nextOption = options[nextIndex];
    if (nextOption.disabled) {
      nextOption = options[nextIndex - 1];
    }
    nextOption.focus();
    nextOption.active = true;
  }

  get _highlightedLabel() {
    const match = this.label.match(new RegExp(this.highlight, "i"));
    const highlighted = this.label.replace(match[0], `<b>${match[0]}</b>`);
    return html`
      ${unsafeHTML(highlighted)}
    `;
  }

  render() {
    return html`
      ${this.icon
        ? html`
            <div class="base-option__icon">
              <base-icon name=${this.icon}></base-icon>
            </div>
          `
        : null}

      <div class="base-option__content">
        ${this.label
          ? html`
              <h3 class="base-option__label">
                ${this.highlight ? this._highlightedLabel : this.label}
              </h3>
            `
          : this.value}
        ${this.desc
          ? html`
              <p class="base-option__desc">${this.desc}</p>
            `
          : null}
      </div>
    `;
  }
}

if (!customElements.get("base-option")) {
  customElements.define("base-option", Option);
}

export default Option;
