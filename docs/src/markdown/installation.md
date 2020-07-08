---
slug: installation
name: Installation
desc: Installation
category: Getting Started
icon: file-tray-stacked-outline
---

# Installation

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

The components are now available to use like this:

´´´html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
  </head>
  <body>
  <core-button>Hello</core-button>
  <script src="https://unpkg.com/core-elements"></script>
  </body>
</html>
´´´

### As module

´´´html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
  </head>
  <body>
  <core-button>Hello</core-button>
  <script type="module">
  import CoreButton from '

  </script>
  </body>
</html>
´´´

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
