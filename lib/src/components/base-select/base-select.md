---
name: Select
desc: Element with option for multiselect, search and more
category: Form
---

<base-knobs src="./components.json" name="base-select">
  <base-select>
    <base-option value="Option 1" selected></base-option>
    <base-option value="Option 2"></base-option>
    <base-option value="Option 3"></base-option>
  </base-select>
</base-knobs>

## Searchable

<base-knobs hideTabs src="./components.json" name="base-select">
  <base-select searchable clearable>
    <base-option value="Option 1" selected></base-option>
    <base-option value="Option 2"></base-option>
    <base-option value="Option 3"></base-option>
  </base-select>
</base-knobs>

## Multiple

<base-knobs hideTabs src="./components.json" name="base-select">
  <base-select multiple>
    <base-option value="Option 1" selected></base-option>
    <base-option value="Option 2"></base-option>
    <base-option value="Option 3"></base-option>
  </base-select>
</base-knobs>

## Grouped

<base-knobs hideTabs src="./components.json" name="base-select">
  <base-select>
    <base-optgroup label="Group 1">
      <base-option value="Option 1" selected></base-option>
      <base-option value="Option 2"></base-option>
      <base-option value="Option 3"></base-option>
    </base-optgroup>
    <base-optgroup label="Group 2">
      <base-option value="Option 4" selected></base-option>
      <base-option value="Option 5"></base-option>
      <base-option value="Option 6"></base-option>
    </base-optgroup>
  </base-select>
</base-knobs>

### Grouped with icons

<base-knobs hideTabs src="./components.json" name="base-select">
  <base-select>
    <base-optgroup label="Group 1">
      <ion-icon slot="prepend" name="people-outline"></ion-icon>
      <base-option value="Option 1" selected></base-option>
      <base-option value="Option 2"></base-option>
      <base-option value="Option 3"></base-option>
    </base-optgroup>
    <base-optgroup label="Group 2">
      <ion-icon slot="prepend" name="person-outline"></ion-icon>
      <base-option value="Option 4" selected></base-option>
      <base-option value="Option 5"></base-option>
      <base-option value="Option 6"></base-option>
    </base-optgroup>
  </base-select>
</base-knobs>
