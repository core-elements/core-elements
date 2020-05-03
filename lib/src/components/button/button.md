---
name: Button
desc: A general button element
category: Elements
---

<core-knobs src="./components.json" tab="props" name="core-button">
<core-button>Button</core-button>
</core-knobs>

## Types

<core-knobs hideTabs src="./components.json" name="core-button">
<core-button>Default</core-button>
<core-button type="primary">Primary</core-button>
<core-button type="secondary">Secondary</core-button>
<core-button type="success">Success</core-button>
<core-button type="danger">Danger</core-button>
<core-button type="transparent">Transparent</core-button>
</core-knobs>

## Disabled

<core-knobs hideTabs src="./components.json" name="core-button">
<core-button disabled>Default</core-button>
<core-button disabled type="primary">Primary</core-button>
<core-button disabled type="secondary">Secondary</core-button>
<core-button disabled type="success">Success</core-button>
<core-button disabled type="danger">Danger</core-button>
<core-button disabled type="transparent">Transparent</core-button>
</core-knobs>

## Sizes

<core-knobs hideTabs src="./components.json" name="core-button">
<core-button size="sm">Small</core-button>
<core-button size="md">Medium</core-button>
<core-button size="lg">Large</core-button>
</core-knobs>

## Full

<core-knobs hideTabs src="./components.json" name="core-button">
<core-button full>Full</core-button>
</core-knobs>

## With icons

<core-knobs hideTabs src="./components.json" name="core-button">
<core-button>
  <i slot="prepend" class="gg-check"></i>
  Full
</core-button>
<core-button>
  <i slot="append" class="gg-danger"></i>
  Full
</core-button>
<core-button>
  <i slot="append" class="gg-chevron-right"></i>
  Full
</core-button>
</core-knobs>

## Outline

<core-knobs hideTabs src="./components.json" name="core-button">
<core-button outline>Default</core-button>
<core-button outline type="primary">Primary</core-button>
<core-button outline type="secondary">Secondary</core-button>
<core-button outline type="success">Success</core-button>
<core-button outline type="danger">Danger</core-button>
<core-button outline type="transparent">Transparent</core-button>
</core-knobs>

## Group

<core-knobs hideTabs src="./components.json" name="core-button">
<core-flex>
  <core-button >Option</core-button>
  <core-button >Option</core-button>
  <core-button type="primary">Active</core-button>
  <core-button>Option</core-button>
</core-flex>
</core-knobs>
