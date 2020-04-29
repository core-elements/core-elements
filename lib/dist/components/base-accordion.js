import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{--base-accordion-border-color:var(--base-color-ui-light);border-top:1px solid var(--base-accordion-border-color);outline:1px #000;display:block;width:100%}:host(:hover){--base-accordion-border-color:var(--base-color-ui)}:host(:last-of-type){border-bottom:1px solid var(--base-accordion-border-color)}:host [part=content]{display:block;width:100%;overflow:hidden;max-height:0;-webkit-transition:max-height .5s ease;transition:max-height .5s ease}:host([open]) [part=content]{max-height:500px;-webkit-transition:max-height .3s ease-in;transition:max-height .3s ease-in}:host [part=title]{-webkit-box-flex:1;flex:1;display:block}:host [part=trigger]{cursor:pointer;text-align:left;padding:0;margin:0;display:-webkit-box;display:flex;width:100%;-webkit-box-align:center;align-items:center;font-size:var(--base-font-size);outline:0;border:0;height:var(--base-size-md)}::slotted([name=prepend]){margin-right:var(--base-space-sm)}:host [part=append] svg{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:-webkit-transform .2s ease;transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease,-webkit-transform .2s ease;-webkit-transform:rotate(0);transform:rotate(0)}:host([open]) [part=append] svg{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}`;

class BaseAccordion extends LitElement {
  constructor() {
    super();
    this._open = true;
    this._handleClick = this._handleClick.bind(this);
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this._originalHeight = this.offsetHeight;
      this.open = false;
    });
  }

  _handleClick() {
    this.open = !this.open;
  }

  get open() {
    return this._open;
  }

  set open(val) {
    if (this._open === val) return;

    if (val) {
      const content = this.shadowRoot.querySelector('slot[part="content"]');
      content.style.maxHeight = `${this._originalHeight}px`;
      this.setAttribute("open", "");
    } else {
      const content = this.shadowRoot.querySelector('slot[part="content"]');
      content.style.maxHeight = "0px";
      this.removeAttribute("open");
    }

    this._open = val;
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  render() {
    return html`
      ${this.title ? html`<button @click=${this._handleClick} part="trigger">
            <slot name="prepend" part="prepend"></slot>
            <div part="title">${this.title}</div>
            <slot name="append" part="append"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                  fill="currentColor"
                />
              </svg>
            </slot>
          </button>` : html`<button @click=${this._handleClick} part="trigger">
            <slot name="prepend" part="prepend"></slot>
            <slot name="title" part="title"></slot>
            <slot name="append" part="append"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                  fill="currentColor"
                />
              </svg>
            </slot>
          </button>`}
      <slot part="content"></slot>
    `;
  }

}

if (!customElements.get("base-accordion")) {
  customElements.define("base-accordion", BaseAccordion);
}

export default BaseAccordion;
