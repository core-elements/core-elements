---
name: Radio
desc: Radio button
category: Form
---

<base-knobs src="./components.json" name="base-radio">
<base-radio name="example-1">Radio</base-radio>
</base-knobs>

## Custom icons

<base-knobs hideTabs src="./components.json" name="base-radio">
<style>
 .radio-icon [slot="indicator"] {
   opacity: 0;
 }
 .radio-icon:hover:not([checked]) [slot="indicator"] {
   opacity: 0.5;
 }
 .radio-icon[checked] [slot="indicator"] {
   opacity: 1;
   color: green;
   fill: green;
 }
</style>

<base-radio class="radio-icon" name="example-2">
  <span>Radio</span>
  <ion-icon slot="indicator" name="checkmark-outline"></ion-icon>
</base-radio>

<base-radio class="radio-icon" name="example-2">
  <span>Radio</span>
  <ion-icon slot="indicator" name="checkmark-outline"></ion-icon>
</base-radio>

</base-knobs>

## Indicator animation

<base-knobs hideTabs src="./components.json" name="base-radio">
<style>
  .radio-animation [slot="indicator"] {
    opacity: 0;
    transition: all 0.5s ease;
    transform: rotate(-45deg);
  }
  .radio-animation[checked] [slot="indicator"] {
    opacity: 1;
    visibility: visible;
    transform: rotate(0deg);
  }
</style>

<base-radio class="radio-animation" name="example-3">
  <span>Radio</span>
  <ion-icon slot="indicator" name="checkmark-outline"></ion-icon>
</base-radio>

<base-radio class="radio-animation" name="example-3">
  <span>Radio</span>
  <ion-icon slot="indicator" name="checkmark-outline"></ion-icon>
</base-radio>

</base-knobs>
