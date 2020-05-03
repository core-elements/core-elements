---
name: Checkbox
desc: A checkbox element
category: Form
---

<core-knobs src="./components.json" name="core-checkbox">
  <core-checkbox>Checkbox</core-checkbox>
</core-knobs>

## Sizes

<core-knobs hideTabs src="./components.json" name="core-checkbox">
  <core-checkbox size="sm">Sm</core-checkbox>
  <core-checkbox size="md">Md</core-checkbox>
  <core-checkbox size="lg">Lg</core-checkbox>
</core-knobs>

## Animate indicator

<core-knobs hideTabs src="./components.json" name="core-checkbox">
  <style>
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

## Custom box

<core-knobs hideTabs src="./components.json" name="core-checkbox">
  <style>
    .heart .gg-heart {
      color: lightgray;
    }
    .heart:hover .gg-heart {
      color: gray;
    }
    .heart[checked] .gg-heart {
      color: red;
    }
  </style>
  <core-checkbox class="heart">
  <i slot="box" class="gg-heart"></i>
    Custom indicator box
  </core-checkbox>
</core-knobs>

## Custom indicator

<core-knobs hideTabs src="./components.json" name="core-checkbox">
  <core-checkbox>
    <i slot="indicator" class="gg-close"></i>
    Checkbox with custom icon
  </core-checkbox>
</core-knobs>

## Choice buttons

<core-knobs hideTabs src="./components.json" name="core-checkbox">
  <style>
    .choice {
      margin-bottom: var(--core-space-md);
      padding: 0 var(--core-space-md);
      height: var(--core-size-xl);
      border: 2px solid var(--core-color-ui-light);
    }
    .choice:hover {
      border-color: var(--core-color-ui);
    }
    .choice[checked] {
      border-color: var(--core-color-focus);
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
