---
name: Checkbox
desc: A checkbox element
category: Form
icon: checkbox-outline
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

## Choice buttons

<core-knobs hideTabs  element="core-checkbox">
  <style>
    .choice {
      margin-bottom: var(--core-space-md);
      padding: var(--core-space-md);
      height: auto;
      border: 2px solid var(--core-color-ui);
    }
    .choice:hover {
      border-color: var(--core-color-ui);
    }
    .choice[checked] {
      border-color: var(--core-color-primary);
    }
  </style>
  <core-checkbox class="choice" full>
    <core-text tag="div" look="h3">French Fries</core-text>
    <core-text tag="div" look="p">They're really good</core-text>
  </core-checkbox>
  <core-checkbox class="choice" full>
    <core-text tag="div" look="h3">Cheddar</core-text>
    <core-text tag="div" look="p">Melted over yummy stuff</core-text>
  </core-checkbox>
</core-knobs>
