---
name: Modal
desc: A modal
category: Elements
---

<base-knobs src="./components.json" name="base-modal">
<base-modal id="modal">
  Modal content
</base-modal>
<base-button onclick="modal.show()">Show modal</base-button>
</base-knobs>

## With Header

<base-knobs hideTabs src="./components.json" name="base-modal">
<base-modal id="modalTwo">
<header slot="header">Header</header>
  Modal content
</base-modal>
<base-button onclick="modalTwo.show()">Show modal</base-button>
</base-knobs>
