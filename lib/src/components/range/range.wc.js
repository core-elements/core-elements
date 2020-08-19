import { LitElement, html } from "lit-element";
import styles from "./range.css";
import sharedStyles from "../../shared/sharedstyles.css";
import throttle from "../../utils/throttle";

/**
 * @element core-range
 **/

class Range extends LitElement {
  constructor() {
    super();
    /**
     * Minimum value
     * @type {Number}
     * @attr
     */
    this.min = 0;
    /**
     * Maximum value
     * @type {Number}
     * @attr
     */
    this.max = 100;
    /**
     * Value steps
     * @type {Number}
     * @attr
     */
    this.step = 10;
    /**
     * Value steps
     * @type {Number}
     * @attr
     */
    this.name = "";

    this._value = 0;
    this._startPos = null;

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
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

  get range() {
    return this.max - this.min;
  }

  get isSingle() {
    return this.arrayValues.length === 1;
  }

  get valueCount() {
    return this.arrayValues.length;
  }

  set value(val) {
    let newVal;

    const isArray = Array.isArray(val);
    const isNumber = Number.isInteger(val);

    if (isArray) {
      const withinRange = val.map((v) =>
        v > this.max ? this.max : this.min > v ? this.min : v
      );
      const inOrder = withinRange.map((v, i) =>
        v > withinRange[i + 1]
          ? withinRange[i + 1]
          : v < withinRange[i - 1]
          ? withinRange[i - 1]
          : v
      );
      newVal = inOrder.length === 1 ? inOrder[0] : inOrder;
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

    console.log({ newVal, oldVal: this._value });

    if (isSame) {
      return;
    } else {
      this._value = newVal;
      this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
      this.requestUpdate();
    }
  }

  get arrayValues() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("mousemove", (e) =>
      throttle(this._handleMouseMove(e), 200)
    );
    window.addEventListener("mouseup", this._handleMouseUp);
  }

  _handleKeyDown(i, e) {
    if (e.keyCode === 39) {
      this.value = this.arrayValues.map((v, index) => {
        return index === i && v !== this.max ? v + this.step : v;
      });
    }
    if (e.keyCode === 37) {
      this.value = this.arrayValues.map((v, index) =>
        index === i && v !== this.min ? v - this.step : v
      );
    }
  }

  _handleMouseDown(i, e) {
    this._buttonPressed = true;
    this._activeButton = i;
  }

  _handleMouseUp(i, e) {
    this._buttonPressed = false;
  }

  _handleMouseMove(e) {
    if (this._buttonPressed) {
      const lineStart = this.getBoundingClientRect().left;
      const lineLength = this.clientWidth;
      const mousePos = e.clientX;
      const index = this._activeButton;
      const handlePos = mousePos - lineStart;
      const valueByPercent = (handlePos / lineLength) * 100;
      const valueByNumber = this.range * (valueByPercent / 100);
      const newValue = Math.round(valueByNumber / this.step) * this.step;

      this.value = this.arrayValues.map((v, i) => (index === i ? newValue : v));
    }
  }

  render() {
    return html`
      <div part="line-wrapper">
        <div part="line">
          ${this.arrayValues.map((val, i) => {
            // if it's the last step return
            if (this.valueCount < i + 1 && !isSingle) return;
            const valInPercent = (val / this.range) * 100;
            const nextValInPercent =
              (this.arrayValues[i + 1] / this.range) * 100;

            const difference = nextValInPercent - valInPercent;
            return html`<div
              part="track"
              style="${`
              left: ${this.isSingle ? 0 : valInPercent}%; 
              width: ${this.isSingle ? valInPercent : difference}%`}"
            ></div>`;
          })}
          ${this.arrayValues.map((val, i) => {
            return html`<button
              style="${`left: ${(val / this.range) * 100}%`}"
              @mousedown="${(e) => this._handleMouseDown(i, e)}"
              @keydown="${(e) => this._handleKeyDown(i, e)}"
              part="thumb"
              slot=${"thumb-" + i}
            ></button>`;
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
