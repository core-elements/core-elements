---
name: Modal
desc: A modal
category: Elements
---

<core-knobs  name="core-modal">
<core-modal id="modal">
  Modal content
</core-modal>
<core-button onclick="modal.show()">Show modal</core-button>
</core-knobs>

## With Header

<core-knobs hideTabs  name="core-modal">
<core-modal id="modalTwo">
<header slot="header">Header</header>
  Modal content
</core-modal>
<core-button onclick="modalTwo.show()">Show modal</core-button>
</core-knobs>
