import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-656ad3ab.js';

var styles = css`:host{--base-font-size:var(--base-font-size-sm);--base-font-weight:400}:host,:host>:first-child{display:inline-block;text-align:left;font-weight:var(--base-font-weight);font-size:var(--base-font-size)}:host([inline]),:host([inline])>:first-child{display:inline-block}:host(:last-child)>:first-child{margin-bottom:0}:host([full]),:host([full])>:first-child{display:block;width:100%}:host([look=h1])>:first-child,:host([tag=h1])>:first-child{--base-font-size:var(--base-font-size-xl);--base-font-weight:700}:host([look=h2])>:first-child,:host([tag=h2])>:first-child{--base-font-size:var(--base-font-size-lg);--base-font-weight:700}:host([look=h3])>:first-child,:host([tag=h3])>:first-child{--base-font-size:var(--base-font-size-md);--base-font-weight:700}:host([look=h4])>:first-child,:host([tag=h4])>:first-child{--base-font-size:var(--base-font-size-sm);--base-font-weight:600}:host([look=h5])>:first-child,:host([tag=h5])>:first-child{--base-font-size:var(--base-font-size-xs);--base-font-weight:600}:host([look=h6])>:first-child,:host([tag=h6])>:first-child{--base-font-size:var(--base-font-size-xs);--base-font-weight:500}:host([look=small])>:first-child,:host([tag=small])>:first-child{--base-font-size:var(--base-font-size-xs)}:host([look=h1])>:first-child,:host([look=h2])>:first-child,:host([look=h4])>:first-child,:host([look=h5])>:first-child,:host([look=h6])>:first-child,:host([tag=h1])>:first-child,:host([tag=h2])>:first-child,:host([tag=h4])>:first-child,:host([tag=h5])>:first-child,:host([tag=h6])>:first-child{color:var(--base-color-font-dark)}:host([look=p])>:first-child,:host([look=small])>:first-child,:host([tag=p])>:first-child,:host([tag=small])>:first-child{color:var(--base-color-font)}:host([look=i])>:first-child,:host([look=lead])>:first-child,:host([tag=i])>:first-child{color:var(--base-color-font-light)}:host([look=h6])>:first-child,:host([tag=h6])>:first-child{text-transform:uppercase}:host([look=h1]:not([inline])),:host([look=h2]:not([inline])),:host([look=h3]:not([inline])),:host([look=h4]:not([inline])),:host([look=h5]:not([inline])),:host([look=h6]:not([inline])),:host([tag=h1]:not([inline])),:host([tag=h2]:not([inline])),:host([tag=h3]:not([inline])),:host([tag=h4]:not([inline])),:host([tag=h5]:not([inline])),:host([tag=h6]:not([inline])){display:block;width:100%}:host([weight="100"])>:first-child{--base-font-weight:100}:host([weight="200"])>:first-child{--base-font-weight:200}:host([weight="300"])>:first-child{--base-font-weight:300}:host([weight="400"])>:first-child{--base-font-weight:400}:host([weight="500"])>:first-child{--base-font-weight:500}:host([weight="600"])>:first-child{--base-font-weight:600}:host([weight="700"])>:first-child{--base-font-weight:700}:host([weight="800"])>:first-child{--base-font-weight:800}:host([weight="900"])>:first-child{--base-font-weight:900}:host b,:host h1,:host h2,:host h3,:host h4,:host h5,:host h6,:host i,:host p,:host small{font-weight:inherit;margin-top:0}:host b,:host h1,:host h2,:host h3,:host h4,:host h5,:host h6{color:var(--base-color-font-dark)}:host p,:host small{color:var(--base-color-font)}:host([look=lead])>:first-child{--base-font-size:1.4rem;line-height:32px;font-weight:300;color:var(--base-color-font-light)}`;

class BaseText extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"}
     * @attr
     */

    this.tag = "";
    /**
     * Button look
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"|"lead"}
     * @attr
     */

    this.look = "p";
    this.weight = "";
    this.full = false;
  }

  static get properties() {
    return {
      tag: {
        type: String
      },
      look: {
        type: String
      },
      weight: {
        type: String
      },
      full: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    switch (this.tag) {
      case "h1":
        return html`<h1><slot></slot></h1>`;

      case "h2":
        return html`<h2><slot></slot></h2>`;

      case "h3":
        return html`<h3><slot></slot></h3>`;

      case "h4":
        return html`<h4><slot></slot></h4>`;

      case "h5":
        return html`<h5><slot></slot></h5>`;

      case "h6":
        return html`<h6><slot></slot></h6>`;

      case "p":
        return html`<p><slot></slot></p>`;

      case "small":
        return html`<small><slot></slot></small>`;

      case "b":
        return html`<b><slot></slot></b>`;

      case "i":
        return html`<i><slot></slot></i>`;

      case "span":
        return html`<span><slot></slot></span>`;

      case "div":
        return html`<div><slot></slot></div>`;

      default:
        return html`<p><slot></slot></p>`;
    }
  }

}

export default BaseText;
