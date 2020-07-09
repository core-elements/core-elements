---
slug: styling
name: Styling
desc: Styling
category: Concepts
icon: file-tray-stacked-outline
---

# Styling

Being able to style and customize the components exactly like you want is usually a very important thing when it comes to third party UI libraries.

Sometimes it can be challenging when a third party select component uses Emotion for styling, but maybe you pull in a modal component that uses Styled component. Sometimes you can change the hover color, but you cannot change the arrow icon. This fragmentation of different styling techniques can sometimes make it difficult to ahieve consistent styling across components.

With core-elements you get components that can:

- Be styled using pure CSS
- Access all parts of the component for individual styling
- Global CSS variables to quickly change colors and properties on all components
- Local CSS variables to change individual components
- Or hardcode CSS properties yourself.

## Styling individual components

Here is an example on how you can use either CSS variables, or normal properties to style a checkbox label.

<core-box padding-b="lg">
  <core-tabs>
    <core-tab value="variables" selected target="variables">CSS Variables</core-tab>
    <core-tab value="properties" target="properties">Regular properties</core-tab>
  </core-tabs>
</core-box>

<div id="variables">
<core-knobs hideTabs element="core-checkbox">
  <style>
    .checkbox-1 {
      --core-checkbox-label-color: red;
    }
  </style>
  <core-checkbox class="checkbox-1" label="Checkbox label"></core-checkbox>
</core-knobs>
</div>

<div id="properties">

Notice how we use the `::part()` selector to target the part of the element we want.
Because this selector is not supported in all browsers yet, we recommend using CSS variables when possible. However using the selector won't break anything. The style changes will just not show.

<core-knobs hideTabs element="core-checkbox">
  <style>
    .checkbox-2::part(label) {
      color: blue;
    }
  </style>
  <core-checkbox class="checkbox-2" label="Checkbox label"></core-checkbox>
</core-knobs>
</div>
