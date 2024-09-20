import type { Value } from "./types";

/**
 * Wrapper which enables regex match to be applied to the input value
 * @param {RegExp} regex the regex to match
 * @returns {FunctionValue} none operator with values
 */
export const regex = (regex: RegExp): ['regex-match', RegExp] => {
    return ['regex-match', regex];
  };
  

/**
 * Wrapper which enables you to apply a replace map to the returning value
 * @param {[string, string][]} map replacement map
 * @param {Value} value the output value of your filter
 * @returns {FunctionValue} none operator with values
 */
export const replace = (map: [string, string][], value: Value): ['replace', [string, string][], Value] => {
    return ['replace', map, value];
  };
  
  