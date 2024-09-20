export const FunctionValueLiterals = ['regex-match', 'replace'];

export type Dynamic = (sku: string) => string;

/**
 * Function values let you perform preset methods on ordinary values
 * They take a string literal which matches them to a function
 */
export type FunctionValue =
  | ['regex-match', RegExp] // regex
  | ['replace', [string, string][], Value]; // recursive replace

export type Value = Dynamic | FunctionValue | string;
export type Operator = ['any' | 'none' | 'all', ...string[]];
export type Group = [Operator[] | string, Value | Value[]];
export type Match = Group | Dynamic | string;
