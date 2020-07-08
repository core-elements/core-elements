---
name: Tabs
desc: Tabs for things
category: Interaction
icon: library-outline
---

<core-knobs element="core-tabs">
<core-tabs>
  <core-tab selected>Tab 1</core-tab>
  <core-tab>Tab 2</core-tab>
</core-tabs>
</core-knobs>

## With targets

<core-knobs  element="core-tabs">
<core-tabs full>
  <core-tab selected target="targetOne">Tab 1</core-tab>
  <core-tab target="targetTwo">Tab 2</core-tab>
</core-tabs>
<div id="targetOne">Target 1</div>
<div id="targetTwo">Target 2</div>
</core-knobs>

## Vertical

<core-knobs  element="core-tabs">
<core-tabs full vertical>
  <core-tab selected>Tab 1</core-tab>
  <core-tab>Tab 2</core-tab>
</core-tabs>
</core-knobs>

## Button style

<core-knobs  element="core-tabs">
<style>
  .buttons core-tab {
    border: 2px solid var(--core-color-ui);
    margin: 0;
    background: var(--core-color-white);
  }
  .buttons core-tab:not(:first-of-type) {
    border-left: 0; 
  }
  .buttons core-tab:first-of-type {
    border-top-left-radius: var(--core-border-radius-default);
    border-bottom-left-radius: var(--core-border-radius-default);
  }
  .buttons core-tab:last-of-type {
    border-top-right-radius: var(--core-border-radius-default);
    border-bottom-right-radius: var(--core-border-radius-default);
  }
  .buttons core-tab[selected] {
    background: var(--core-color-ui-weak);
  }
</style>
<core-tabs class="buttons">
  <core-tab selected target="targetOne">Tab 1</core-tab>
  <core-tab target="targetTwo">Tab 2</core-tab>
</core-tabs>
</core-knobs>
