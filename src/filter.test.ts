import { expect, test } from 'vitest';
import { Filter } from './filter';
import { excludes, includes } from './operators.js';
import { regex, replace } from './values';
import type { Match } from './types';

test('fixed', () => {
  let greetingFilter: Filter;

  greetingFilter = new Filter(['hello']);
  expect(
    greetingFilter.match('hello there').every((filter) => filter === 'hello'),
  ).toBeTruthy();
});

test('tuple', () => {
  let greetingFilter: Filter;

  greetingFilter = new Filter([['hello', 'tuple']]);
  expect(
    greetingFilter.match('hello there').every((filter) => filter === 'tuple'),
  ).toBeTruthy();
});

test('dynamic', () => {
  let greetingFilter: Filter;
  greetingFilter = new Filter([['dynamic', (val) => `${val} is awesome`]]);
  const result = greetingFilter.match('this dynamic value');
  expect(result[0]).toBe('this dynamic value is awesome')
});

test('operators', () => {
  let greetingFilter: Filter;

  greetingFilter = new Filter([[[excludes('hello'), includes('hi')], 'hey']]);

  expect(greetingFilter.match('hi hello everyone')).length(0);
  expect(greetingFilter.match('hi everyone')).length(1);
});


test('replace', () => {
  let greetingFilter: Filter;
  greetingFilter = new Filter([["bong", ['replace', [["bong", "bing"]], value => value]]]);
  const result = greetingFilter.match("bong");
  expect(result).length(1);
  expect(result[0]).toBe("bing")
})


test('regex', () => {
  let greetingFilter: Filter;

  const phoneModelFilter: Match = ["iphone x", replace([["x", "10"]], regex(/iPhone\s?(\w+)/i))];
  greetingFilter = new Filter([phoneModelFilter]);

  const result = greetingFilter.match("sam has an iphone x");
  expect(result).length(1);
  expect(result[0]).toBe("10")
})