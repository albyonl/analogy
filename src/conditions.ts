import type { Condition } from './types';

/**
 * Will satisfy if any of the args are in the tested value
 * @param {string[]} args array of filters to test against
 * @returns {Condition}
 */
export const any = (...args: string[]): Condition => {
  return { operator: 'any', operands: [...args] };
};

/**
 * Will satisfy if all of the args are in the tested value
 * @param {string[]} args array of filters to test against
 * @returns {Operator} all operator with values
 * @returns {Condition}
 */
export const includes = (...args: string[]): Condition => {
  return { operator: 'includes', operands: [...args] };
};

/**
 * Will satisfy if none of the args are in the tested value
 * @param {string[]} args array of filters to test against
 * @returns {Operator} none operator with values
 * @returns {Condition}
 */
export const excludes = (...args: string[]): Condition => {
  return { operator: 'excludes', operands: [...args] };
};
