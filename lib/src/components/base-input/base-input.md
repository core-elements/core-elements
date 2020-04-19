---
name: base-input
---

## Base Input

<style>
base-input .check {
  display: none;
}

base-input[valid] .check {
display: block;
color: var(--base-color-success);
}

base-input .danger {
display: none;
color: var(--base-color-danger);
}

base-input[invalid] .danger {
display: block;
}
</style>

<base-knobs hideEvents tab="src" src="./components.json" name="base-input">
<base-input required type="email" errormessage="nei"  autovalidate>
Halla
<div class="check" slot="append">&#10004;</div>
<div class="danger" slot="append">&#x2620;</div>
<div slot="help">Help text</div>
</base-input>
</base-knobs>
