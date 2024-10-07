import type { FixedValue, FunctionValue, Value } from './types';

/**
 * Wrapper which enables regex match to be applied to the input value
 * @param {RegExp} regex the regex to match
 */
export const regex = (regex: RegExp | string): Value => {
  return { type: 'function', value: { type: 'regex-match', value: regex } };
};

/**
 * Wrapper which enables you to apply a replace map to the returning value
 * @param {[string, string][]} map replacement map
 * @param {Value} value the output value of your filter
 */
export const replace = (
  children: Value[],
  ...value: [string, string][]
): Value => {
  return {
    type: 'function',
    value: { type: 'replace', value: value, children },
  };
};

/**
 * Wrapper which enables you to use a dynamic value
 * @param callback the callback function containing input string
 */
export const dynamic = (callback: (input: string) => string): Value => {
  return { type: 'dynamic', value: callback };
};

/**
 * Wrapper returning syntax for fixed values
 * @param {fixed}
 * @param {Value} value the output value of your filter
 */
export const fixed = (value: string): Value => {
  return { type: 'fixed', value: value as FixedValue };
};
