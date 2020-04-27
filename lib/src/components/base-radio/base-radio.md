---
name: Radio
desc: Radio button
category: Form
---

<base-knobs src="./components.json" name="base-radio">
<base-radio name="example-1" value="1">Option 1</base-radio>
<base-radio name="example-1" value="2">Option 2</base-radio>
<base-radio name="example-1" value="3" disabled>Option 3</base-radio>
</base-knobs>

## Custom icons

<base-knobs hideTabs src="./components.json" name="base-radio">
<style>
  base-radio.animate [slot="indicator"] {
    opacity: 0;
    transform: rotate(-45deg);
    transition: transform 0.4s ease;
  }
  base-radio.animate[checked] [slot="indicator"] {
    opacity: 1;
    transform: rotate(0deg);
  }
</style>

<base-radio class="animate" name="example-3">
  <span>Radio</span>
  <i slot="indicator" class="gg-check"></i>
</base-radio>

<base-radio class="animate" name="example-3">
  <span>Radio</span>
  <i slot="indicator" class="gg-check"></i>
</base-radio>
</base-knobs>

## Choice buttons

<base-knobs hideTabs src="./components.json" name="base-radio">
<style>
  base-radio.choice {
    margin-bottom: var(--base-space-md);
    padding: 0 var(--base-space-md);
    height: var(--base-size-xl);
    border: 2px solid var(--base-color-ui-light);
  }
  base-radio.choice:hover {
    border-color: var(--base-color-ui);
  }
  base-radio.choice[checked] {
    border-color: var(--base-color-focus);
  }
</style>

<base-radio class="choice" name="example-4" full>
  <base-flex justify-content="between" align-items="center">
  <div>
    <base-text tag="div" look="h3">Standard delivery</base-text>
    <base-text tag="div" look="p">4-5 days</base-text>
  </div>
  <div>
    <base-text tag="h3">19$</base-text>
  </div>
  </base-flex>
</base-radio>
<base-radio class="choice" name="example-4" full>
  <base-flex justify-content="between" align-items="center">
  <div>
    <base-text tag="div" look="h3">Express delivery</base-text>
    <base-text tag="div" look="p">1-2 days</base-text>
  </div>
  <div>
    <base-text tag="h3">30$</base-text>
  </div>
  </base-flex>
</base-radio>

</base-knobs>
