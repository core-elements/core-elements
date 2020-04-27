---
name: Checkbox
desc: A checkbox element
category: Form
---

<base-knobs src="./components.json" name="base-checkbox">
  <base-checkbox>Checkbox</base-checkbox>
</base-knobs>

## Custom icon

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <base-checkbox>
    <i slot="indicator" class="gg-close"></i>
    Checkbox with custom icon
  </base-checkbox>
</base-knobs>

## Indicator animation

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <style>
    .check-animation::part(indicator) {
      opacity: 0;
      transition: all 0.5s ease;
      transform: rotate(-90deg);
    }
    .check-animation[checked]::part(indicator) {
      opacity: 1;
      transform: rotate(0deg);
      color: var(--base-color-white);
    }
  </style>
  <base-checkbox class="check-animation">
    Animate default indicator
  </base-checkbox>
</base-knobs>

## Choice buttons

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <style>
    base-checkbox.choice {
      margin-bottom: var(--base-space-md);
      padding: 0 var(--base-space-md);
      height: var(--base-size-xl);
      border: 2px solid var(--base-color-ui-light);
    }
    base-checkbox.choice:hover {
      border-color: var(--base-color-ui);
    }
    base-checkbox.choice[checked] {
      border-color: var(--base-color-focus);
    }
  </style>
  <base-checkbox class="choice" full>
    <base-flex justify-content="between" align-items="center">
      <div>
        <base-text tag="div" look="h3">Express delivery</base-text>
        <base-text tag="div" look="p">1-2 days</base-text>
      </div>
      <div>
        <base-text tag="h3">30$</base-text>
      </div>
    </base-flex>
  </base-checkbox>
</base-knobs>
