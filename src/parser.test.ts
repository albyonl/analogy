import { parseValues } from './parsers';
import { test, expect } from 'vitest';
import type { Value } from './types';
import { dynamic, regex, replace } from './values';

const processable =
  'hello number 10, this is a test string which works for multi and single values!';

test('mixed', () => {
  const values: Value[] = [
    replace([regex('(\\d+)')], ['10', '15']),
    regex(/(\d+)/),
    dynamic((input) => input),
    'test',
  ];
  const parsedValues = parseValues(values, processable);
  console.log(parsedValues);
  for (const value of parsedValues) {
    expect(value !== null && value === 'test');
  }
});
