import InputMixin from "./InputMixin";

export default class RadioMixin extends InputMixin {
  constructor() {
    super();
    this._checked = false;
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  get options() {
    return [...document.querySelectorAll(`[name="${this.name}"]`)];
  }

  get currentCheckedItem() {
    return this.options.find((option) => option.hasAttribute("checked"));
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return;
    if (this._checked === checked) return;

    this._checked = checked;

    // TODO: Why do we need to set this manually even after reflect attribute?
    if (checked) {
      if (this.currentCheckedItem) {
        this.currentCheckedItem.checked = false;
      }
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));

    this.requestUpdate();
  }

  selectNext() {
    const options = this.options.filter((o) => !o.disabled);
    const checkedIndex = options.findIndex((option) => option.checked);
    const isLastOption = options.length === checkedIndex + 1;
    const nextIndex = isLastOption ? 0 : checkedIndex + 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  selectPrevious() {
    const options = this.options.filter((o) => !o.disabled);
    const checkedIndex = options.findIndex((option) => option.checked);
    const isFirstOption = checkedIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : checkedIndex - 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  _handleClick(e) {
    e.stopPropagation();
    this.checked = true;
  }

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = true;
    }
    // Left or up
    if (e.keyCode === 37 || e.keyCode === 38) {
      e.preventDefault();
      this.selectPrevious();
    }
    // Right or down
    if (e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault();
      this.selectNext();
    }
  }

}
