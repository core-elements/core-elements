---
name: Card
desc: Card
category: Layout
icon: albums-outline
elements: ["box"]
---

<core-knobs hideTabs element="core-box">
<core-box overflow="hidden" radius="lg" bg="white" inline depth="sm" border="ui-weakest">
  <img width="400" height="250" alt="Text" src="https://placeimg.com/400/250/tech">
  <core-box p="md">
    <core-text tag="h2">Card Title</core-text>
    <core-text tag="h6">Subtitle</core-text>
    <core-box my="md">
      <core-button variant="primary">Click me</core-button>
    </core-box>
  </core-box>
</core-box>
</core-knobs>

## With context menu

<core-knobs hideTabs element="core-box">
<core-box radius="lg" bg="white" inline depth="sm" border="ui-weakest">
  <core-box overflow="hidden" style="height: 200px; width: 400px" bg-src="https://placeimg.com/400/250/tech">
  </core-box>
  <core-box p="md">
    <core-flex justify-content="between">
      <core-text tag="h2">Card Title</core-text>
      <core-overlay position-x="right" position-y="">
        <core-button slot="trigger" variant="transparent" tabindex="0">Menu</core-button>
        <core-box style="width: 200px" slot="content" depth="md">
          <core-menu role="menu">
            <core-menu-item role="menuitem" tabindex="0">Menu item</core-menu-item>
            <core-menu-item role="menuitem" tabindex="0">Menu item</core-menu-item>
            <core-menu-item role="menuitem" tabindex="0">Menu item</core-menu-item>
          </core-menu>
        </core-box>
      </core-overlay>
    </core-flex>
    <core-text tag="h6">Subtitle</core-text>
    <core-box my="md">
      <core-button variant="primary">Click me</core-button>
    </core-box>
  </core-box>
</core-box>
</core-knobs>
