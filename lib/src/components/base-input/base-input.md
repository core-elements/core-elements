---
name: Input
desc: A input element
category: Form
---

<base-knobs src="./components.json" name="base-input">
<base-input placeholder="Optional placeholder"></base-input>
</base-knobs>

## Search with icon

<base-knobs hideTabs src="./components.json" name="base-input">
<base-input type="search" placeholder="Search...">
  <ion-icon style="font-size: 2rem" slot="prepend" name="search-outline"></ion-icon>
</base-input>
</base-knobs>

## Input masking

<base-knobs hideTabs src="./components.json" name="base-input">
<base-input type="tel" mask="+(00) 000 00 000" placeholder="Enter phone number">
</base-input>
</base-knobs>

## Validation

### Required input

<base-knobs hideTabs src="./components.json" name="base-input">
<base-input required  autovalidate placeholder="Required input">
<div slot="error">This field is required</div>
</base-input>
</base-knobs>

### Simple email validation

When using without an error slot the default validation error message on input fields is show.
Use a error slot to provide your own error text.

<base-knobs hideTabs src="./components.json" name="base-input">
<base-input required type="email" autovalidate placeholder="Enter email">
  <ion-icon style="font-size: 2rem" slot="prepend" name="mail-outline"></ion-icon>
</base-input>
</base-knobs>

### Validation with status icons

<base-knobs hideTabs src="./components.json" name="base-input">
<style>
  .input-with-status [slot="append"] {
    font-size: 2em;
    display: none;
  }
  .input-with-status [slot="prepend"] {
    font-size: 2em;
    display: block;
  }
  .input-with-status[valid] .check {
    display: block;
  }
  .input-with-status[invalid] .error {
    display: block;
  }
</style>
<base-input class="input-with-status" type="email" autovalidate placeholder="Enter email">
  <ion-icon slot="prepend" name="mail-outline"></ion-icon>
  <ion-icon slot="append" class="check" name="checkmark-outline"></ion-icon>
  <ion-icon slot="append" class="error" name="alert-circle-outline"></ion-icon>
</base-input>
</base-knobs>

## Number with step buttons

<base-knobs hideTabs src="./components.json" name="base-input">
<base-button>-</base-button>
<base-input type="number" placeholder="Search...">
</base-input>
<base-button>+</base-button>
</base-knobs>
