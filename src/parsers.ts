import {
  isDynamicValue,
  isString,
  isFunctionValue,
  isMultiValue,
} from './helpers';
import type { Value } from './types';

/**
 * Flattens a value into an array of strings
 * @param value 
 * @param sku 
 * @returns {string[]} filters
 */
export const parseValues = (value: Value | Value[], sku: string): string[] => {

  let parsed: string[] = [];

  /**
   * Flattens the value of a single Value
   * @param value 
   * @returns {string[]} filters
   */ 
  const getValue = (value: Value): string[] => {

    let flattenedValue: string[] = [];

    isDynamicValue(value, (dynamic) => {
      flattenedValue.push(dynamic(sku));
    });

    isString(value, (fixed) => {
      flattenedValue.push(fixed);
    });

    isFunctionValue(value, (functionValue) => {
      /**
       * Function which wraps a return value and replaces based on a map
       * Will re-call getValue to enable nested values
       * @param fvalue 
       * @param replaceMap 
       * @returns 
       */
      const parseReplacedValues = (
        fvalue: Value,
        replaceMap: [string, string][],
      ): string[] => {
        const replacedValues = getValue(fvalue).flatMap((replaceSet) => {
          let replacedSet: string[] = [];
          for (const [source, dest] of replaceMap) {
              replacedSet.push(replaceSet.replaceAll(source, dest))
          }
          return replacedSet
        });
        return replacedValues
      };

      /**
       * Replace replaces the return value based on a provided map
       */
      if (functionValue[0] === 'replace') {
        const [_, maps, fvalue] = functionValue;
        flattenedValue.push(...parseReplacedValues(fvalue, maps))
      }

      /**
       * Regex returns the matched value from a regex pattern
       */
      if(functionValue[0] === 'regex-match') {
        const [_, regex] = functionValue;
        const match = sku.match(regex);
        if(match && match[1]) flattenedValue.push(match[1])
      }

    });

    return flattenedValue
  };

  isMultiValue(value, (multi) => {
    for (const val of multi) {
      const result = getValue(val);
      if (result != null) parsed.push(...result);
    }
  }, (single) => {
    const result = getValue(single);
    if(result !== null) parsed.push(...result)
  });

  return parsed.filter(val => val !== null)
};
