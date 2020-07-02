---
name: Modal
desc: A modal
category: Interaction
icon: albums-outline
---

<core-button onclick="modal.show()">Show modal</core-button>

<core-knobs  element="core-modal">
<core-modal id="modal">
  Modal content
</core-modal>
</core-knobs>

## As sidebar

<core-button onclick="sidebar.show()">Show sidebar</core-button>

<core-knobs  element="core-modal">
<style>
#sidebar {
  --core-modal-max-width: 90vw;
  --core-modal-width: auto;
  --core-modal-min-width: 400px;
  --core-modal-min-height: 100vh;
  --core-modal-translateY: 0px;
  --core-modal-translateX: -100%;
  --core-modal-justify: start;
}
#sidebar[open] {
  --core-modal-translateY: 0px;
  --core-modal-translateX: 0px;
}
</style>
<core-modal id="sidebar">
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
