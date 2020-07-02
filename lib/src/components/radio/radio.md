---
name: Radio
desc: Radio button
category: Form
icon: radio-button-on-outline
---

<core-knobs  element="core-radio">
<core-radio name="example-1" value="1">Option 1</core-radio>
<core-radio name="example-1" value="2">Option 2</core-radio>
<core-radio name="example-1" value="3">Option 3</core-radio>
<core-radio name="example-1" value="4" disabled>Option 4</core-radio>
</core-knobs>

## Custom icons

<core-knobs hideTabs  element="core-radio">
<style>
  core-radio.animate [slot="indicator"] {
    opacity: 0;
    transform: rotate(-45deg);
    transition: transform 0.4s ease;
  }
  core-radio.animate[checked] [slot="indicator"] {
    opacity: 1;
    transform: rotate(0deg);
  }
</style>

<core-radio class="animate" name="example-3">
  Radio
  <i slot="indicator" class="gg-check"></i>
</core-radio>
<core-radio class="animate" name="example-3">
  Radio
  <i slot="indicator" class="gg-check"></i>
</core-radio>
</core-knobs>

## Choice buttons

<core-knobs hideTabs  element="core-radio">
<style>
  core-radio.choice {
    margin-bottom: var(--core-space-md);
    padding: 0 var(--core-space-md);
    height: var(--core-size-xl);
    border: 2px solid var(--core-color-ui-light);
  }
  core-radio.choice:hover {
    border-color: var(--core-color-ui);
  }
  core-radio.choice[checked] {
    border-color: var(--core-color-focus);
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
