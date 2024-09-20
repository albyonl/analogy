import { FunctionValueLiterals, type Dynamic, type Group, type Match, type Operator, type Value, type FunctionValue } from './types';

export const isOperators = (
  left: Operator[] | string,
  callback: (operator: Operator[]) => void,
): void => {
  if (Array.isArray(left)) return callback(left);
  return;
};

export const isGroup = (
  match: Match,
  callback: (condition: Group) => void,
): void => {
  if (Array.isArray(match)) return callback(match);
  return;
};

export const isDynamic = (
  match: Match,
  callback: (dynamic: Dynamic) => void,
): void => {
  if (typeof match === 'function') return callback(match);
  return;
};

export const isDynamicValue = (
  match: Value | Value[],
  callback: (dynamic: Dynamic) => void,
): void => {
  if (typeof match === 'function') return callback(match);
  return;
};


export const isString = (
  match: Match | Operator[] | Value | Value[],
  callback: (fixed: string) => void,
): void => {
  if (typeof match === 'string') return callback(match);
  return;
};

// [TODO]: Improve this function
export const isFunctionValue = (value: Value | Value[], callback: (functionValue: FunctionValue) => void): void => {
  if(!Array.isArray(value)) return;
  if(typeof value[0] !== "string") return;
  if(!FunctionValueLiterals.includes(value[0])) return;
  return callback(value as FunctionValue)
}

// [TODO]: Improve this function
export const isMultiValue = (
  value: Value | Value[],
  callback: (value: Value[]) => void,
  fail?: (value: Value) => void
): void => {

  let isFunction = false;
  isFunctionValue(value, () => isFunction = true)
  if(!Array.isArray(value) || isFunction) return fail?.(value as Value);
  return callback(value as Value[])
};
