---
name: Box
desc: A general purpose box with padding, border, depth and more
category: Layout
icon: cube-outline
---

<core-knobs element="core-box">
<core-box padding="lg" depth="md">Box</core-box>
</core-knobs>

## Card

<core-knobs hideTabs element="core-box">
  <core-box bg="white" inline depth="sm" border="ui-lightest">
    <img width="400" height="250" src="https://placeimg.com/400/250/tech">
    <core-box padding="md">
      <core-text tag="h2">Card Title</core-text>
      <core-text tag="h6">Subtitle</core-text>
      <core-box margin-y="md">
        <core-button type="primary">Click me</core-button>
      </core-box>
    </core-box>
  </core-box>
</core-knobs>

## Pricing table

<core-knobs hideTabs element="core-box">
  <core-box style="width: 400px" bg="ui-lightest" padding="lg" inline depth="sm">
    <core-text tag="h2">Small</core-text>
    <core-text tag="p" color="ui" >Free</core-text>
    <core-box margin-y="lg">
      <core-list full size="md">
        <core-list-item>
        <i slot="start" class="gg-check-o"></i>
        Figma & Sketch Files
        </core-list-item>
        <core-list-item>
        <i slot="start" class="gg-check-o"></i>
        Customizable styles
        </core-list-item>
        <core-list-item>
        <i slot="start" class="gg-check-o"></i>
        Base elements
        </core-list-item>
        <core-list-item>
        <i slot="start" class="gg-remove"></i>
        Headache
        </core-list-item>
      </core-list>
    </core-box>
    <core-button full type="primary">Start your free trial</core-button>
  </core-box>
</core-knobs>
