---
name: Accordion
desc: Accordions
category: Elements
---

<base-knobs src="./components.json" name="base-accordion">
  <base-accordion  title="Title">
  <base-box margin-y="md">Content</base-box>
  </base-accordion>
  <base-accordion  title="Title">
    <base-box margin-y="md">
      <base-text tag="h1">Content</base-text>
      <base-text tag="h1">Content</base-text>
      <base-text tag="h1">Content</base-text>
    </base-box>
  </base-accordion>
</base-knobs>

## Custom indicator

<base-knobs hideTabs src="./components.json" name="base-accordion">
<style>
  .indicator [slot="prepend"] {
    transform: rotate(0deg);
    transition: all 0.2s ease;
  }
  .indicator[open] [slot="prepend"] {
    transform: rotate(90deg);
  }
</style>
<base-accordion class="indicator" hide-default-indicator title="Title">
  <i slot="prepend" class="gg-chevron-right"></i>
  <base-box margin-y="md">Content</base-box>
</base-accordion>
</base-knobs>
