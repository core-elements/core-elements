import BaseFlex from "./base-flex";

if (!customElements.get("base-flex")) {
  customElements.define("base-flex", BaseFlex);
}

export { BaseFlex };
