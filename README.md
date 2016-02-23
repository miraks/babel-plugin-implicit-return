# babel-plugin-implicit-return

Implicitly return function result

## Installation

```sh
$ npm install --save-dev babel-plugin-implicit-return
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["implicit-return"]
}
```

### Via CLI

```sh
$ babel --plugins implicit-return script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["implicit-return"]
});
```

## Quirks

Due to JavaScript syntax limitations this plugin can't make a function to implicitly return:

### Object literal

This won't work:

```javascript
function getObject() {
  { key1: value1, key2: value2 };
}
```

There're two workarounds:

```javascript
// first - assign an object to a variable/constant
function getObject() {
  const obj = { key1: value1, key2: value2 };
}

// second - wrap an object literal with braces
function getObject() {
  ({ key1: value1, key2: value2 });
}
```

### Function expression

This won't work:

```javascript
function getFunction() {
  function() {};
}
```

There're four workarounds:

```javascript
// first - use arrow function
function getFunction() {
  () => {};
}

// second - give your function a name
function getObject() {
  function fn() {};
}

// third - assign a function to a variable/constant
function getObject() {
  const fn = function() {};
}

// fourth - wrap a function with braces
function getObject() {
  (function() {});
}
```

# License

MIT
