import {
  type Group,
  type Match,
  type Value,
  type FunctionValue,
} from './types';

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

