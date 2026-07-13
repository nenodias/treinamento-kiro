import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterProducts } from '../../src/services/productService';
import { Product } from '../../src/database/products';
import { ProductQueryParams } from '../../src/types/productTypes';

/**
 * Property 1: Filter correctness
 * Validates: Requirements 2.1, 2.3, 3.1, 3.2, 3.3, 3.5
 *
 * For any product array and any combination of valid filter parameters,
 * every product in the returned array satisfies all active filter conditions,
 * and no product satisfying all conditions is excluded.
 */

const CATEGORIES = ['eletronicos', 'moveis', 'acessorios', 'roupas', 'livros'];

const productArbitrary: fc.Arbitrary<Product> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 0, maxLength: 100 }),
  price: fc.float({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }),
  category: fc.constantFrom(...CATEGORIES),
  createdAt: fc
    .integer({ min: 1577836800000, max: 1893456000000 })
    .map((ts) => new Date(ts).toISOString()),
});

const productArrayArbitrary = fc.array(productArbitrary, { minLength: 0, maxLength: 30 });

const filterParamsArbitrary: fc.Arbitrary<ProductQueryParams> = fc.record({
  category: fc.option(fc.constantFrom(...CATEGORIES), { nil: undefined }),
  minPrice: fc.option(fc.float({ min: 0, max: 50000, noNaN: true, noDefaultInfinity: true }), {
    nil: undefined,
  }),
  maxPrice: fc.option(fc.float({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }), {
    nil: undefined,
  }),
  limit: fc.constant(10),
  offset: fc.constant(0),
  sortBy: fc.constant('name' as const),
  sortOrder: fc.constant('asc' as const),
});

describe('Property 1: Filter correctness', () => {
  it('every returned product satisfies all active filter conditions', () => {
    fc.assert(
      fc.property(productArrayArbitrary, filterParamsArbitrary, (products, params) => {
        const result = filterProducts(products, params);

        for (const product of result) {
          if (params.category !== undefined) {
            expect(product.category).toBe(params.category);
          }
          if (params.minPrice !== undefined) {
            expect(product.price).toBeGreaterThanOrEqual(params.minPrice);
          }
          if (params.maxPrice !== undefined) {
            expect(product.price).toBeLessThanOrEqual(params.maxPrice);
          }
        }
      }),
      { numRuns: 100 },
    );
  });

  it('no product satisfying all conditions is excluded from the result', () => {
    fc.assert(
      fc.property(productArrayArbitrary, filterParamsArbitrary, (products, params) => {
        const result = filterProducts(products, params);

        // Manually compute the expected set
        const expected = products.filter((product) => {
          if (params.category !== undefined && product.category !== params.category) {
            return false;
          }
          if (params.minPrice !== undefined && product.price < params.minPrice) {
            return false;
          }
          if (params.maxPrice !== undefined && product.price > params.maxPrice) {
            return false;
          }
          return true;
        });

        // The result should contain exactly the same products as our manual filter
        expect(result.length).toBe(expected.length);

        // Every expected product must be in the result
        for (const product of expected) {
          expect(result).toContainEqual(product);
        }
      }),
      { numRuns: 100 },
    );
  });
});
