---
name: Box
desc: A general purpose box with padding, border, depth and more
category: Layout
---

<base-knobs src="./components.json" name="base-box">
<base-box padding="lg" depth="md">Box</base-box>
</base-knobs>

## Card

<base-knobs hideTabs src="./components.json" name="base-box">
  <base-box inline depth="sm" radius="md" border="ui-light">
    <img width="400" height="250" src="https://placeimg.com/400/250/tech">
    <base-box padding="md">
      <base-text tag="h2">Card Title</base-text>
      <base-text tag="h6">Subtitle</base-text>
      <base-button type="primary">Click me</base-button>
    </base-box>
  </base-box>
</base-knobs>
