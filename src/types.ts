export type FixedValue = string;
export type DynamicValue = (sku: string) => string;
export type FunctionValue =
  | ['regex-match', RegExp]
  | ['replace', [string, string][], Value];

export type ValueType = FixedValue | FunctionValue | DynamicValue;

export type Value =
  | { type: string; value: ValueType }
  | { type: 'function'; value: FunctionValue }
  | { type: 'fixed'; value: FixedValue }
  | { type: 'dynamic'; value: DynamicValue };

export type Condition = { operator: 'any' | 'none' | 'all'; operands: string[] };
export type Group = [Condition[], Value];
export type Match = string | Group;
