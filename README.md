# Analogy

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
import { Filter, includes, excludes } from 'analogy';

// Define a filter for animal-related words
const animalFilter = new Filter([
  // Match a single value
  'meow',

  // Match either value in the tuple ("bark" or "woof")
  ['bark', 'woof'],

  // Match a dynamic value using a function (e.g., "<word> cat")
  [
    'cat',
    (input) => {
      const match = input.match(/\b(\w+)\s+cat\b/); // Match words like "ragdoll cat"
      if (match) return match[0]; // Return the matched word (e.g., "ragdoll cat")
    },
  ],

  // Use operators to match when "dog" is included and "cat" is excluded
  [
    [includes('dog'), excludes('cat')],
    ['dog detected', 'no cats present'],
  ],
]);

// Run some test cases:
console.log(animalFilter.match('dog poodle barks!'));
// Output: ["woof", "dog detected", "no cats present"]

console.log(animalFilter.match('ragdoll cat meows at the dog'));
// Output: ["meow", "ragdoll cat"]

console.log(animalFilter.match('The lion roars, and the dog barks.'));
// Output: ["woof", "dog detected", "no cats present"]
```

---

Analogy allows you to define matching rules in different forms:

- **Single Values**: Simple string matches.
- **Tuples**: Group multiple related values to match any of them.
- **Dynamic Functions**: Use custom logic for dynamic matching, such as regex patterns.
- **Multiple Outputs**: Return an array of output values for each match.

You can combine these with operators for more complex logic.

### Operators

- **`any(...args: string[])`**: Matches if **any** of the provided strings are found in the input.
- **`includes(...args: string[])`**: Matches if **all** of the specified strings are found in the input.
- **`excludes(...args: string[])`**: Matches if **none** of the specified strings are found in the input.

### Multiple Output Values

To return multiple output values for a single match, simply provide an array of outputs as the second argument:

```typescript
const filter = new Filter([
  [includes('dog'), ['dog found', 'barking detected']],
]);
filter.match('The dog is barking!'); // ["dog found", "barking detected"]
```

---

Contributions are very welcome, just open a PR :)
