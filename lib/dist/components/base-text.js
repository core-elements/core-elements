import { c as css, L as LitElement, s as sharedStyles, h as html } from './sharedstyles-48eb6882.js';

var styles = css`:host,:host([inline]){display:inline-block}:host([tag=h1]:not([inline])),:host([tag=h2]:not([inline])),:host([tag=h3]:not([inline])),:host([tag=h4]:not([inline])),:host([tag=h5]:not([inline])),:host([tag=h6]:not([inline])),:host([type=h1]:not([inline])),:host([type=h2]:not([inline])),:host([type=h3]:not([inline])),:host([type=h4]:not([inline])),:host([type=h5]:not([inline])),:host([type=h6]:not([inline])){display:block;width:100%}:host([inline]) b,:host([inline]) h1,:host([inline]) h2,:host([inline]) h3,:host([inline]) h4,:host([inline]) h5,:host([inline]) h6,:host([inline]) i,:host([inline]) p,:host([inline]) small{display:inline-block}:host([weight="100"]){font-weight:100}:host([weight="200"]){font-weight:200}:host([weight="300"]){font-weight:300}:host([weight="400"]){font-weight:400}:host([weight="500"]){font-weight:500}:host([weight="600"]){font-weight:600}:host([weight="700"]){font-weight:700}:host([weight="800"]){font-weight:800}:host([weight="900"]){font-weight:900}:host b,:host h1,:host h2,:host h3,:host h4,:host h5,:host h6,:host i,:host p,:host small{font-weight:inherit;margin-top:0}:host b,:host h1,:host h2,:host h3,:host h4,:host h5,:host h6{color:var(--base-color-font-dark)}:host p,:host small{color:var(--base-color-font)}:host([type=lead]) p{font-size:1.4rem;line-height:32px;font-weight:300;color:var(--base-color-font-light)}`;

class BaseText extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"}
     * @attr
     */

    this.tag = "";
    this.type = "p";
    this.weight = "";
  }

  static get properties() {
    return {
      tag: {
        type: String
      },
      type: {
        type: String
      },
      weight: {
        type: String
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
    if (this.tag || this.type) {
      switch (this.tag || this.type) {
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

        case "lead":
          return html`<p><slot></slot></p>`;

        default:
          return html`<p><slot></slot></p>`;
      }
    }
  }

}

if (!customElements.get("base-text")) {
  customElements.define("base-text", BaseText);
}

export default BaseText;
