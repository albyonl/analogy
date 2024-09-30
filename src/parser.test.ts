import { parseValues } from './parsers';
import { test, expect } from 'vitest';
import type { Value } from './types';
import { dynamic, regex, replace } from './values';

const processable =
  'hello, this is a test string which works for multi and single values!';

test('mixed', () => {
  const values: Value[] = [
    replace(["hello"], ["hello", ""]),
    regex(/\btest\b/g),
    dynamic((input) => input),
    "test"
  ]
  const parsedValues = parseValues(values, processable);
  for (const value of parsedValues) {
    expect(value !== null && value === "test");
  }
});

