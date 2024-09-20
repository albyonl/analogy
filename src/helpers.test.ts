import { expect, test } from 'vitest';
import type { Dynamic, FunctionValue } from './types.js';
import { excludes, includes, not } from './operators';
import type { Group, Operator, Value } from './types';
import {
  isDynamic,
  isString,
  isFunctionValue,
  isGroup,
  isMultiValue,
  isOperators,
} from './helpers';

const functionValue: FunctionValue = ["replace", [["bong", "bing"]], "bong"];
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

test('isString', () => {
  let valid = false;
  isString(fixed, () => (valid = true));
  expect(valid).toBeTruthy();
});

test('isMultiValue', () => {
  let valid = false;

  isMultiValue(multiValue, () => (valid = true));
  isMultiValue(singleValue, () => (valid = false));
  isMultiValue(functionValue, () => (valid = false));

  expect(valid).toBeTruthy();
});

test('isFunctionValue', () => {
  let valid = false;

  isFunctionValue(functionValue, () => (valid = true));
  isFunctionValue(multiValue, () => (valid = false));

  expect(valid).toBeTruthy();
});
