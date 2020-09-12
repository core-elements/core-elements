---
slug: tailwind
name: Tailwind
desc: Tailwind
category: Guides
icon: file-tray-stacked-outline
---

#### Example

<iframe width="100%" height="300" src="//jsfiddle.net/waysofperception/rcepafhj/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

<style>
  @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";
</style>

<core-checkbox class="checked:bg-red-500" id="check" onchange="(() => {
if(check.checked) boxtail.classList.add('bg-gray-600')
else boxtail.classList.remove('bg-gray-600')
})()">
<span id="boxtail" slot="box" class="w-4 h-4 rounded-md bg-gray-500"></span>
Checkbox
</core-checkbox>

```html
<style>
  @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";
</style>

<template>
  <core-checkbox
    id="check"
    :checked="checked"
    @change="e => checked = e.target.checked"
  >
    <span slot="box" :class="boxClasses"></span>
    Checkbox
  </core-checkbox>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
      };
    },
    computed: {
      boxClasses() {
        return {
          "w-4": true,
          "h-4": true,
          "bg-gray-500": !checked,
          "bg-blue-500": checked,
        };
      },
    },
  };
</script>
```
