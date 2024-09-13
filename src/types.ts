export type Dynamic = (sku: string) => string;
export type Value = Dynamic | string;
export type Operator = ['any' | 'none' | 'all', ...string[]];
export type Group = [Operator[] | string, Value | Value[]];
export type Match = Group | Dynamic | string;
