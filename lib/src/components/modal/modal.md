---
name: Modal
desc: A modal
category: Interaction
---

<core-button onclick="modal.show()">Show modal</core-button>

<core-knobs  element="core-modal">
<core-modal id="modal">
  Modal content
</core-modal>
</core-knobs>

## With Title

<core-button onclick="modalTwo.show()">Show modal</core-button>

<core-knobs hideTabs  element="core-modal">
<core-modal title="Title" id="modalTwo">
  Modal content
</core-modal>
</core-knobs>

## Slots

### Header start, middle, end

<core-button onclick="modalThree.show()">Show modal</core-button>

<core-knobs hideTabs  element="core-modal">
<core-modal id="modalThree">
  <core-button slot="header-start" type="transparent" onclick="modalThree.close()" size="sm">Close</core-button>
  <core-text slot="header-middle">Title</core-text>
  <core-button slot="header-end" type="transparent" size="sm">Save</core-button>
  Modal content
</core-modal>
</core-knobs>

### Header

<core-button onclick="modalFour.show()">Show modal</core-button>

<core-knobs hideTabs  element="core-modal">
<core-modal id="modalFour">
<header slot="header">Modal header</header>
  Modal content
</core-modal>
</core-knobs>

### Footer

<core-button onclick="modalFive.show()">Show modal</core-button>

<core-knobs hideTabs  element="core-modal">
<core-modal id="modalFive">
  Modal content
  <core-button slot="footer" full type="primary">Save</core-button>
</core-modal>
</core-knobs>
