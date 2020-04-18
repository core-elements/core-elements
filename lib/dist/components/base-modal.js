import { c as css, L as LitElement, h as html } from './lit-element-7a30dcec.js';

var styles = css`:host{--base-modal-backdrop-bg-color:rgba(0,0,0,0.4);--base-modal-backdrop-transition:all .2s cubic-bezier(0.785,0.135,0.15,0.86);--base-modal-box-transition:all .4s cubic-bezier(0.785,0.135,0.15,0.86);--base-modal-box-box-shadow:none;--base-modal-content-padding:var(--base-space-md);--base-modal-box-border:1px solid var(--base-color-ui);position:fixed;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:all .5s cubic-bezier(.785,.135,.15,.86);transition:all .5s cubic-bezier(.785,.135,.15,.86);z-index:999;overflow-y:inherit;visibility:hidden;opacity:0}:host([open]){opacity:1;visibility:visible}:host [part=backdrop]{opacity:0;-webkit-transition:var(--base-modal-backdrop-transition);transition:var(--base-modal-backdrop-transition);overflow:visible;z-index:400;position:absolute;width:100vw;height:100vh;background:var(--base-modal-backdrop-bg-color)}:host([open]) [part=backdrop]{opacity:1}:host([no-backdrop]) [part=backdrop]{background:transparent}:host [part=box]{position:relative;margin:var(--base-space-sm);border-radius:var(--base-border-radius-sm);border:var(--base-modal-box-border);box-shadow:var(--base-modal-box-box-shadow);-webkit-transition:var(--base-modal-box-transition);transition:var(--base-modal-box-transition);-webkit-transform:translateY(50px);transform:translateY(50px);width:100%;max-width:600px;min-width:200px;min-height:200px;height:auto;background:#fff;z-index:1000;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch}:host([open]) [part=box]{-webkit-transform:translateY(0);transform:translateY(0)}:host [part=header]{display:block;position:-webkit-sticky;position:sticky;background:var(--ab-color-white);left:0;top:0;width:100%;padding:var(--base-modal-content-padding);display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;border-bottom:1px solid var(--ab-color-ui-400)}:host [part=close-button]{z-index:1;display:inline-block;border:0;font-size:var(--base-font-size-sm);color:var(--base-color-font);background:transparent;cursor:pointer;position:absolute;right:var(--base-space-sm);top:var(--base-space-sm);width:var(--base-space-md);height:var(--base-space-md);fill:currentColor}:host [part=content]{padding:var(--base-modal-content-padding)}`;

class BaseModal extends LitElement {
  constructor() {
    super();
    this.open = false;
    this.noBackdrop = false;
    this._onToggle = this._onToggle.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        reflect: true,

        hasChanged(newVal, oldVal) {
          if (newVal) {
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "visible";
          }

          return true;
        }

      },
      noBackdrop: {
        type: Boolean,
        reflect: true,
        attribute: "no-backdrop"
      }
    };
  }

  static get styles() {
    return styles;
  }

  _onToggle(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("toggle", e));
  }

  hideModal(e) {
    this.open = false;

    this._onToggle(e);
  }

  showModal(e) {
    this.open = true;

    this._onToggle(e);
  }

  toggle(e) {
    this.open = !this.open;

    this._onToggle(e);
  }

  render() {
    return html`
      <div part="backdrop" @click=${this.hideModal}></div>
      <div part="box">
        <slot part="close-button" name="close-button" @click=${this.hideModal}>
          &#10005;
        </slot>

        <slot part="header" name="header"></slot>

        <div part="content"><slot></slot></div>
      </div>
    `;
  }

}

if (!customElements.get("base-modal")) {
  customElements.define("base-modal", BaseModal);
}

export default BaseModal;
