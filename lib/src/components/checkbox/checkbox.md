---
name: Checkbox
desc: A checkbox element
category: Form
icon: checkbox-outline
element: "checkbox"
---

<core-knobs element="core-checkbox">
  <core-checkbox label="Checkbox"></core-checkbox>
</core-knobs>

## Sizes

<core-knobs hideTabs  element="core-checkbox">
  <core-checkbox size="sm">Sm</core-checkbox>
  <core-checkbox size="md">Md</core-checkbox>
  <core-checkbox size="lg">Lg</core-checkbox>
</core-knobs>

## Animate indicator

<core-knobs hideTabs  element="core-checkbox">
  <style>
    .animate:active::part(box) {
      transform: scale(0.85);
    }
    .animate::part(box) {
      transform: scale(1);
      transition: all 0.2s ease;
    }
    .animate::part(indicator) {
      opacity: 0;
      transition: all 0.5s ease;
      transform: rotate(-90deg);
    }
    .animate[checked]::part(indicator) {
      opacity: 1;
      transform: rotate(0deg);
      color: var(--core-color-white);
    }
  </style>
  <core-checkbox class="animate">
    Animate default indicator
  </core-checkbox>
</core-knobs>

## Label position

<core-knobs hideTabs  element="core-checkbox">
  <style>
    .position {
      flex-direction: row-reverse;
    }
    .position::part(label) {
      margin-right: var(--core-space-md);
      margin-left: 0;
    }
  </style>
  <core-checkbox label="Left label" class="position"></core-checkbox>
</core-knobs>

## Style the box

<core-knobs hideTabs  element="core-checkbox">
  <style>
    .box::part(box) {
      border-radius: 50%;
    }
  </style>
  <core-checkbox class="box">
    Custom indicator box
  </core-checkbox>
</core-knobs>

## Custom indicator

<core-knobs hideTabs  element="core-checkbox">
  <core-checkbox>
    <i slot="indicator" class="gg-close"></i>
    Checkbox with custom icon
  </core-checkbox>
</core-knobs>

<core-knobs hideTabs  element="core-checkbox">
  <style>
    .heart::part(box) {
      border: 0;
      background: none;
      box-shadow: none;
    }
    .heart [slot="indicator"] {
      color: lightgray;
    }
    .heart:hover [slot="indicator"] {
      color: gray;
    }
    .heart[checked] [slot="indicator"] {
      color: red;
    }
  </style>
  <core-checkbox class="heart">
    <i slot="indicator" class="gg-heart"></i>
    Remove default box styling
  </core-checkbox>
</core-knobs>
