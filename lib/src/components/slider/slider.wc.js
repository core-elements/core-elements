import { LitElement, html } from "lit-element";
import styles from "./slider.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-slider
 **/

class Slider extends LitElement {
  static get properties() {
    return {
      snapAlign: { type: String, reflect: true, attribute: "snap-align" },
      navigation: { type: Boolean, reflect: true },
      noScroll: { type: Boolean, attribute: "no-scroll" },
      active: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this._active = "";
    this.snapAlign = "";
    this.noScroll = false;
    this.scrolling = false;
    this.navigation = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.itemIsWithinScrollRange = this.itemIsWithinScrollRange.bind(this);
    this.calculateActiveScrollPos = this.calculateActiveScrollPos.bind(this);
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.active) {
      this.active = this.sliderItems[0].name || 0;
    }
  }

  get active() {
    return this._active;
  }

  set active(val) {
    if (this._active === val) return;

    const nextEl = this.sliderItems.find((i) => i.name === val);

    if (this.sliderSlot) {
      this.sliderSlot.scrollTo({
        left: this.calculateActiveScrollPos(nextEl),
      });
    }

    this.setAttribute("active", val);
    this._active = val;
    this.dispatchEvent(new CustomEvent("change"));
  }

  calculateActiveScrollPos(el) {
    if (!el) return;
    if (this.snapAlign === "left") {
      return el.offsetLeft;
    } else if (this.snapAlign === "center") {
      const itemCenter = el.offsetLeft + el.clientWidth / 2;
      const sliderHalf = this.sliderSlot.clientWidth / 2;
      return itemCenter - sliderHalf;
    } else {
      return el.offsetLeft;
    }
  }

  get sliderSlot() {
    return this.shadowRoot.querySelector('[part="slider"]');
  }

  get sliderItems() {
    // remove text nodes
    return [...this.childNodes].filter((node) => node.nodeType !== 3);
  }

  get activeEl() {
    return (
      this.sliderItems.find((item) => item.name === this.active) ||
      this.sliderItems[0]
    );
  }

  get prevEl() {
    const activeIndex = this.sliderItems.findIndex((i) => i === this.activeEl);
    return activeIndex === 0
      ? this.activeEl
      : this.sliderItems[activeIndex - 1];
  }

  get nextEl() {
    const numberOfSlides = this.sliderItems.length;
    const activeIndex = this.sliderItems.findIndex((i) => i === this.activeEl);
    return activeIndex === numberOfSlides - 1
      ? this.activeEl
      : this.sliderItems[activeIndex + 1];
  }

  next() {
    this.active = this.nextEl.name;
  }

  prev() {
    this.active = this.prevEl.name;
  }

  handleScroll(e) {
    if (this.noScroll) {
      e.preventDefault();
      return;
    }

    clearTimeout(this.scrolling);

    // Set a timeout to run after scrolling ends
    this.scrolling = setTimeout(() => {
      this.sliderItems.forEach((item, i) => {
        const isWithinRange = this.itemIsWithinScrollRange(item);
        if (isWithinRange) {
          this.active = item.name;
        }
      });
    }, 100);
  }

  itemIsWithinScrollRange(elementToCheck) {
    const slider = this.sliderSlot;
    const sliderWidth = this.sliderSlot.clientWidth;
    const scrollPos = slider.scrollLeft;
    const item = elementToCheck;
    const itemPos = item.offsetLeft;
    const itemWidth = item.clientWidth;

    if (this.snapAlign === "left") {
      const difference = scrollPos - itemPos;
      return difference < 100 && difference > -100;
    } else if (this.snapAlign === "center") {
      const itemCenter = itemPos + itemWidth / 2;
      const sliderCenter = scrollPos + sliderWidth / 2;
      const difference = sliderCenter - itemCenter;
      return difference < 100 && difference > -100;
    } else {
      const difference = scrollPos - itemPos;
      return difference < 100 && difference > -100;
    }
  }

  render() {
    return html`<slot
      @slotchange=${this.slotChange}
      @scroll=${this.handleScroll}
      part="slider"
    ></slot>`;
  }
}

export default Slider;
