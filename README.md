# babel-plugin-auto-return

Auto return function result

## Installation

```sh
$ npm install --save-dev babel-plugin-auto-return
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["auto-return"]
}
```

### Via CLI

```sh
$ babel --plugins auto-return script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["auto-return"]
});
```

# License

MIT
