---
name: Select
desc: Element with option for multiselect, search and more
category: Form
---

<core-knobs  element="core-select">
  <core-select>
    <core-option value="Option 1" selected></core-option>
    <core-option value="Option 2" disabled></core-option>
    <core-option value="Option 3"></core-option>
    <core-option value="Option 4"></core-option>
  </core-select>
</core-knobs>

## Searchable

<core-knobs hideTabs  element="core-select">
  <core-select searchable clearable placeholder="Search">
    <core-option value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
</core-knobs>

## No options feedback

<core-knobs hideTabs  element="core-select">
  <core-select searchable placeholder="Search with no results">
    <core-option value="Option 1"></core-option>
    <div slot="no-options">No results found</div>
  </core-select>
</core-knobs>

## Multiple

<core-knobs hideTabs  element="core-select">
  <core-select full multiple list-open-on-select>
    <core-option value="Option 1" selected></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3" selected></core-option>
    <core-option value="Option 4"></core-option>
    <core-option value="Option 5" selected></core-option>
    <core-option value="Option 6" selected></core-option>
  </core-select>
</core-knobs>

## Grouped

<core-knobs hideTabs  element="core-select">
  <core-select>
    <core-optgroup label="Group 1">
      <core-option value="Option 1" selected></core-option>
      <core-option value="Option 2"></core-option>
      <core-option value="Option 3"></core-option>
    </core-optgroup>
    <core-optgroup label="Group 2">
      <core-option value="Option 4" selected></core-option>
      <core-option value="Option 5"></core-option>
      <core-option value="Option 6"></core-option>
    </core-optgroup>
  </core-select>
</core-knobs>

### Grouped with icons

<core-knobs hideTabs  element="core-select">
  <core-select>
    <core-optgroup label="Group 1">
      <ion-icon slot="start" name="people-outline"></ion-icon>
      <core-option value="Option 1" selected></core-option>
      <core-option value="Option 2"></core-option>
      <core-option value="Option 3"></core-option>
    </core-optgroup>
    <core-optgroup label="Group 2">
      <ion-icon slot="start" name="person-outline"></ion-icon>
      <core-option value="Option 4" selected></core-option>
      <core-option value="Option 5"></core-option>
      <core-option value="Option 6"></core-option>
    </core-optgroup>
  </core-select>
</core-knobs>
