---
name: Toggle
desc: A general toggle element
category: Form
icon: toggle-outline
---

<core-knobs element="core-toggle">
<core-toggle>Toggle</core-toggle>
</core-knobs>

## Sizes

<core-knobs hideTabs  element="core-toggle">
<core-toggle label="Small" size="sm"></core-toggle>
<core-toggle label="Medium" size="md"></core-toggle>
<core-toggle label="Large" size="lg"></core-toggle>
</core-knobs>

## Custom icons

### On / Off

<core-knobs hideTabs  element="core-toggle">
<core-toggle checked>
  <ion-icon slot="on" name="sunny-outline"></ion-icon>
  Label
  <ion-icon slot="off" name="moon-outline"></ion-icon>
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
    transition: all 0.5s ease;
    transform: rotate(-45deg);
  }
  .toggle-animation[checked] [slot="on"] {
    transform: rotate(0deg);
  }
</style>
<core-toggle class="toggle-animation">
  <ion-icon slot="on" name="checkmark-sharp"></ion-icon>
  Label
</core-toggle>
</core-knobs>
