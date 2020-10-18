import InputMixin from "./InputMixin";


export default class CheckboxMixin extends InputMixin {
  constructor() {
    super();
    this._checked = false;
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

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return;
    if (this._checked === checked) return;

    this._checked = checked;

    if (checked) this.setAttribute("checked", "");
    else this.removeAttribute("checked");

    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));

    this.requestUpdate();
  }

  _handleKeyDown(e) {
    // Space
    if (e.keyCode === 32) {
      e.preventDefault();
      this.checked = !this.checked;
    }
  }

  _handleClick() {
    this.checked = !this.checked;
  }
}
