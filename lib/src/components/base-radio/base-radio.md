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
 base-radio [slot="indicator"] {
   opacity: 0;
 }
 base-radio:hover:not([checked]) [slot="indicator"] {
   opacity: 0.5;
 }
 base-radio[checked] [slot="indicator"] {
   opacity: 1;
   color: green;
   fill: green;
 }
</style>

<base-radio name="example-2">
  <span>Radio</span>
  <ion-icon slot="indicator" name="checkmark-outline"></ion-icon>
</base-radio>

<base-radio name="example-2">
  <span>Radio</span>
  <ion-icon slot="indicator" name="checkmark-outline"></ion-icon>
</base-radio>

</base-knobs>
