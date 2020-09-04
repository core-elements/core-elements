---
slug: styling
name: Styling
desc: Styling
category: Concepts
icon: file-tray-stacked-outline
---

# Styling

Being able to style and customize the components exactly like you want is usually a very important thing when it comes to third party UI libraries.

Sometimes it can be challenging when a third party select component uses Emotion for styling, but maybe you pull in a modal component that uses Styled components. Sometimes you can change the hover color, but you cannot change the arrow icon. This fragmentation of different styling techniques can sometimes make it difficult to ahieve consistent styling across components.

With core-elements you get components that can:

- Be styled using pure CSS
- Access all parts of the component for individual styling
- Global CSS variables to quickly change colors and properties on all components
- Local CSS variables to change individual components

## Global-scoped variables

### Customizing your theme

You can customize the colors and appearance of all the components by setting your own values for the global CSS variables. To see all the CSS variables available for global styling, check out the theme editor page.

#### Example

<core-knobs hideTabs>
  <style>
    .my-theme {
      --core-color-primary: green;
      --core-color-primary-hover: darkgreen;
      --core-color-primary-contrast: white;
      --core-element-height-default: 60px;
      --core-border-radius-default: 30px;
      --core-border-width-default: 4px;
      --core-focus-outline: 0px 0px 0px 5px #fbcd83;
    }
  </style>

  <div class="my-theme">
    <core-radio name="radio">Radio</core-radio>
    <core-radio name="radio">Radio 2</core-radio>
    <core-checkbox>Checkbox</core-checkbox>
    <core-toggle>Toggle</core-toggle>
    <core-button variant="primary">Button</core-button>
    <core-select placeholder="Select something">
      <core-option value="1">Option 1</core-option>
      <core-option value="2">Option 2</core-option>
    </core-select>
    <core-input placeholder="Enter something"></core-input>
  </div>
</core-knobs>

### Adding your own variables

Core elements only defines the colors primary, focus, danger, warning, success and ui. These are considered color names that are essential to most web applications.

Let's say you want to add another color variant called `secondary`. We start by defining a secondary color, a secondary hover color, and a secondary contrast color for text that are supposed to go over this color.

<core-knobs hideTabs>
  <style>
    :root {
      --core-color-secondary: red;
      --core-color-secondary-hover: darkred;
      --core-color-secondary-contrast: white;
    }
  </style>
</core-knobs>

If we want to be able to use our new colors for a button element, we simply add a selector for the `variant="secondary"` attribute on the core button element.

Tips: Don't call your variables things like `--core-color-secondary-light`, consider calling them `--core-color-secondary-weak` as this will be easier to reason about if you decide to develop a dark theme.

<core-knobs hideTabs>
  <style>
    :root {
      --core-color-secondary: red;
      --core-color-secondary-hover: darkred;
      --core-color-secondary-contrast: white;
    }
    core-button[variant="secondary"] {
      background-color: var(--core-color-secondary);
      color: var(--core-color-secondary-contrast);
    }
    core-button[variant="secondary"]:hover {
      background-color: var(--core-color-secondary-hover);
    }
  </style>

  <body>
    <core-button variant="primary">Button</core-button>
    <core-button variant="secondary">Button</core-button>
  </body>
</core-knobs>

## Element-scoped variables

Here is an example on how you can use either CSS variables, or normal properties to style a checkbox label.

<core-box pb="lg">
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
