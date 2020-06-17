---
name: Accordion
desc: Accordions
category: Interaction
---

<core-knobs element="core-accordion">
<core-accordion title="Title">
  <core-box margin-y="md">Content</core-box>
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

## Box

The `trigger` slot gets cursor: pointer by default.

<core-knobs hideTabs element="core-accordion">
<style>
  .box {
    padding: var(--core-space-lg);
    border: 1px solid var(--core-color-ui);
    border-radius: var(--core-border-radius-md);
  }
  .box [slot="trigger"] {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .box [slot="trigger"]:hover {
    color: var(--core-color-focus);
  }
  .box[open] .gg-add-r,
  .box .gg-remove-r {
    display: none;
  }
  .box[open] .gg-remove-r,
  .box .gg-add-r {
    display: inline-block;
    margin-right: var(--core-space-md);
  }
</style>
<core-accordion class="box" hide-default-indicator>
  <div slot="trigger">
    <i class="gg-add-r"></i>
    <i class="gg-remove-r"></i>
    <span>How do I do this?</span>
  </div>
  <core-box margin-y="md">This is how you do it</core-box>
</core-accordion>
</core-knobs>
