---
name: Toggle
desc: A general toggle element
category: Form
---

<base-knobs src="./components.json" name="base-toggle">
<base-toggle>Toggle</base-toggle>
</base-knobs>

## Custom icons

<base-knobs hideTabs src="./components.json" name="base-toggle">
<base-toggle>
  <i slot="on" style="--ggs: 0.8;" class="gg-sun"></i>
  Label
  <i slot="off" style="--ggs: 0.8;" class="gg-moon"></i>
</base-toggle>
</base-knobs>

## Animate icon

<base-knobs hideTabs src="./components.json" name="base-toggle">
<style>
  .toggle-animation [slot="on"] {
    opacity: 0;
    transition: all 0.5s ease;
    transform: rotate(-45deg);
  }
  .toggle-animation[checked] [slot="on"] {
    opacity: 1;
    visibility: visible;
    transform: rotate(0deg);
  }
</style>
<base-toggle class="toggle-animation">
  <i slot="on" class="gg-check"></i>
  Label
</base-toggle>
</base-knobs>
