import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-be6ff695.js';

var styles = css`:host{--core-modal-backdrop-bg-color:rgba(0,0,0,0.4);--core-modal-backdrop-transition:all .2s cubic-bezier(0.785,0.135,0.15,0.86);--core-modal-box-transition:all .4s cubic-bezier(0.785,0.135,0.15,0.86);--core-modal-box-box-shadow:none;--core-modal-content-padding:var(--core-space-md);--core-modal-box-border:1px solid var(--core-color-ui);position:fixed;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:all .5s cubic-bezier(.785,.135,.15,.86);transition:all .5s cubic-bezier(.785,.135,.15,.86);z-index:999;overflow-y:inherit;visibility:hidden;opacity:0}:host([open]){opacity:1;visibility:visible}:host [part=backdrop]{opacity:0;-webkit-transition:var(--core-modal-backdrop-transition);transition:var(--core-modal-backdrop-transition);overflow:visible;z-index:400;position:absolute;width:100vw;height:100vh;background:var(--core-modal-backdrop-bg-color)}:host([open]) [part=backdrop]{opacity:1}:host([no-backdrop]) [part=backdrop]{background:transparent}:host [part=box]{position:relative;margin:var(--core-space-sm);border-radius:var(--core-border-radius-sm);border:var(--core-modal-box-border);box-shadow:var(--core-modal-box-box-shadow);-webkit-transition:var(--core-modal-box-transition);transition:var(--core-modal-box-transition);-webkit-transform:translateY(50px);transform:translateY(50px);width:100%;max-width:600px;min-width:200px;min-height:200px;height:auto;background:var(--core-color-white);z-index:1000;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch}:host([open]) [part=box]{-webkit-transform:translateY(0);transform:translateY(0)}::slotted([slot=header]){box-sizing:border-box;display:block;position:-webkit-sticky;position:sticky;background:var(--ab-color-white);left:0;top:0;width:100%;padding:var(--core-modal-content-padding);display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;border-bottom:1px solid var(--ab-color-ui-400)}:host [part=close-button]{z-index:1;display:inline-block;border:0;font-size:var(--core-font-size-sm);color:var(--core-color-font);background:transparent;cursor:pointer;position:absolute;right:var(--core-space-sm);top:var(--core-space-sm);width:var(--core-space-md);height:var(--core-space-md);fill:currentColor}:host [part=content]{padding:var(--core-modal-content-padding)}::slotted([slot=error]),::slotted([slot=success]){box-sizing:border-box;display:block;border:1px solid var(--core-color-danger)}`;

class Modal extends LitElement {
  constructor() {
    super();
    this.open = false;
    this.noBackdrop = false;
    this._onToggle = this._onToggle.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
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
    return [styles, sharedStyles];
  }

  _onToggle() {
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  close() {
    this.open = false;

    this._onToggle();
  }

  show() {
    this.open = true;

    this._onToggle();
  }

  toggle(e) {
    this.open = !this.open;

    this._onToggle();
  }

  render() {
    return html`
      <div part="backdrop" @click=${this.close}></div>
      <div part="box">
        <slot part="close-button" name="close-button" @click=${this.close}>
          &#10005;
        </slot>

        <slot part="header" name="header"></slot>

        <div part="content"><slot></slot></div>
      </div>
    `;
  }

}

export { Modal };
