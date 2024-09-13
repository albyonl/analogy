import { isDynamic, isFixed, isMultiValue } from './helpers';
import type { Value } from './types';

export const parseValues = (value: Value | Value[], sku: string): string[] => {
  let parsed: string[] = [];

  const getFixedOrDynamicValue = (value: Value): string | null => {
    let val: string | null = null;
    isDynamic(value, (dynamic) => {
      val = dynamic(sku);
    });
    isFixed(value, (fixed) => {
      val = fixed;
    });
    return val;
  };

  isFixed(value, (single) => {
    const result = getFixedOrDynamicValue(single);
    if (result !== null) parsed.push(result);
  });

  isMultiValue(value, (multi) => {
    for (const val of multi) {
      const result = getFixedOrDynamicValue(val);
      if (result != null) parsed.push(result);
    }
  });

  return parsed;
};
