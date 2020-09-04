---
name: Box
desc: A general purpose box with padding, border, depth and more
category: Layout
icon: cube-outline
---

<core-knobs element="core-box">
<core-box p="lg" depth="md">Box</core-box>
</core-knobs>

## Card

<core-knobs hideTabs element="core-box">
  <core-box bg="white" inline depth="sm" border="ui-weakest">
    <img width="400" height="250" src="https://placeimg.com/400/250/tech">
    <core-box p="md">
      <core-text tag="h2">Card Title</core-text>
      <core-text tag="h6">Subtitle</core-text>
      <core-box my="md">
        <core-button variant="primary">Click me</core-button>
      </core-box>
    </core-box>
  </core-box>
</core-knobs>

## Pricing table

<core-knobs hideTabs element="core-box">
<style>
  .pricing {
    min-width: 500px;
  }
  .pricing ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .pricing li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .pricing i {
    margin-right: 10px;
  }
</style>
<core-box class="pricing" bg="ui-weakest" p="lg" inline depth="sm">
  <core-text tag="h2">Small</core-text>
  <core-text tag="p" color="weak" >Free</core-text>
  <core-box my="lg">
    <ul full size="md">
      <li>
      <i class="gg-check-o"></i>
      Figma & Sketch Files
      </li>
      <li>
      <i class="gg-check-o"></i>
      Customizable styles
      </li>
      <li>
      <i class="gg-check-o"></i>
      Base elements
      </li>
      <li>
      <i class="gg-remove"></i>
      Headache
      </li>
    </ul>
  </core-box>
  <core-button full variant="primary">Start your free trial</core-button>
</core-box>
</core-knobs>

## Alerts

<core-knobs hideTabs element="core-box">
  <core-box radius="md" margin-b="md" p="lg" color="success" bg="white" full border="success">
    <core-text>Great! You successfully did a thing!</core-text>
  </core-box>
  </core-box>
  <core-box radius="md" margin-b="md" p="lg" color="warning" bg="white" full border="warning">
    <core-text>Ops! You encountered something dangerous!</core-text>
  </core-box>
  </core-box>
  <core-box radius="md" margin-b="md" p="lg" color="danger" bg="white" full border="danger">
    <core-text>Oy! What are you doing?!</core-text>
  </core-box>
  </core-box>
</core-knobs>
