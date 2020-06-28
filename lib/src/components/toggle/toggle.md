---
name: Toggle
desc: A general toggle element
category: Form
---

<core-knobs element="core-toggle">
<core-toggle>Toggle</core-toggle>
</core-knobs>

## Custom icons

### On / Off

<core-knobs hideTabs  element="core-toggle">
<core-toggle checked>
  <i slot="on" style="--ggs: 0.8;" class="gg-sun"></i>
  Label
  <i slot="off" style="--ggs: 0.8;" class="gg-moon"></i>
</core-toggle>
</core-knobs>

## Label position

<core-knobs hideTabs  element="core-toggle">
  <style>
    .position {
      flex-direction: row-reverse;
    }
    .position::part(label) {
      margin-right: var(--core-space-md);
      margin-left: 0;
    }
  </style>
  <core-toggle label="Left label" class="position"></core-toggle>
</core-knobs>

### Indicator icon

<core-knobs hideTabs  element="core-toggle">
<style>
  .indicator-icon [slot="indicator"]{
    display: none;
  }
  .indicator-icon[checked] [slot="indicator"]{
    display: block;
  }
</style>
<core-toggle class="indicator-icon" checked>
   <ion-icon slot="indicator" name="checkmark-outline">
  Label
</core-toggle>
</core-knobs>

## Animate icon

<core-knobs hideTabs  element="core-toggle">
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
