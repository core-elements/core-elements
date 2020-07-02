---
name: Button
desc: A general button element
category: Interaction
icon: tablet-landscape-outline
---

<core-knobs  tab="props" element="core-button">
<core-button>Button</core-button>
</core-knobs>

## Types

<core-knobs hideTabs  element="core-button">
<core-button>Default</core-button>
<core-button type="primary">Primary</core-button>
<core-button type="secondary">Secondary</core-button>
<core-button type="success">Success</core-button>
<core-button type="warning">Warning</core-button>
<core-button type="danger">Danger</core-button>
<core-button type="transparent">Transparent</core-button>
</core-knobs>

## Rounded

<core-knobs hideTabs element="core-button">
<core-button rounded>Rounded</core-button>
</core-knobs>

## Disabled

<core-knobs hideTabs  element="core-button">
<core-button onclick="alert('hello')" disabled type="primary">
  Primary
</core-button>
</core-knobs>

## Sizes

<core-knobs hideTabs  element="core-button">
<core-button size="sm">Small</core-button>
<core-button size="md">Medium</core-button>
<core-button size="lg">Large</core-button>
</core-knobs>

## Full

<core-knobs hideTabs  element="core-button">
<core-button full>Full</core-button>
</core-knobs>

## With icons

<core-knobs hideTabs  element="core-button">
<core-button>
  <i slot="start" class="gg-check"></i>
  Left
</core-button>
<core-button>
  <i slot="end" class="gg-danger"></i>
  Right
</core-button>
<core-button squared>
  <i class="gg-profile"></i>
</core-button>
</core-knobs>

## Group

<core-knobs hideTabs  element="core-button">
<style>
  .group {
    display: flex;
  }
  .group core-button {
    border-radius: 0;
  }
  .group core-button:first-of-type {
    border-top-left-radius: var(--core-border-radius-default);
    border-bottom-left-radius: var(--core-border-radius-default);
  }
  .group core-button:last-of-type {
    border-top-right-radius: var(--core-border-radius-default);
    border-bottom-right-radius: var(--core-border-radius-default);
  }
</style>
<div class="group">
  <core-button >Option</core-button>
  <core-button >Option</core-button>
  <core-button type="primary">Active</core-button>
  <core-button>Option</core-button>
</div>
</core-knobs>
