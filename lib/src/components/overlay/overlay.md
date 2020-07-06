---
name: Overlay
desc: Overlay
category: Interaction
icon: chatbox-outline
---

<core-knobs hideEvents element="core-overlay">
<core-overlay>
  <core-button slot="trigger" full>Button</core-button>
  <core-box slot="content" padding="sm" depth="sm">
    <core-text>Hello</core-text>
  </core-box>
</core-overlay>
</core-knobs>

## Hoverable

<core-overlay hoverable>
  <core-button slot="trigger" full>Button</core-button>
  <core-box slot="content" padding="sm" depth="sm">
    <core-text>Hello</core-text>
  </core-box>
</core-overlay>
</core-knobs>

## Examples

### Select

<core-knobs hideTabs element="core-overlay">
<core-overlay id="overlay" position-x="center" position-y="center">
  <core-button slot="trigger" full>Button</core-button>
  <core-box style="width: 200px" bg="white" slot="content" depth="sm" >
  <core-menu onclick="overlay.open = false" bordered>
    <core-menu-item>Option 1</core-menu-item>
    <core-menu-item>Option 2</core-menu-item>
  </core-menu>
  </core-box>
</core-overlay>
</core-knobs>
