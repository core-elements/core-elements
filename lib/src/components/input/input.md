---
name: Input
desc: A input element
category: Form
---

<core-knobs src="./components.json" name="core-input">
<core-input placeholder="Optional placeholder"></core-input>
</core-knobs>

## Sizes

<core-knobs hideTabs src="./components.json" name="core-input">
<core-input size="sm" placeholder="Small"></core-input>
<core-input size="md" placeholder="Medium"></core-input>
<core-input size="lg" placeholder="Large"></core-input>
</core-knobs>

## Search

<core-knobs hideTabs src="./components.json" name="core-input">
<core-input type="search" placeholder="Search...">
  <ion-icon style="font-size: 2rem" slot="prepend" name="search-outline"></ion-icon>
</core-input>
</core-knobs>

## Number

<core-knobs hideTabs src="./components.json" name="core-input">
<style>
  #NumberInput {
    min-width: 50px;
    text-align: center;
  }
</style>
<core-button onclick="NumberInput.stepDown()">-</core-button>
<core-input id="NumberInput" max="100" min="10" step="10" type="number" ></core-input>
<core-button onclick="NumberInput.stepUp()">+</core-button>
</core-knobs>

## Masking

<core-knobs hideTabs src="./components.json" name="core-input">
<core-input type="tel" mask="+(00) 000 00 000" placeholder="Enter phone number">
</core-input>
</core-knobs>

## Validation

### Required input

<core-knobs hideTabs src="./components.json" name="core-input">
<core-input required  autovalidate placeholder="Required input">
<div slot="error">This field is required</div>
</core-input>
</core-knobs>

### Simple email validation

When using without an error slot the default validation error message on input fields is show.
Use a error slot to provide your own error text.

<core-knobs hideTabs src="./components.json" name="core-input">
<core-input required type="email" autovalidate placeholder="Enter email">
  <ion-icon style="font-size: 2rem" slot="prepend" name="mail-outline"></ion-icon>
</core-input>
</core-knobs>

### Validation with status icons

<core-knobs hideTabs src="./components.json" name="core-input">
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
<core-input class="input-with-status" type="email" autovalidate placeholder="Enter email">
  <ion-icon slot="prepend" name="mail-outline"></ion-icon>
  <ion-icon slot="append" class="check" name="checkmark-outline"></ion-icon>
  <ion-icon slot="append" class="error" name="alert-circle-outline"></ion-icon>
</core-input>
</core-knobs>
