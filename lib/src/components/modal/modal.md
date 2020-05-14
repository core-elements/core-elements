---
name: Modal
desc: A modal
category: Interaction
---

<core-knobs  element="core-modal">
<core-modal id="modal">
  Modal content
</core-modal>
<core-button onclick="modal.show()">Show modal</core-button>
</core-knobs>

## With Title

<core-knobs hideTabs  element="core-modal">
<core-modal title="Title" id="modalTwo">
  Modal content
</core-modal>
<core-button onclick="modalTwo.show()">Show modal</core-button>
</core-knobs>
