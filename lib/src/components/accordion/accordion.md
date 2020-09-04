---
name: Accordion
desc: Accordions
category: Interaction
icon: file-tray-stacked-outline
---

<core-knobs element="core-accordion-item">
<core-accordion>
  <core-accordion-item heading="Accordion 1">
    <core-box p="md">Content</core-box>
  </core-accordion-item>
  <core-accordion-item heading="Accordion 2">
    <core-box p="md">Content</core-box>
  </core-accordion-item>
  <core-accordion-item heading="Accordion 3">
    <core-box p="md">Content</core-box>
  </core-accordion-item>
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
<core-accordion>
  <core-accordion-item class="indicator" hide-default-indicator heading="Heading">
    <i slot="start" class="gg-chevron-right"></i>
    <core-box p="md">Content</core-box>
  </core-accordion-item>
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
    max-height: 100px;
  }
</style>
<core-accordion>
  <core-accordion-item class="animate" heading="Heading">
    <core-box p="md">Content</core-box>
  </core-accordion-item>
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
<core-accordion>
  <core-accordion-item class="animate-2" heading="Heading">
    <div class="content">
    <core-box p="md">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    </core-box>
    </div>
  </core-accordion-item>
</core-accordion>
</core-knobs>

## Custom

You can override the styles of the trigger by using the `::part(trigger)` selector.
Remember that the default outline styles are defined with box-shadow and not with outline.

<core-knobs hideTabs element="core-accordion">
<style>
  .custom core-accordion-item {
    border: 1px solid var(--core-color-ui);
    border-radius: var(--core-border-radius-md);
    margin-bottom: var(--core-space-sm);
  }
  /* Use focus within to style the box when it has focus */
  .custom core-accordion-item[open] {
    border-color: var(--core-color-primary);
  }
  .custom core-accordion-item[open]::part(trigger) {
    color: var(--core-color-primary);
  }
  .custom core-accordion-item::part(trigger):hover {
    color: var(--core-color-primary);
  }
  .custom core-accordion-item[open] .gg-add-r,
  .custom core-accordion-item .gg-remove-r {
    display: none;
  }
  .custom core-accordion-item[open] .gg-remove-r,
  .custom core-accordion-item .gg-add-r {
    display: inline-block;
    margin-right: var(--core-space-md);
  }
</style>
<core-accordion mode="single" class="custom">
  <core-accordion-item size="lg" heading="How do I do this?" hide-default-indicator>
    <i slot="start" class="gg-add-r"></i>
    <i slot="start" class="gg-remove-r"></i>
    <core-box p="md">This is how you do it</core-box>
  </core-accordion-item>
  <core-accordion-item size="lg" heading="How do I do this?" hide-default-indicator>
    <i slot="start" class="gg-add-r"></i>
    <i slot="start" class="gg-remove-r"></i>
    <core-box p="md">This is how you do it</core-box>
  </core-accordion-item>
</core-accordion>
</core-knobs>

## Another example

<core-knobs hideTabs element="core-accordion">
<style>
  .custom-2 core-accordion-item {
    border: 0;
    box-shadow: var(--core-depth-sm);
    position: relative;
    margin-bottom: var(--core-space-sm);
  }
  .custom-2 [slot="trigger"] {
    padding: var(--core-space-md);
  }
  .custom-2 core-accordion-item {
    border: 0;
  }
  .custom-2 core-button {
    position: absolute;
    right: var(--core-space-md);
    bottom: calc(var(--core-space-md) * -1);
  }
  .custom-2 core-accordion-item[open] ion-icon {
    transform: rotate(180deg);
  }
</style>
<core-accordion mode="single" class="custom-2">
  <core-accordion-item size="lg" heading="How do I do this?" hide-default-indicator>
    <div slot="trigger">
      Hello
      <core-button variant="primary">
        <ion-icon name="arrow-down-outline"></ion-icon>
      </core-button>
    </div>
    <core-box p="md">This is how you do it</core-box>
  </core-accordion-item>
  <core-accordion-item size="lg" heading="How do I do this?" hide-default-indicator>
    <div slot="trigger">
      Hello
      <core-button variant="primary">
          <ion-icon name="arrow-down-outline"></ion-icon>
      </core-button>
    </div>
    <core-box p="md">This is how you do it</core-box>
  </core-accordion-item>
</core-accordion>
</core-knobs>

## With a menu

<core-knobs hideTabs element="core-accordion">
<core-accordion>
  <core-accordion-item heading="Hello">
    <core-menu>
      <core-menu-item>Menu Item 1</core-menu-item>
      <core-menu-item>Menu Item 2</core-menu-item>
      <core-menu-item>Menu Item 3</core-menu-item>
    </core-menu>
  </core-accordion-item>
</core-accordion>
</core-knobs>
