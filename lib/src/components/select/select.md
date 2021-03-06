---
name: Select
desc: Element with option for multiselect, search and more
category: Form
icon: caret-down-circle-outline
---

<core-knobs  element="core-select">
  <core-select>
    <core-option value="Option 1" selected></core-option>
    <core-option value="Option 2" disabled></core-option>
    <core-option value="Option 3"></core-option>
    <core-option value="Option 4"></core-option>
  </core-select>
</core-knobs>

## Options

### Full

<core-knobs hideTabs element="core-select">
  <core-select full>
    <core-option selected value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
</core-knobs>

### Sizes

<core-knobs hideTabs element="core-select">
  <core-select size="sm">
    <core-option selected value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
  <core-select size="md">
    <core-option selected value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
  <core-select size="lg">
    <core-option selected value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
</core-knobs>

### Placeholer

<core-knobs hideTabs element="core-select">
  <core-select placeholder="Choose an option">
    <core-option value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
</core-knobs>

### Searchable

<core-knobs hideTabs  element="core-select">
  <core-select searchable placeholder="Search">
    <core-option value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
</core-knobs>

### Clearable

<core-knobs hideTabs element="core-select">
  <core-select clearable placeholder="Search">
    <core-option selected value="Option 1"></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3"></core-option>
  </core-select>
</core-knobs>

### Multiple

<core-knobs hideTabs  element="core-select">
  <style>
    core-select[multiple] core-option[selected] {
      display: none;
    }
  </style>
  <core-select full multiple list-open-on-select>
    <core-option value="Option 1" selected></core-option>
    <core-option value="Option 2"></core-option>
    <core-option value="Option 3" selected></core-option>
    <core-option value="Option 4"></core-option>
    <core-option value="Option 5" selected></core-option>
    <core-option value="Option 6" selected></core-option>
  </core-select>
</core-knobs>

### Grouped

<core-knobs hideTabs  element="core-select">
  <core-select immediate-select>
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

## Slots

### No options

<core-knobs hideTabs  element="core-select">
  <core-select searchable placeholder="Search with no results">
    <core-option value="Option 1"></core-option>
    <div slot="no-options">No results found</div>
  </core-select>
</core-knobs>

### Start (for icons etc)

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

## Styling

### Animation with keyframes

<core-knobs hideTabs  element="core-select">
  <style>
    .keyframes {
      perspective: 1000px;
    }
    .keyframes::part(list) {
      transform-origin: top;
      transition: all 0.2s cubic-bezier(0.13, 0.06, 0.03, 0);
      transform: rotateX(-90deg);
    }
    .keyframes[list-open]::part(list) {
      transform-origin: top;
      transform: rotateX(0deg);
      transition: all 0.4s cubic-bezier(0.13, 0.06, 0.03, 1.5);
    }
  </style>
  <core-select class="keyframes" full>
      <core-option value="Option 1" selected></core-option>
      <core-option value="Option 2"></core-option>
      <core-option value="Option 3" selected></core-option>
      <core-option value="Option 4"></core-option>
      <core-option value="Option 5" selected></core-option>
      <core-option value="Option 6" selected></core-option>
  </core-select>
</core-knobs>
