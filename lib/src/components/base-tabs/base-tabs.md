---
name: Tabs
desc: Tabs for things
category: Navigation
---

<base-knobs src="./components.json" name="base-tabs">
<base-tabs>
  <base-tab selected>Tab 1</base-tab>
  <base-tab>Tab 2</base-tab>
</base-tabs>
</base-knobs>

## With targets

<base-knobs src="./components.json" name="base-tabs">
<base-tabs full position="left">
  <base-tab selected target="targetOne">Tab 1</base-tab>
  <base-tab target="targetTwo">Tab 2</base-tab>
</base-tabs>
<div id="targetOne">Target 1</div>
<div id="targetTwo">Target 2</div>
</base-knobs>

## Position

<base-knobs src="./components.json" name="base-tabs">
<base-tabs full position="left">
  <base-tab selected>Tab 1</base-tab>
  <base-tab>Tab 2</base-tab>
</base-tabs>
<base-tabs full position="right">
  <base-tab selected>Tab 1</base-tab>
  <base-tab>Tab 2</base-tab>
</base-tabs>
<base-tabs full position="center">
  <base-tab selected>Tab 1</base-tab>
  <base-tab>Tab 2</base-tab>
</base-tabs>
</base-knobs>

## With buttons

Any child you put inside `base-tabs` will get the `selected` attribute when you click on it.
This means you can also use other elements than the `base-tab` as children, and style them accordingly.

<base-knobs src="./components.json" name="base-tabs">
<style>
base-tabs base-button[selected],
base-tabs base-button[selected]:hover {
  --base-button-bg-color: var(--base-color-primary);
  --base-button-text-color: var(--base-color-white);
}
</style>
<base-tabs>
  <base-button selected>Tab 1</base-button>
  <base-button>Tab 2</base-button>
  <base-button disabled>Tab 3</base-button>
</base-tabs>
</base-knobs>
