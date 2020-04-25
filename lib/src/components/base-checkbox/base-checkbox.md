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
    }
  </style>
  <base-checkbox class="check-animation">
    Animate default indicator
  </base-checkbox>
  <base-checkbox class="check-animation">
    <i slot="indicator" class="gg-close"></i>
    Animate custom indicator
  </base-checkbox>
</base-knobs>
