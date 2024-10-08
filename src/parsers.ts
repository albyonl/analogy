import { value } from './helpers';
import type { Value } from './types';

/**
 * Flattens a value into an array of strings
 * @param value
 * @param sku
 * @returns {string[]} filters
 */
export const parseValues = (values: Value[], sku: string): string[] => {
  let parsed: string[] = [];

  /**
   * Flattens the value of a single Value
   * @param value
   * @returns {string[]} filters
   */
  const getSingleValue = (singleValue: Value): string[] => {
    let flattenedValue: string[] = [];

    value.isDynamicValue(singleValue, (dynamic) =>
      flattenedValue.push(dynamic(sku)),
    );

    value.isFunctionValue(singleValue, (functionValue) => {
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
        const vals = getSingleValue(fvalue);
        console.log('value is', vals);
        return vals.map((val) => {
          for (const [source, dest] of replaceMap) {
            return val.replace(source, dest);
          }
          return val;
        });
      };

      /**
       * Replace replaces the return value based on a provided map
       */
      if (functionValue.type === 'replace') {
        for (const child of functionValue.children) {
          flattenedValue.push(
            ...parseReplacedValues(child, functionValue.value),
          );
        }
      }

      /**
       * Regex returns the matched value from a regex pattern
       */
      if (functionValue.type === 'regex-match') {
        const regex =
          typeof functionValue.value === 'string'
            ? new RegExp(functionValue.value)
            : functionValue.value;
        const match = regex.exec(sku);
        if (match && match[1]) flattenedValue.push(match[1]);
      }
    });

    value.isFixedValue(singleValue, (stringValue) =>
      flattenedValue.push(stringValue),
    );

    return flattenedValue;
  };

  for (const value of values) {
    const result = getSingleValue(value);
    parsed.push(...result);
  }

  return parsed.filter((val) => val !== null);
};
