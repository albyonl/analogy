export type FixedValue = string;
export type DynamicValue = (sku: string) => string;
export type FunctionValue =
  | { type: 'regex-match'; value: RegExp }
  | { type: 'replace'; value: [string, string][]; children: Value[] };

export type ValueType = FixedValue | FunctionValue | DynamicValue;

export type Value =
  | string
  | { type: 'function'; value: FunctionValue }
  | { type: 'fixed'; value: FixedValue }
  | { type: 'dynamic'; value: DynamicValue };

export type Condition = {
  operator: 'includes' | 'excludes' | 'any';
  operands: string[];
};

export type IncludesCondition = Condition & { operator: 'includes' };
export type ExcludesCondition = Condition & { operator: 'excludes' };
export type AnyCondition = Condition & { operator: 'any' };

export type Group = [Condition[], Value[]];
export type Match = string | Group;
