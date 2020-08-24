import { LitElement, html } from "lit-element";
import styles from "./range.css";
import sharedStyles from "../../shared/sharedstyles.css";
import throttle from "../../utils/throttle";
import swapArray from "../../utils/swapArray";

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
    this.step = 1;
    /**
     * Value steps
     * @type {Number}
     * @attr
     */
    this.name = "";

    this._value = 0;
    this._startPos = null;

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleDown = this._handleDown.bind(this);
    this._handleUp = this._handleUp.bind(this);
    this._handleMove = this._handleMove.bind(this);
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
      var step = (this.max - this.min) / this.step;
      const toClosestStep = val.map((v) => Math.round(v / step) * step);

      const safeValues = toClosestStep.map((v) =>
        v > this.max ? this.max : this.min > v ? this.min : v
      );

      const inOrder = safeValues.reduce((acc, v, i) => {
        const isBigger = acc[i] > acc[i + 1];
        if (isBigger) {
          this._activeButton =
            this._activeButton === i
              ? this._activeButton + 1
              : this._activeButton - 1;
          return swapArray(acc, i, i + 1);
        }
        return acc;
      }, safeValues);

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
      throttle(this._handleMove(e), 200)
    );
    window.addEventListener("touchmove", (e) =>
      throttle(this._handleMove(e), 200)
    );

    window.addEventListener("mouseup", this._handleUp);
    window.addEventListener("touchend", this._handleUp);
  }

  _handleKeyDown(i, e) {
    this._activeButton = i;
    if (e.keyCode === 39) {
      this.value = this.arrayValues.map((v, index) => {
        const nextVal = i === index ? v + this.step : v;
        const isBigger = nextVal > this.arrayValues[index + 1];
        if (isBigger) e.target.nextElementSibling.focus();
        return nextVal;
      });
    }
    if (e.keyCode === 37) {
      this.value = this.arrayValues.map((v, index) => {
        const nextVal = i === index ? v - this.step : v;
        const isBigger = nextVal < this.arrayValues[index - 1];
        if (isBigger) e.target.previousElementSibling.focus();
        return nextVal;
      });
    }
  }

  _handleDown(i, e) {
    this._buttonPressed = true;
    this._activeButton = i;
  }

  _handleUp() {
    this._buttonPressed = false;
  }

  _handleMove(e) {
    if (this._buttonPressed) {
      const lineStart = this.getBoundingClientRect().left;
      const lineLength = this.clientWidth;
      const mousePos = e.clientX || e.touches[0].clientX;
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
              @mousedown="${(e) => this._handleDown(i, e)}"
              @touchstart="${(e) => this._handleDown(i, e)}"
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
