---
name: Slider
desc: A slider
category: Interaction
---

<core-knobs element="core-slider">
<core-slider navigation >
  <core-slider-item name="first">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 1</core-box>
  </core-slider-item>
  <core-slider-item name="second">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 2</core-box>
  </core-slider-item>
  <core-slider-item name="third">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 3</core-box>
  </core-slider-item>
</core-slider>
</core-knobs>

## Prev and Next

<core-knobs hideProps hideEvents element="core-slider">
<core-slider id="Controls">
  <core-slider-item name="first">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 1</core-box>
  </core-slider-item>
  <core-slider-item name="second">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 2</core-box>
  </core-slider-item>
  <core-slider-item name="third">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 3</core-box>
  </core-slider-item>
  <core-slider-item name="fourth">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 4</core-box>
  </core-slider-item>
  <core-slider-item name="fifth">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 5</core-box>
  </core-slider-item>
</core-slider>

<core-button onclick="Controls.prev()">Prev</core-button>
<core-button onclick="Controls.next()">Next</core-button>

</core-knobs>

## Slides to show

<core-knobs  element="core-slider">
<style>
  .three {
    --core-slider-item-gap: var(--core-space-md);
    --core-slider-padding: var(--core-space-md);
    --core-slider-item-width: 33.33%;
  }
</style>

<core-slider class="three" snap-align="center">
  <core-slider-item name="first">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 1</core-box>
  </core-slider-item>
  <core-slider-item name="second">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 2</core-box>
  </core-slider-item>
  <core-slider-item name="third">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 3</core-box>
  </core-slider-item>
  <core-slider-item name="fourth">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 4</core-box>
  </core-slider-item>
  <core-slider-item name="fifth">
    <core-box depth="sm" bg="ui-weak" padding="lg">Hello 5</core-box>
  </core-slider-item>
</core-slider>
</core-knobs>
