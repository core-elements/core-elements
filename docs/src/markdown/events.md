---
slug: Events
name: Events
desc: Events
category: Concepts
icon: file-tray-stacked-outline
---

# Events

Listening to events from a `core-element` works just like a normal HTML element – simply attach an event listener on it.

To see what kind of events an element emits, visit the domumentation for that component and you will find the `events` tab.

## Example

Let's say we have a checkbox that needs to be checked before the user can continue.
By listening to the `change` event on the checkbox element you can react to interactions by the user.

<core-checkbox 
  full 
  id="CoreCheckbox"
  onchange="(() => CoreButton.disabled = !CoreCheckbox.checked)()">
I have read terms and conditions
</core-checkbox>
<core-button disabled id="CoreButton">Submit</core-checkbox>

<core-box mb="lg">
  <core-tabs>
    <core-tab target="javascript" selected>Pure Javascript</core-tab>
    <core-tab target="react">React</core-tab>
    <core-tab target="vue">Vue</core-tab>
    <core-tab target="angular">Angular</core-tab>
  </core-tabs>
</core-box>

<div id="javascript">

```html
<body>
  <div>
    <core-checkbox class="checkbox" full>
      Submit
    </core-checkbox>
    <core-button class="button">Submit</core-button>
  </div>

  <script>
    const checkbox = document.querySelector(".checkbox");
    const button = document.querySelector(".button");

    checkbox.addEventListener("change", (e) => {
      button.disabled = !e.target.checked;
    });
  </script>
</body>
```

</div>

<div id="react">

```jsx
import React, { useState } from "react";
import reactify from "reactify-wc";

const CoreCheckbox = reactify("core-checkbox");
const CoreButton = reactify("core-button");

function Component() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <CoreCheckbox
        full
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        I have read terms and conditions
      </CoreCheckbox>
      <CoreButton disabled={!checked} variant="primary">
        Submit
      </CoreButton>
    </div>
  );
}
```

</div>

<div id="vue">

```html
<template>
  <div>
    <core-checkbox
      :checked="checked"
      @change="e => checked = e.target.disabled"
    >
      I have read terms and conditions
    </core-checkbox>
    <core-button :disabled="!checked">Submit</core-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
      };
    },
  };
</script>
```

</div>
