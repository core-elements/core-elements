---
name: Checkbox
desc: A checkbox element
category: Form
---

<base-knobs src="./components.json" name="base-checkbox">
  <base-checkbox>Checkbox</base-checkbox>
</base-knobs>

## Sizes

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <base-checkbox size="sm">Sm</base-checkbox>
  <base-checkbox size="md">Md</base-checkbox>
  <base-checkbox size="lg">Lg</base-checkbox>
</base-knobs>

## Animate indicator

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <style>
    .animate::part(indicator) {
      opacity: 0;
      transition: all 0.5s ease;
      transform: rotate(-90deg);
    }
    .animate[checked]::part(indicator) {
      opacity: 1;
      transform: rotate(0deg);
      color: var(--base-color-white);
    }
  </style>
  <base-checkbox class="animate">
    Animate default indicator
  </base-checkbox>
</base-knobs>

## Custom box

<base-knobs hideTabs src="./components.json" name="base-checkbox">
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
  <base-checkbox class="heart">
  <i slot="box" class="gg-heart"></i>
    Custom indicator box
  </base-checkbox>
</base-knobs>

## Custom indicator

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <base-checkbox>
    <i slot="indicator" class="gg-close"></i>
    Checkbox with custom icon
  </base-checkbox>
</base-knobs>

## Choice buttons

<base-knobs hideTabs src="./components.json" name="base-checkbox">
  <style>
    .choice {
      margin-bottom: var(--base-space-md);
      padding: 0 var(--base-space-md);
      height: var(--base-size-xl);
      border: 2px solid var(--base-color-ui-light);
    }
    .choice:hover {
      border-color: var(--base-color-ui);
    }
    .choice[checked] {
      border-color: var(--base-color-focus);
    }
  </style>
  <base-checkbox class="choice" full>
    <base-text tag="div" look="h3">French Fries</base-text>
    <base-text tag="div" look="p">They're really good</base-text>
  </base-checkbox>
  <base-checkbox class="choice" full>
    <base-text tag="div" look="h3">Cheddar</base-text>
    <base-text tag="div" look="p">Melted over yummy stuff</base-text>
  </base-checkbox>
</base-knobs>
