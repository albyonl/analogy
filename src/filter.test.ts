import { expect, test } from 'vitest';
import { Filter } from './filter';
import { excludes, includes } from './conditions.js';
import { dynamic, fixed, regex, replace } from './values';

/**
 * Simply match accross datasets with a string
 */
test('simple', () => {
  let greetingFilter: Filter;
  greetingFilter = new Filter(['hello']);
  expect(
    greetingFilter.match('hello there').every((filter) => filter === 'hello'),
  ).toBeTruthy();
});

/**
 * Match accross datasets with operators
 */
test('operators', () => {
  let greetingFilter: Filter;

  greetingFilter = new Filter([
    [
      [excludes('hello'), includes('hi')],
      [fixed('hi')] // you can also simply do: ["hi"], without the need for fixed(). But I'd reccomend you don't.
    
    ],
  ]);
  expect(greetingFilter.match('hi hello everyone')).length(0);
  expect(greetingFilter.match('hi everyone')).length(1);
});

/**
 * Dynamically alter the input value with a callback function
 */
test('dynamic', () => {
  let greetingFilter: Filter;
  greetingFilter = new Filter([
    [[includes('interesting')], [dynamic((input) => `${input} is awesome`)]],
  ]);
  const result = greetingFilter.match('this interesting value');
  expect(result[0]).toBe('this interesting value is awesome');
});

/**
 * Replace the result from a match
 * You can nest these as much as you like
 */
test('replace', () => {
  let greetingFilter: Filter;
  greetingFilter = new Filter([
    [
      [includes('bong')],
      [replace([dynamic((value) => value)], ['bong', 'bing'])],
    ],
  ]);
  const result = greetingFilter.match('bong');
  expect(result).length(1);
  expect(result[0]).toBe('bing');
});


/**
 * Apply a regex match to the result of a match
 * 
 */
test('regex', () => {
  let greetingFilter: Filter;
  greetingFilter = new Filter([
    [
      [includes('iphone x')],
      [replace([regex(/iPhone\s?(\w+)/i)], ['x', '10'])],
    ],
  ]);

  const result = greetingFilter.match('sam has an iphone x');
  expect(result).length(1);
  expect(result[0]).toBe('10');
});
