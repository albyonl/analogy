import {
  isDynamic,
  isFixed,
  isGroup,
  isOperators,
} from './helpers.js';
import { parseValues } from './parsers';
import type { Match } from './types';

export class Filter {
  private matches: Match[];

  constructor(matches: Match[]) {
    this.matches = matches;
  }

  public match(sku: string): string[] {
    let output: string[] = [];

    for (const match of this.matches) {
      isGroup(match, ([condition, value]) => {
        let opsats: boolean[] = [];

        isOperators(condition, (operators) => {
          for (const [operator, ...operands] of operators) {
            if (operator === 'all') {
              // if every single value is included in the SKU, satisfy.
              opsats.push(operands.every((operand) => sku.includes(operand)));
            }

            if (operator === 'any') {
              // if any of the values are included in the SKU, satisfy.
              opsats.push(operands.some((operand) => sku.includes(operand)));
            }

            if (operator === 'none') {
              // if none of the values are included in the SKU, satisfy.
              opsats.push(!operands.some((value) => sku.includes(value)));
            }
          }
        });

        isFixed(condition, (fixed) => {
          opsats.push(sku.includes(fixed));
        });

        if (!opsats.includes(false)) {
          const parsedValues = parseValues(value, sku);
          output.push(...parsedValues);
        }
      });

      isFixed(match, (fixed) => sku.includes(fixed) && output.push(fixed));
      isDynamic(match, (dynamic) => output.push(dynamic(sku)));
    }

    return output;
  }
}

export class FilterList {
  filters: Filter[] = [];

  constructor(filters?: Filter[]) {
    if (filters) this.filters = filters;
  }

  public add(newFilters: Filter | Filter[]): void {
    if (!Array.isArray(newFilters)) {
      this.filters.push(newFilters);
    } else {
      this.filters = [...this.filters, ...newFilters];
    }
  }

  public matchAll(sku: string): string[] {
    let output: string[] = [];
    for (const filter of this.filters) {
      output = [...output, ...filter.match(sku)];
    }
    return output;
  }
}
