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

## Custom icons

<base-knobs src="./components.json" name="base-accordion">
<style>
  base-accordion .gg-chevron-right {
    transform: rotate(0deg);
    transition: all 0.2s ease;
  }
  base-accordion[open] .gg-chevron-right {
    transform: rotate(90deg);
  }
</style>
<base-accordion title="Title">
  <i slot="prepend" class="gg-chevron-right"></i>
  <span slot="append"></span>
  <base-box margin-y="md">Content</base-box>
</base-accordion>
</base-knobs>
