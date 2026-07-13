import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { sortProducts } from '../../src/services/productService';
import { Product } from '../../src/database/products';
import { ProductQueryParams } from '../../src/types/productTypes';

/**
 * Property 2: Sort correctness
 *
 * For any product array and any valid sort parameters (sortBy ∈ {name, price},
 * sortOrder ∈ {asc, desc}), the returned data array SHALL be ordered such that
 * for every consecutive pair (a, b), the sort relation holds:
 * - when sortBy=name, case-insensitive comparison of a.name vs b.name respects sortOrder
 * - when sortBy=price, numeric comparison of a.price vs b.price respects sortOrder
 * When the sort field values are equal, a.id < b.id (ascending id tiebreaker).
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.7
 */

// Generator for a single Product with controlled id for uniqueness
const productArb = (index: number) =>
  fc.record({
    id: fc.constant(String(index)),
    name: fc.oneof(
      fc.string({ minLength: 1, maxLength: 20 }),
      // Include duplicates to test tiebreaker
      fc.constantFrom('Alpha', 'alpha', 'Beta', 'beta', 'Gamma'),
    ),
    description: fc.string({ minLength: 0, maxLength: 50 }),
    price: fc.oneof(
      fc.double({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }),
      // Include duplicate prices to test tiebreaker
      fc.constantFrom(9.99, 19.99, 29.99, 49.99),
    ),
    category: fc.constantFrom('eletronicos', 'moveis', 'acessorios'),
    createdAt: fc.constant('2024-01-01T00:00:00Z'),
  });

// Generator for an array of products with unique ids
const productArrayArb = fc
  .integer({ min: 0, max: 30 })
  .chain((size) => fc.tuple(...Array.from({ length: size }, (_, i) => productArb(i + 1))))
  .map((products) => products as Product[]);

// Generator for sort parameters
const sortParamsArb = fc.record({
  sortBy: fc.constantFrom('name' as const, 'price' as const),
  sortOrder: fc.constantFrom('asc' as const, 'desc' as const),
  limit: fc.constant(10),
  offset: fc.constant(0),
});

describe('Property 2: Sort correctness', () => {
  it('consecutive pairs respect sort order for the sort field', () => {
    fc.assert(
      fc.property(productArrayArb, sortParamsArb, (products, params) => {
        const sorted = sortProducts(products, params as ProductQueryParams);

        // Check consecutive pairs
        for (let i = 0; i < sorted.length - 1; i++) {
          const a = sorted[i];
          const b = sorted[i + 1];

          if (params.sortBy === 'name') {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const cmp = aName.localeCompare(bName);

            if (params.sortOrder === 'asc') {
              expect(cmp).toBeLessThanOrEqual(0);
            } else {
              expect(cmp).toBeGreaterThanOrEqual(0);
            }
          } else {
            // sortBy === 'price'
            if (params.sortOrder === 'asc') {
              expect(a.price).toBeLessThanOrEqual(b.price);
            } else {
              expect(a.price).toBeGreaterThanOrEqual(b.price);
            }
          }
        }
      }),
      { numRuns: 100 },
    );
  });

  it('id tiebreaker is applied when sort field values are equal', () => {
    fc.assert(
      fc.property(productArrayArb, sortParamsArb, (products, params) => {
        const sorted = sortProducts(products, params as ProductQueryParams);

        // Check that when sort field values are equal, id is ascending
        for (let i = 0; i < sorted.length - 1; i++) {
          const a = sorted[i];
          const b = sorted[i + 1];

          const fieldsEqual =
            params.sortBy === 'name'
              ? a.name.toLowerCase().localeCompare(b.name.toLowerCase()) === 0
              : a.price === b.price;

          if (fieldsEqual) {
            // When sort field values are equal, id tiebreaker: a.id < b.id
            expect(a.id < b.id).toBe(true);
          }
        }
      }),
      { numRuns: 100 },
    );
  });
});
