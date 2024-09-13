import { parseValues } from './parsers';
import { test, expect } from 'vitest';
import type { Value } from './types';

const processable =
  'hello, this is a test string which works for multi and single values!';

test('multi', () => {
  const values: Value[] = ['hello', () => 'multi'];
  const parsedValues = parseValues(values, processable);
  for (const value of parsedValues) {
    expect(value !== null && typeof value === 'string');
  }
});

test('single', () => {
  let value: Value = 'single';
  let parsedValues = parseValues(value, processable);

  for (const value of parsedValues) {
    expect(value).toBeTypeOf("string")
  }

  value = () => 'test';
  parsedValues = parseValues(value, processable);

  for (const value of parsedValues) {
    expect(value).toBeTypeOf("string");
  }
});
