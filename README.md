# babel-plugin-react-create-element-alias
A babel plugin to change React.createElement to an alias (_rce or other unique variable based on scope) so that it can be better handled in obfuscation (without object property mangling).

- Supports import and require syntax for React.
- Supports async imports and requirejs syntax for React.

## Usage
```js
npm install --save-dev babel-plugin-react-create-element-alias
```

Add it to your bablerc

```js
{
  "presets": ["react", "es2015"],
  "plugins": ["babel-plugin-react-create-element-alias"]
}
```

Before Transpile
```js
import React from 'react';

function SampleComponent(props) {
  const {name} = props;
  return (
    <div className="wrapper">
      <span className="name">{name}</span>
    </div>
  )
}
```

After Transpile
```js
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rce = _react2.default.createElement;


function SampleComponent(props) {
  var name = props.name;

  return _rce(
    "div",
    { className: "wrapper" },
    _rce(
      "span",
      { className: "name" },
      name
    )
  );
}
```

## Before you add this to your project
I worked on this project to experiment with scope and bindings in babel plugin and later thought to open source it. Most of the time you may not need this plugin.

- If you are using gzip / brotli / zopfli compression (which you always should). You might not see a significant reduction in compressed bundle size it may vary from bytes to few kbs. So you should test it before you finalize using it.

- You may be using [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/) pragma if you have different method to handle creating element like in preact its h. You don't need this. But do note defining pragma does not add declaration of you pragma function in your file. for example it will not add `import React, {createElement as rce} from 'react'` or `const _rce = React.createElement`.

- If you can [mangle property](https://github.com/mishoo/UglifyJS2#cli-mangling-property-names---mangle-props) with regex for createElement you will not need this.
