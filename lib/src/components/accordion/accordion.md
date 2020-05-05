---
name: Accordion
desc: Accordions
category: Interaction
---

<core-knobs element="core-accordion">
  <core-accordion  title="Title">
  <core-box margin-y="md">Content</core-box>
  </core-accordion>
  <core-accordion  title="Title">
    <core-box margin-y="md">
      <core-text tag="h1">Content</core-text>
      <core-text tag="h1">Content</core-text>
      <core-text tag="h1">Content</core-text>
    </core-box>
  </core-accordion>
</core-knobs>

## Custom indicator

<core-knobs hideTabs element="core-accordion">
<style>
  .indicator [slot="start"] {
    transform: rotate(0deg);
    transition: all 0.2s ease;
  }
  .indicator[open] [slot="start"] {
    transform: rotate(90deg);
  }
</style>
<core-accordion class="indicator" hide-default-indicator title="Title">
  <i slot="start" class="gg-chevron-right"></i>
  <core-box margin-y="md">Content</core-box>
</core-accordion>
</core-knobs>
