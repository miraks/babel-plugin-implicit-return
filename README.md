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

### Object literal

This plugin can't make a function to implicitly return an object literal due to JavaScript syntax limitation. So this won't work:

```javascript
function getObject() {
  { key1: value1, key2: value2 };
}
```

There are two workarounds:

```javascript
// first - assign a result to a variable/constant
function getObject() {
  const obj = { key1: value1, key2: value2 };
}

// second - wrap an object literal in braces
function getObject() {
  ({ key1: value1, key2: value2 });
}
```

# License

MIT
