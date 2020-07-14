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

  increaseValue(index) {
    const newValues = this.arrayValues.map((val, i) => {
      if (i === index) {
        const nextValue = this.arrayValues[i + 1] || Number(this.max);
        const newValue = val + Number(this.step);
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
        const prevValue = this.arrayValues[i - 1] || Number(this.min);
        const newValue = val - Number(this.step);

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
    const xPos = e.touches ? e.touches[0].clientX : e.clientX;
    // clientX is 0 when stopping, no idea why
    if (xPos === 0) return;
    if (this._startPos === null) return;
    const { width } = this.getBoundingClientRect();
    const distance = this._startPos - xPos;
    const distancePercent = (distance / width) * 100;
    const stepPercent = (this.step / this.max) * 100 * this.sensitivity;

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
    const mainWidth = Number(this.max) - Number(this.min);

    return html`
      <div part="line-wrapper">
        <div part="line">
          ${this.arrayValues.map((val, i) => {
            const isLast = this.arrayValues.length - 1 === i;
            const startValInPercent = (val / mainWidth) * 100;
            const endValInPercent = isLast
              ? startValInPercent
              : (this.arrayValues[i + 1] / mainWidth) * 100;
            const widthInPercent = endValInPercent - startValInPercent;
            return html`<div
              style=${`left: ${startValInPercent}%; width: ${widthInPercent}%;`}
              part="track"
            ></div>`;
          })}
          ${this.arrayValues.map((val, i) => {
            const valInPercent = (val / mainWidth) * 100;
            return html`<button
              draggable="true"
              @touchstart=${(e) => this.handleMoveStart(e)}
              @touchmove=${(e) => this.handleMove(e, i)}
              @touchend=${(e) => this.handleMoveEnd(e)}
              @dragstart=${(e) => this.handleMoveStart(e, i)}
              @drag=${(e) => this.handleMove(e, i)}
              @dragend=${(e) => this.handleMoveEnd(e, i)}
              @keydown=${(e) => this.handleKeyDown(e, i)}
              part="thumb"
              style=${`left: ${valInPercent}%`}
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
