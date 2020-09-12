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
