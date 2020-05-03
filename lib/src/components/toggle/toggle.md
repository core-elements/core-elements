---
name: Toggle
desc: A general toggle element
category: Form
---

<core-knobs src="./components.json" name="core-toggle">
<core-toggle>Toggle</core-toggle>
</core-knobs>

## Custom icons

<core-knobs hideTabs src="./components.json" name="core-toggle">
<core-toggle>
  <i slot="on" style="--ggs: 0.8;" class="gg-sun"></i>
  Label
  <i slot="off" style="--ggs: 0.8;" class="gg-moon"></i>
</core-toggle>
</core-knobs>

## Animate icon

<core-knobs hideTabs src="./components.json" name="core-toggle">
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
<core-toggle class="toggle-animation">
  <i slot="on" class="gg-check"></i>
  Label
</core-toggle>
</core-knobs>
