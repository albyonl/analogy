import { expect, test } from 'vitest';
import type { Dynamic } from './types.js';
import { excludes, includes, not } from './operators';
import type { Group, Operator, Value } from './types';
import {
  isDynamic,
  isFixed,
  isGroup,
  isMultiValue,
  isOperators,
} from './helpers';

const multiValue: Value[] = ['hola', 'hello'];
const singleValue: Value = 'hej';
const operators: Operator[] = [
  includes('hallo'),
  includes('salve'),
  excludes('goddag'),
];
const group: Group = [operators, multiValue];
const dynamic: Dynamic = () => 'hoi';
const fixed: string = 'yassas';

test('isOperators', () => {
  let valid = false;
  isOperators(operators, () => (valid = true));
  expect(valid).toBeTruthy();
});

test('isGroup', () => {
  let valid = false;
  isGroup(group, () => (valid = true));
  expect(valid).toBeTruthy();
});

test('isDynamic', () => {
  let valid = false;
  isDynamic(dynamic, () => (valid = true));
  expect(valid).toBeTruthy();
});

test('isFixed', () => {
  let valid = false;
  isFixed(fixed, () => (valid = true));
  expect(valid).toBeTruthy();
});

test('isMultiValue', () => {
  let valid = false;
  isMultiValue(multiValue, () => (valid = true));
  expect(valid).toBeTruthy();
  isMultiValue(singleValue, () => (valid = false));
  expect(valid).toBeTruthy();
});
