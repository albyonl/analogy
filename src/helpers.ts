import {
  type DynamicValue,
  type FunctionValue,
  type Group,
  type Match,
  type Value,
} from './types';

namespace match {
  export const isGroup = (
    match: Match,
    callback: (condition: Group) => void,
  ): void => {
    if (Array.isArray(match)) return callback(match);
    return;
  };

  export const isString = (
    match: Match,
    callback: (fixed: string) => void,
  ): void => {
    if (typeof match === 'string') return callback(match);
    return;
  };
}

namespace value {
  export const isDynamicValue = (
    value: Value,
    callback: (DynamicValue: DynamicValue) => void,
  ): void => {
    if (typeof value !== 'string' && value.type === 'dynamic')
      return callback(value.value);
  };

  export const isFunctionValue = (
    value: Value,
    callback: (DynamicValue: FunctionValue) => void,
  ): void => {
    if (typeof value !== 'string' && value.type === 'function')
      return callback(value.value);
  };

  export const isFixedValue = (
    value: Value,
    callback: (stringValue: string) => void,
  ): void => {
    if (typeof value === 'string') return callback(value);
    if (value.type === 'fixed') return callback(value.value);
  };
}

export { match, value };
