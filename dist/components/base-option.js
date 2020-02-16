import { d as directive, N as NodePart, i as isPrimitive, c as css, L as LitElement, h as html } from './lit-element-21ccb9dc.js';

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues = new WeakMap();
/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
const unsafeHTML = directive((value) => (part) => {
    if (!(part instanceof NodePart)) {
        throw new Error('unsafeHTML can only be used in text bindings');
    }
    const previousValue = previousValues.get(part);
    if (previousValue !== undefined && isPrimitive(value) &&
        value === previousValue.value && part.value === previousValue.fragment) {
        return;
    }
    const template = document.createElement('template');
    template.innerHTML = value; // innerHTML casts to string internally
    const fragment = document.importNode(template.content, true);
    part.setValue(fragment);
    previousValues.set(part, { value, fragment });
});

var styles = css`:host{--base-option-padding:10px;width:100%;max-width:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;cursor:pointer;background:var(--base-color-white);text-align:left;border-radius:var(--base-border-radius-200);padding:var(--base-option-padding);margin-top:var(--base-spacing-100);border:2px solid transparent}:host(:first-child){margin-top:0}:host(:not([disabled]):not([selected]):hover){background-color:#deebff}:host:focus{border-color:var(--base-color-active-600);background-color:var(--base-color-ui-200)}:host([disabled]){opacity:.5;cursor:not-allowed}:host([hidden]){display:none}:host([active]:not([disabled])){background-color:#deebff}:host([selected]:not([disabled])){background-color:#2684ff;color:#fff}:host([selected] .base-option__desc),:host([selected] .base-option__icon),:host([selected] .base-option__label){color:var(--base-color-active-800)}.base-option__icon{margin-right:var(--base-spacing-300)}.base-option__label{margin:0;padding:0;color:var(--base-color-ui-800);font-size:var(--base-heading-300);font-weight:400;display:block}.base-option__label b{font-weight:600}.base-option__desc{margin:0;padding:0;margin-top:var(--base-spacing-200);font-size:var(--base-paragraph-400);color:var(--base-color-ui-600);display:block;font-weight:400}.base-option--disabled{opacity:.5;color:var(--base-color-ui-500);cursor:not-allowed;background-color:var(--base-color-white)}`;

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
      value: {
        type: String
      },
      highlight: {
        type: String
      },
      icon: {
        type: String
      },
      label: {
        type: String
      },
      desc: {
        type: String
      },
      name: {
        type: String,
        reflect: true
      },
      selected: {
        type: Boolean,
        reflect: true
      },
      active: {
        type: Boolean,
        reflect: true
      },
      hidden: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      }
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
    } // Down


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
      ${this.icon ? html`
            <div class="base-option__icon">
              <base-icon name=${this.icon}></base-icon>
            </div>
          ` : null}

      <div class="base-option__content">
        ${this.label ? html`
              <h3 class="base-option__label">
                ${this.highlight ? this._highlightedLabel : this.label}
              </h3>
            ` : this.value}
        ${this.desc ? html`
              <p class="base-option__desc">${this.desc}</p>
            ` : null}
      </div>
    `;
  }

}

if (!customElements.get("base-option")) {
  customElements.define("base-option", Option);
}

export default Option;
