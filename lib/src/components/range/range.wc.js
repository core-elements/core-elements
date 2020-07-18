import { LitElement, html } from "lit-element";
import styles from "./range.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-range
 **/

class Range extends LitElement {
  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.step = 10;
    this.sensitivity = 1;
    this._value = "0";
    this._startPos = null;
    this.name = "";
  }

  static get properties() {
    return {
      value: { type: String },
      min: { type: Number },
      max: { type: Number },
      name: { type: String },
      sensitivity: { type: Number },
      step: { type: Number },
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  get value() {
    return this._value;
  }

  set value(val) {
    let newVal;

    const isArray = Array.isArray(val);
    const isNumber = Number.isInteger(val);

    if (isArray) {
      newVal = val;
    } else if (isNumber) {
      newVal = val;
    } else if (val.startsWith("[")) {
      newVal = JSON.parse(val);
    } else if (val.includes(",")) {
      newVal = val.split(",").map((v) => parseInt(v));
    } else {
      newVal = parseInt(val);
    }

    const isSame = JSON.stringify(newVal) === JSON.stringify(this._value);

    if (isSame) {
      return;
    } else {
      this._value = newVal;
    }

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
    this.requestUpdate();
  }

  get arrayValues() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div part="line-wrapper">
        <div part="line">
          ${this.arrayValues.map((val, i) => {
            return html`<div part="track"></div>`;
          })}
          ${this.arrayValues.map((val, i) => {
            return html`<button part="thumb" slot=${"thumb-" + i}></button>`;
          })}
        </div>
      </div>
      ${this.labels
        ? html`<div part="labels">
            ${this.labels
              .split(",")
              .map((label) => html`<div part="label">${label}</div>`)}
          </div>`
        : null}
    `;
  }
}

export default Range;
