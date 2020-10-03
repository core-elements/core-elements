---
name: Radio
desc: Radio button
category: Form
icon: radio-button-on-outline
element: "radio"
---

<core-knobs element="core-radio">
<core-radio name="example-1" value="1">Option 1</core-radio>
<core-radio name="example-1" value="2">Option 2</core-radio>
<core-radio name="example-1" value="3">Option 3</core-radio>
<core-radio name="example-1" value="4" disabled>Option 4</core-radio>
</core-knobs>

## Options

### Sizes

<core-knobs hideTabs element="core-radio">
<core-radio size="sm" name="example-2" value="1">Small</core-radio>
<core-radio size="md" name="example-2" value="2">Medium</core-radio>
<core-radio size="lg" name="example-2" value="3">Large</core-radio>
</core-knobs>

## Slots

### Indicator

<core-knobs hideTabs element="core-radio">
  <core-radio class="animate" name="example-3">
    Radio
    <i slot="indicator" class="gg-check"></i>
  </core-radio>
  <core-radio class="animate" name="example-3">
    Radio
    <i slot="indicator" class="gg-check"></i>
  </core-radio>
</core-knobs>

## Styling
