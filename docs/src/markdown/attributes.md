---
slug: attributes
name: Attributes
desc: Attributes
category: Concepts
icon: file-tray-stacked-outline
---

# Attributes

Elements in HTML have attributes; these are additional values that configure the elements or adjust their behavior in various ways to meet the criteria the users want.

## Examples

Let's take the `core-select` element as an example. Because of it's complexity, it is also the element with the most amount of attributes so we can control its behaviour according to our needs.

Play around by modifying the different attributes, and look at the src tab to see how the HTML looks like when the attribute is added

<core-knobs hideEvents tab="props" element="core-select">
  <core-select>
    <core-option value="1" selected>Label 1</core-option>
    <core-option value="2">Label 2</core-option>
    <core-option value="3">Label 3</core-option>
  </core-select>
</core-knobs>

<core-checkbox 
  full 
  id="CoreCheckbox"
  onchange="(() => CoreButton.disabled = !CoreCheckbox.checked)()">
I have read terms and conditions
</core-checkbox>
<core-button disabled id="CoreButton">Submit</core-checkbox>

<core-box margin-b="lg">
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
      I have read terms and conditions
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
