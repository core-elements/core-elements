import BaseModal from "./base-modal";

if (!customElements.get("base-modal")) {
  customElements.define("base-modal", BaseModal);
}

export { BaseModal };
