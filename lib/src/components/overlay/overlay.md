---
name: Overlay
desc: Overlay
category: Interaction
icon: chatbox-outline
---

<core-knobs hideEvents element="core-overlay">
<core-overlay>
  <core-button full slot="trigger">Button</core-button>
  <core-box slot="content" padding="sm" depth="sm">
    <core-text>Hello</core-text>
  </core-box>
</core-overlay>
</core-knobs>

## Examples

### Select

<core-knobs hideEvents hideProps element="core-overlay">
<core-overlay>
  <core-button full slot="trigger">Button</core-button>
  <core-box style="width: 200px" bg="white" slot="content" depth="sm" >
  <core-menu bordered>
    <core-menu-item>Option 1</core-menu-item>
    <core-menu-item>Option 2</core-menu-item>
  </core-menu>
  </core-box>
</core-overlay>
</core-knobs>
