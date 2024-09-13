/**
 * Will satisfy if the arg is not in the tested value
 * @param {string} arg string to test against
 * @returns {Operator} singluar none operator
 */
export const not = (arg: string): [['none', string]] => {
  return [['none', arg]];
};

/**
 * Will satisfy if any of the args are in the tested value
 * @param {string[]} args array of filters to test against
 * @returns {Operator} any operator with values
 */
export const any = (...args: string[]): ['any', ...string[]] => {
  return ['any', ...args];
};

/**
 * Will satisfy if all of the args are in the tested value
 * @param {string[]} args array of filters to test against
 * @returns {Operator} all operator with values
 */
export const includes = (...args: string[]): ['all', ...string[]] => {
  return ['all', ...args];
};

/**
 * Will satisfy if none of the args are in the tested value
 * @param {string[]} args array of filters to test against
 * @returns {Operator} none operator with values
 */
export const excludes = (...args: string[]): ['none', ...string[]] => {
  return ['none', ...args];
};
