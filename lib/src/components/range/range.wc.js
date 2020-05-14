import { LitElement, html } from "lit-element";
import styles from "./range.css";
import sharedStyles from "../../shared/sharedstyles.css";

function isTouchEvent(event) {
  return (
    (event.touches && event.touches.length) ||
    (event.changedTouches && event.changedTouches.length)
  );
}

function removeGhostImage(event) {
  if (!isTouchEvent(event)) {
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  }
}

/**
 * @element core-range
 **/

class Range extends LitElement {
  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.step = 10;
    this._value = "0";
    this._startPos = null;
  }

  static get properties() {
    return {
      value: { type: String },
      min: { type: Number },
      max: { type: Number },
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
    this._value = val;
  }

  get arrayValues() {
    return this._value.split(",").map((val) => Number(val));
  }

  connectedCallback() {
    super.connectedCallback();
  }

  getLineStyles() {
    if (this.arrayValues.length === 1) {
      return `background: var(--core-color-ui-light);`;
    }
    return `
    background: linear-gradient(
      to right,
      var(--core-color-ui-light) 0%,
      ${this.arrayValues
        .map((val, i) => {
          const valInPercent = (val / this.max) * 100;
          const isLast = this.arrayValues.length === i + 1;
          const isFirst = i === 0;
          if (isFirst) {
            const nextValInPercent = (this.arrayValues[i + 1] / this.max) * 100;
            return `var(--core-color-ui-light) ${valInPercent}%, rgb(12, 41, 96) ${valInPercent}%, rgb(12, 41, 96) ${nextValInPercent}%,`;
          }
          if (!isFirst && !isLast) {
            const nextValInPercent = (this.arrayValues[i + 1] / this.max) * 100;
            return `rgb(12, 41, 96) ${valInPercent}%, rgb(12, 41, 96) ${nextValInPercent}%,`;
          }
          if (isLast) {
            return `rgb(12, 41, 96) ${valInPercent}%, var(--core-color-ui-light) ${valInPercent}%,`;
          }
        })
        .join("")}
      var(--core-color-ui-light) 100%
    );
    `;
  }

  increaseValue(index) {
    const newValues = this.arrayValues.map((val, i) => {
      if (i === index) {
        const nextValue = this.arrayValues[i + 1] || this.max;
        const newValue = val + this.step;
        return newValue > nextValue ? val : newValue;
      }
      return val;
    });
    this.value = newValues.toString();
    this.requestUpdate();
  }

  decreaseValue(index) {
    const newValues = this.arrayValues.map((val, i) => {
      if (i === index) {
        const prevValue = this.arrayValues[i - 1] || this.min;
        const newValue = val - this.step;
        return newValue < prevValue ? val : newValue;
      }
      return val;
    });
    this.value = newValues.toString();
    this.requestUpdate();
  }

  handleKeyDown(e, index) {
    // Arrow right
    if (e.keyCode === 39) {
      this.increaseValue(index);
    }
    // Left
    if (e.keyCode === 37) {
      this.decreaseValue(index);
    }
  }

  handleMove(e, i) {
    removeGhostImage(e);
    const xPos = e.clientX || e.touches[0].clientX;
    // clientX is 0 when stopping, no idea why
    if (xPos === 0) return;
    if (this._startPos === null) return;
    const { width } = this.getBoundingClientRect();
    const distance = this._startPos - xPos;
    const distancePercent = (distance / width) * 100;
    const stepPercent = (this.step / this.max) * 100;

    if (distancePercent < -Math.abs(stepPercent)) {
      this.increaseValue(i);
      this._startPos = xPos;
    }
    if (distancePercent > stepPercent) {
      this.decreaseValue(i);
      this._startPos = xPos;
    }
  }

  handleMoveStart(e) {
    removeGhostImage(e);
    const xPos = e.clientX || e.touches[0].clientX;
    this._startPos = xPos;
  }

  handleMoveEnd(e) {
    this._startPos = null;
  }

  render() {
    return html`
      <div part="line" style=${this.getLineStyles()}>
        ${this.arrayValues.map((val, i) => {
          const valInPercent = (val / this.max) * 100;
          return html`<button
            draggable="true"
            @touchstart=${(e) => this.handleMoveStart(e)}
            @touchmove=${(e) => this.handleMove(e, i)}
            @touchend=${(e) => this.handleMoveEnd(e)}
            @dragstart=${(e) => this.handleMoveStart(e)}
            @drag=${(e) => this.handleMove(e, i)}
            @dragend=${(e) => this.handleMoveEnd(e)}
            @keydown=${(e) => this.handleKeyDown(e)}
            part="thumb"
            style=${`left: ${valInPercent}%`}
            slot=${"thumb-" + i}
          ></button>`;
        })}
      </div>
    `;
  }
}

export default Range;
