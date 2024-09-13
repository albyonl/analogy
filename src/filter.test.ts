import { expect, test } from 'vitest';
import { Filter } from './filter';
import { excludes, includes } from './operators.js';

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

  greetingFilter = new Filter([['hello', (val) => val]]);
  expect(
    greetingFilter
      .match('hey dynamic')
      .every((filter) => filter === 'hello dynamic'),
  ).toBeTruthy();
});

test('operators', () => {
  let greetingFilter: Filter;

  greetingFilter = new Filter([[[excludes('hello'), includes('hi')], 'hey']]);

  expect(greetingFilter.match('hi hello everyone')).length(0);
  expect(greetingFilter.match('hi everyone')).length(1);
});
