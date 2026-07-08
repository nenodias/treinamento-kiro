import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateQueryParams } from '../../src/services/productService';

/**
 * Property 5: Validation rejects invalid parameters
 *
 * For any query parameter set containing at least one invalid value,
 * the validator SHALL return a failure result with errors that identify
 * each invalid parameter by name.
 *
 * **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6**
 */
describe('Property 5: Validation rejects invalid parameters', () => {
  // Generators for invalid values per field

  // limit: non-integer, or integer < 1 or > 100
  const invalidLimitArb = fc.oneof(
    fc.integer({ min: -1000, max: 0 }), // integers below valid range
    fc.integer({ min: 101, max: 10000 }), // integers above valid range
    fc.double({ min: 0.1, max: 99.9, noNaN: true, noDefaultInfinity: true })
      .filter((n) => !Number.isInteger(n)), // non-integer numbers
    fc.constant('abc'), // non-numeric string
    fc.constant('3.5'), // string that parses to non-integer
    fc.constant('0'), // zero as string (out of range)
    fc.constant('101'), // above range as string
  );

  // offset: non-integer or < 0
  const invalidOffsetArb = fc.oneof(
    fc.integer({ min: -1000, max: -1 }), // negative integers
    fc.double({ min: 0.1, max: 100, noNaN: true, noDefaultInfinity: true })
      .filter((n) => !Number.isInteger(n)), // non-integer positive numbers
    fc.constant('abc'), // non-numeric string
    fc.constant('-1'), // negative as string
    fc.constant('2.5'), // non-integer as string
  );

  // minPrice: non-numeric or < 0
  const invalidMinPriceArb = fc.oneof(
    fc.integer({ min: -1000, max: -1 }), // negative numbers
    fc.double({ min: -1000, max: -0.01, noNaN: true, noDefaultInfinity: true }), // negative decimals
    fc.constant('abc'), // non-numeric string
    fc.constant('not-a-number'), // non-numeric string
    fc.constant('-1'), // negative as string
  );

  // maxPrice: non-numeric or < 0
  const invalidMaxPriceArb = fc.oneof(
    fc.integer({ min: -1000, max: -1 }), // negative numbers
    fc.double({ min: -1000, max: -0.01, noNaN: true, noDefaultInfinity: true }), // negative decimals
    fc.constant('abc'), // non-numeric string
    fc.constant('xyz'), // non-numeric string
    fc.constant('-5'), // negative as string
  );

  // sortBy: values other than 'name' or 'price'
  const invalidSortByArb = fc
    .string({ minLength: 1, maxLength: 20 })
    .filter((s) => s !== 'name' && s !== 'price');

  // sortOrder: values other than 'asc' or 'desc'
  const invalidSortOrderArb = fc
    .string({ minLength: 1, maxLength: 20 })
    .filter((s) => s !== 'asc' && s !== 'desc');

  it('rejects invalid limit values', () => {
    fc.assert(
      fc.property(invalidLimitArb, (invalidLimit) => {
        const result = validateQueryParams({ limit: invalidLimit });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.errors.some((e) => e.field === 'limit')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('rejects invalid offset values', () => {
    fc.assert(
      fc.property(invalidOffsetArb, (invalidOffset) => {
        const result = validateQueryParams({ offset: invalidOffset });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.errors.some((e) => e.field === 'offset')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('rejects invalid minPrice values', () => {
    fc.assert(
      fc.property(invalidMinPriceArb, (invalidMinPrice) => {
        const result = validateQueryParams({ minPrice: invalidMinPrice });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.errors.some((e) => e.field === 'minPrice')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('rejects invalid maxPrice values', () => {
    fc.assert(
      fc.property(invalidMaxPriceArb, (invalidMaxPrice) => {
        const result = validateQueryParams({ maxPrice: invalidMaxPrice });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.errors.some((e) => e.field === 'maxPrice')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('rejects invalid sortBy values', () => {
    fc.assert(
      fc.property(invalidSortByArb, (invalidSortBy) => {
        const result = validateQueryParams({ sortBy: invalidSortBy });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.errors.some((e) => e.field === 'sortBy')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('rejects invalid sortOrder values', () => {
    fc.assert(
      fc.property(invalidSortOrderArb, (invalidSortOrder) => {
        const result = validateQueryParams({ sortOrder: invalidSortOrder });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.errors.some((e) => e.field === 'sortOrder')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('identifies all invalid fields when multiple parameters are invalid', () => {
    fc.assert(
      fc.property(
        invalidLimitArb,
        invalidOffsetArb,
        invalidSortByArb,
        (invalidLimit, invalidOffset, invalidSortBy) => {
          const result = validateQueryParams({
            limit: invalidLimit,
            offset: invalidOffset,
            sortBy: invalidSortBy,
          });
          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.errors.some((e) => e.field === 'limit')).toBe(true);
            expect(result.errors.some((e) => e.field === 'offset')).toBe(true);
            expect(result.errors.some((e) => e.field === 'sortBy')).toBe(true);
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
