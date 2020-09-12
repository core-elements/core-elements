---
name: Choice buttons
desc: Choice buttons
category: Interaction
icon: albums-outline
elements: ["checkbox", "radio"]
---

## Checkbox buttons

<core-knobs hideTabs  element="core-checkbox">
  <style>
    .choice {
      margin-bottom: var(--core-space-md);
      padding: var(--core-space-md);
      height: auto;
      border: 2px solid var(--core-color-ui);
    }
    .choice:hover {
      border-color: var(--core-color-ui);
    }
    .choice[checked] {
      border-color: var(--core-color-primary);
    }
  </style>
  <core-checkbox class="choice" full>
    <core-text tag="div" look="h3">French Fries</core-text>
    <core-text tag="div" look="p">They're really good</core-text>
  </core-checkbox>
  <core-checkbox class="choice" full>
    <core-text tag="div" look="h3">Cheddar</core-text>
    <core-text tag="div" look="p">Melted over yummy stuff</core-text>
  </core-checkbox>
</core-knobs>

## Radio buttons

<core-knobs hideTabs  element="core-radio">
<style>
  core-radio.choice {
    height: auto;
    margin-bottom: var(--core-space-md);
    padding: var(--core-space-md);
    border: 2px solid var(--core-color-ui);
  }
  core-radio.choice:hover {
    border-color: var(--core-color-ui);
  }
  core-radio.choice[checked] {
    border-color: var(--core-color-primary);
  }
</style>

<core-radio class="choice" name="example-4" full>
  <core-flex justify-content="between" align-items="center">
  <div>
    <core-text tag="div" look="h3">Standard delivery</core-text>
    <core-text tag="div" look="p">4-5 days</core-text>
  </div>
  <div>
    <core-text tag="h3">19$</core-text>
  </div>
  </core-flex>
</core-radio>
<core-radio class="choice" name="example-4" full>
  <core-flex justify-content="between" align-items="center">
  <div>
    <core-text tag="div" look="h3">Express delivery</core-text>
    <core-text tag="div" look="p">1-2 days</core-text>
  </div>
  <div>
    <core-text tag="h3">30$</core-text>
  </div>
  </core-flex>
</core-radio>

</core-knobs>
