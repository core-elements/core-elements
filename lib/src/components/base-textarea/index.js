import BaseTextArea from "./base-textarea";

if (!customElements.get("base-textarea")) {
  customElements.define("base-textarea", BaseTextArea);
}

export { BaseTextArea };
