# analogy

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An unopinionated helper library for flexible matching across datasets. enabling you to define matching rules based on specific strings, dynamic values, and operators.

### Features:

- Match single values, tuples, or use dynamic functions.
- Chain operators like `includes`, `excludes`, or `any`.
- Add multiple output values for each match.
- Ideal for filtering or categorizing text-based datasets.

### Installation

```bash
npm install analogy
```

### Quick Example:
```typescript
import { Filter } from './filter';
import { includes, excludes } from './operators.js';
import { fixed, dynamic, regex, replace } from './values';

// simple example

let simpleFilter = new Filter(['hello']);

console.log(simpleFilter.match('hello there')); 
// output: ['hello']
// the simple filter matches 'hello' in the input.

// define multiple filters with various operators

let complexFilter = new Filter([
  // match inputs that include "hello" but exclude "world"
  [[includes('hello'), excludes('world')], [fixed('greeting')]],
  
  // match inputs that include "morning" and transform it dynamically
  [[includes('morning')], [dynamic((input) => `${input}, have a great day!`)]],
  
  // replace "bye" with "goodbye" if found
  [[includes('bye')], [replace([dynamic((value) => value)], ['bye', 'goodbye'])]],

  // use regex to replace any version of "iphone x" with "iphone 10"
  [[includes('iphone x')], [replace([regex(/iPhone\s?(\w+)/i)], ['x', '10'])]],
]);

// test with multiple different inputs
console.log(complexFilter.match('hello there')); 
// output: ['greeting']

console.log(complexFilter.match('good morning')); 
// output: ['good morning, have a great day!']

console.log(complexFilter.match('time to say bye')); 
// output: ['goodbye']

console.log(complexFilter.match('I have an iphone x')); 
// output: ['10']

console.log(complexFilter.match('hello world')); 
// output: []  (Since it matches "hello" but also "world", it is excluded)
```

### Operators

- **`any(...args: string[])`**: Matches if **any** of the provided strings are found in the input.
- **`includes(...args: string[])`**: Matches if **all** of the specified strings are found in the input.
- **`excludes(...args: string[])`**: Matches if **none** of the specified strings are found in the input.

### Function Values

- **`replace(children: Value[], ...map: [string, string][])`**: Takes in a child value, and performs a replace on its result with specified replace map
- **`regex(...args: string[])`**: Matches regex on the value, and returns the result

---

Contributions are very welcome, just open a PR :)
