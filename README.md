# stillness

Immutable manipulation helpers to aid in nested state updates. Inspired by the [Immutable.js](https://github.com/facebook/immutable-js) API.

## Why?

Explain pain of doing nested updates

## How to install

```
npm install --save stillness
```

## How to use

```js
var stillness = require('stillness');

var blog = {
  title: 'The super interesting blog',
  posts: [
    { title: "10 reasons you shouldn't use A", content: "..." },
    { title: "B considered harmful", content: "..." },
    { title: "Learn C in 30 seconds with this one weird trick", content: "..." },
  ]
};

// getIn(path: [string | number], obj: object) : any
getIn(['title'], blog); // => 'The super interesting blog'
getIn(['posts', 0, 'title']) // => "10 reasons you shouldn't use A"


```
