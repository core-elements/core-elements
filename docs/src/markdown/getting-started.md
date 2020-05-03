# Getting Started

## Introduction

Standard HTML elements like `<checkbox>` and `<select>` are notoriously difficult to style and does not provide enough customizablility to be sufficient for more than basic web pages.

Core Elements is a collection of common, general-purpose UI elements such as lists, menus, modals, multi-select, and so on. The elements are easy to style and customize for your needs.

## Installation

<core-tabs>
  <core-tab target="cdn-tab" selected>CDN</core-tab>
  <core-tab target="npm-tab">NPM</core-tab>
</core-tabs>

<div id="cdn-tab">

### CDN

Create an `index.html` file and load the components with the CDN at the end of `<body>`:

```html
<script src="https://unpkg.com/core-elements"></script>
```

That's it. Now you're ready to use the elements.

</div>

<div id="npm-tab">

### NPM

Run this command in the root of your project:

```js
npm install --save core-elements

```

Then import all the components:

```js
import * from "core-elements";
```

or individual component:

```js
import { CoreButton } from "core-elements";
```

</div>
