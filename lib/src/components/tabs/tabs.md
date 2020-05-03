---
name: Tabs
desc: Tabs for things
category: Navigation
---

<core-knobs src="./components.json" name="core-tabs">
<core-tabs>
  <core-tab selected>Tab 1</core-tab>
  <core-tab>Tab 2</core-tab>
</core-tabs>
</core-knobs>

## With targets

<core-knobs src="./components.json" name="core-tabs">
<core-tabs full position="left">
  <core-tab selected target="targetOne">Tab 1</core-tab>
  <core-tab target="targetTwo">Tab 2</core-tab>
</core-tabs>
<div id="targetOne">Target 1</div>
<div id="targetTwo">Target 2</div>
</core-knobs>

## Position

<core-knobs src="./components.json" name="core-tabs">
<core-tabs full position="left">
  <core-tab selected>Tab 1</core-tab>
  <core-tab>Tab 2</core-tab>
</core-tabs>
<core-tabs full position="right">
  <core-tab selected>Tab 1</core-tab>
  <core-tab>Tab 2</core-tab>
</core-tabs>
<core-tabs full position="center">
  <core-tab selected>Tab 1</core-tab>
  <core-tab>Tab 2</core-tab>
</core-tabs>
</core-knobs>

## With buttons

Any child you put inside `core-tabs` will get the `selected` attribute when you click on it.
This means you can also use other elements than the `core-tab` as children, and style them accordingly.

<core-knobs src="./components.json" name="core-tabs">
<style>
core-tabs core-button[selected],
core-tabs core-button[selected]:hover {
  --core-button-bg-color: var(--core-color-primary);
  --core-button-text-color: var(--core-color-white);
}
</style>
<core-tabs>
  <core-button selected>Tab 1</core-button>
  <core-button>Tab 2</core-button>
  <core-button disabled>Tab 3</core-button>
</core-tabs>
</core-knobs>
