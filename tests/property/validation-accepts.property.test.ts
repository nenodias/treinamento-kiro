import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateQueryParams } from '../../src/services/productService';

/**
 * Property 6: Validation accepts valid parameters
 * Validates: Requirements 1.1, 4.5, 4.6, 5.7
 *
 * For any query parameter set where all provided values are valid
 * (limit integer in [1,100], offset integer ≥ 0, minPrice/maxPrice numeric ≥ 0,
 * sortBy in {name, price}, sortOrder in {asc, desc}, category any string),
 * the validator SHALL return a success result with correctly parsed ProductQueryParams
 * including defaults for omitted parameters.
 */

describe('Property 6: Validation accepts valid parameters', () => {
  it('returns success with correctly parsed params and defaults applied for any valid input', () => {
    // Arbitraries for valid values (or undefined to test defaults)
    const limitArb = fc.option(fc.integer({ min: 1, max: 100 }), { nil: undefined });
    const offsetArb = fc.option(fc.nat({ max: 10000 }), { nil: undefined });
    const minPriceArb = fc.option(
      fc.float({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }),
      { nil: undefined },
    );
    const maxPriceArb = fc.option(
      fc.float({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }),
      { nil: undefined },
    );
    const sortByArb = fc.option(fc.constantFrom('name', 'price'), { nil: undefined });
    const sortOrderArb = fc.option(fc.constantFrom('asc', 'desc'), { nil: undefined });
    const categoryArb = fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined });

    fc.assert(
      fc.property(
        limitArb,
        offsetArb,
        minPriceArb,
        maxPriceArb,
        sortByArb,
        sortOrderArb,
        categoryArb,
        (limit, offset, minPrice, maxPrice, sortBy, sortOrder, category) => {
          // Build query object converting values to strings (simulating query string)
          const query: Record<string, string> = {};

          if (limit !== undefined) {
            query.limit = String(limit);
          }
          if (offset !== undefined) {
            query.offset = String(offset);
          }
          if (minPrice !== undefined) {
            query.minPrice = String(minPrice);
          }
          if (maxPrice !== undefined) {
            query.maxPrice = String(maxPrice);
          }
          if (sortBy !== undefined) {
            query.sortBy = sortBy;
          }
          if (sortOrder !== undefined) {
            query.sortOrder = sortOrder;
          }
          if (category !== undefined) {
            query.category = category;
          }

          const result = validateQueryParams(query);

          // 1. validateQueryParams returns { success: true }
          expect(result.success).toBe(true);

          if (!result.success) return; // type guard

          // 2. params.limit equals provided value or 10 (default)
          expect(result.params.limit).toBe(limit ?? 10);

          // 3. params.offset equals provided value or 0 (default)
          expect(result.params.offset).toBe(offset ?? 0);

          // 4. params.sortBy equals provided value or 'name' (default)
          expect(result.params.sortBy).toBe(sortBy ?? 'name');

          // 5. params.sortOrder equals provided value or 'asc' (default)
          expect(result.params.sortOrder).toBe(sortOrder ?? 'asc');

          // 6. params.minPrice/maxPrice equals provided value when set
          if (minPrice !== undefined) {
            expect(result.params.minPrice).toBe(minPrice);
          } else {
            expect(result.params.minPrice).toBeUndefined();
          }

          if (maxPrice !== undefined) {
            expect(result.params.maxPrice).toBe(maxPrice);
          } else {
            expect(result.params.maxPrice).toBeUndefined();
          }

          // 7. params.category equals provided value when set
          if (category !== undefined) {
            expect(result.params.category).toBe(category);
          } else {
            expect(result.params.category).toBeUndefined();
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
