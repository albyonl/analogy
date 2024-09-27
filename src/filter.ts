import { isString, isGroup } from './helpers.js';
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
      isGroup(match, ([conditions, value]) => {
        let operatorResults: boolean[] = [];

        for (const condition of conditions) {
          if (condition.operator === 'all') {
            operatorResults.push(
              condition.operands.every((operand) => sku.includes(operand)),
            );
          }

          if (condition.operator === 'any') {
            operatorResults.push(
              condition.operands.some((operand) => sku.includes(operand)),
            );
          }

          if (condition.operator === 'none') {
            operatorResults.push(
              !condition.operands.some((operand) => sku.includes(operand)),
            );
          }
        }

        // if all operators are satisfied parse values and add it to ouput
        if (!operatorResults.includes(false)) {
          const parsedValues = parseValues(value, sku);
          output.push(...parsedValues);
        }
      });

      isString(
        match,
        (stringValue) => sku.includes(stringValue) && output.push(stringValue),
      );
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
