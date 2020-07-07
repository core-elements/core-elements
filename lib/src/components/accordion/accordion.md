---
name: Accordion
desc: Accordions
category: Interaction
icon: file-tray-stacked-outline
---

<core-knobs element="core-accordion">
<core-accordion title="Accordion 1">
  <core-box padding="md">Content</core-box>
</core-accordion>
<core-accordion title="Accordion 2">
  <core-box padding="md">Content</core-box>
</core-accordion>
<core-accordion title="Accordion 3">
  <core-box padding="md">Content</core-box>
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
  <core-box padding="md">Content</core-box>
</core-accordion>
</core-knobs>

## Animate content

### With max-width

<core-knobs hideTabs element="core-accordion">
<style>
  .animate::part(content) {
    display: block;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s ease;
  }
  .animate[open]::part(content) {
    max-height: 50px;
  }
</style>
<core-accordion class="animate" title="Title">
  <core-box padding="md">Content</core-box>
</core-accordion>
</core-knobs>

### With keyframes

Unfortunately you cannot apply keyframes on a CSS shadow part.
Because of this you will need to add keyframes on the slotted content like this:

<core-knobs hideTabs element="core-accordion">
<style>
  @keyframes dropdown {
    0% {
      transform: rotateX(-90deg);
    }
    40% {
      transform: rotateX(20deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }
  .animate-2 .content {
    perspective: 1000px;
  }
  .animate-2[open] core-box {
    animation: 650ms both dropdown;
  }
</style>
<core-accordion class="animate-2" title="Title">
  <div class="content">
  <core-box padding="md">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  </core-box>
  </div>
</core-accordion>
</core-knobs>

## Box

You can override the styles of the trigger by using the `::part(trigger)` selector.
Remember that the default outline styles are defined with box-shadow and not with outline.

<core-knobs hideTabs element="core-accordion">
<style>
  .box {
    border: 1px solid var(--core-color-ui);
    border-radius: var(--core-border-radius-md);
  }
  .box::part(trigger) {
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
  }
  /* Use focus within to style the box when it has focus */
  .box:focus-within {
    border-color: var(--core-color-focus);
  }
  .box::part(trigger):focus {
    color: var(--core-color-focus);
    box-shadow: none;
  }
  .box::part(trigger):hover {
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
<core-accordion size="lg" class="box" title="How do I do this?" hide-default-indicator>
  <i slot="start" class="gg-add-r"></i>
  <i slot="start" class="gg-remove-r"></i>
  <core-box padding="md">This is how you do it</core-box>
</core-accordion>
</core-knobs>

## With a menu

<core-knobs hideTabs element="core-accordion">
<core-accordion title="Hello">
  <core-menu>
    <core-menu-item>Menu Item 1</core-menu-item>
    <core-menu-item>Menu Item 2</core-menu-item>
    <core-menu-item>Menu Item 3</core-menu-item>
  </core-menu>
</core-accordion>
</core-knobs>
