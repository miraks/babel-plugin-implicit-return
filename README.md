# babel-plugin-implicit-return

Implicitly return function result

## Examples

```javascript
// Before
function Pi() {
  3.14;
}

// After
function Pi() {
  return 3.14;
}
```

```javascript
// Before
function abs(n) {
  if (n > 0) {
    1;
  } else if (n < 0) {
    -1;
  } else {
    0;
  }
}

// After
function abs(n) {
  if (n > 0) {
    return 1;
  } else if (n < 0) {
    return -1;
  } else {
    return 0;
  }
}
```

```javascript
// Before
function sum(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i]
  }
}

// After
function sum(array) {
  var _ret;

  let result = 0;
  for (let i = 0; i < array.length; i++) {
    _ret = result += array[i];
  }
  return _ret;
}
```

```javascript
// Before
function classFactory() {
  class Thingy extends Thing {
    constructor() {
      super();
    }

    fn() {
      () => 1;
    }

    static fn() {
      class Other {};
    }
  }
}

// After
function classFactory() {
  return class Thingy extends Thing {
    constructor() {
      return super();
    }

    fn() {
      return () => 1;
    }

    static fn() {
      return class Other {};
    }
  }
}
```

## Requirements

Your compiling enviroment must have support for:

* [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)

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
  { key1: value1, key2: value2 }; // Syntax Error
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
  function() {}; // Syntax Error
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
