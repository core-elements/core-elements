---
name: Box
desc: A general purpose box with padding, border, depth and more
category: Layout
---

<core-knobs src="./components.json" name="core-box">
<core-box padding="lg" depth="md">Box</core-box>
</core-knobs>

## Card

<core-knobs hideTabs src="./components.json" name="core-box">
  <core-box bg="white" inline depth="sm" radius="md" border="ui-light">
    <img width="400" height="250" src="https://placeimg.com/400/250/tech">
    <core-box padding="md">
      <core-text tag="h2">Card Title</core-text>
      <core-text tag="h6">Subtitle</core-text>
      <core-button type="primary">Click me</core-button>
    </core-box>
  </core-box>
</core-knobs>
