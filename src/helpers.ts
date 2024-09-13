import type { Dynamic, Group, Match, Operator, Value } from './types';

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

export const isFixed = (
  match: Match | Operator[] | Value | Value[],
  callback: (fixed: string) => void,
): void => {
  if (typeof match === 'string') return callback(match);
  return;
};

export const isMultiValue = (
  value: Value | Value[],
  callback: (value: Value[]) => void,
): void => {
  if (Array.isArray(value)) return callback(value);
  return;
};
