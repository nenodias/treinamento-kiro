import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { paginateProducts } from '../../src/services/productService';
import { Product } from '../../src/database/products';
import { ProductQueryParams } from '../../src/types/productTypes';

/**
 * Property 3: Pagination slicing
 * Validates: Requirements 1.2, 1.3, 1.5, 6.1
 *
 * For any product array, valid pagination params (limit ∈ [1,100], offset ≥ 0),
 * the returned data array equals the slice of the input array starting at index `offset`
 * with length at most `limit`. When offset >= length of the array, the data array is empty.
 */

const CATEGORIES = ['eletronicos', 'moveis', 'acessorios', 'roupas', 'livros'];

const productArbitrary: fc.Arbitrary<Product> = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 0, maxLength: 100 }),
  price: fc.float({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }),
  category: fc.constantFrom(...CATEGORIES),
  createdAt: fc.integer({ min: 1577836800000, max: 1893456000000 }).map((ts) => new Date(ts).toISOString()),
});

const productArrayArbitrary = fc.array(productArbitrary, { minLength: 0, maxLength: 30 });

describe('Property 3: Pagination slicing', () => {
  it('returned data equals products.slice(offset, offset + limit) — the correct slice', () => {
    fc.assert(
      fc.property(
        productArrayArbitrary.chain((products) =>
          fc.tuple(
            fc.constant(products),
            fc.integer({ min: 0, max: products.length + 10 }),
            fc.integer({ min: 1, max: 100 })
          )
        ),
        ([products, offset, limit]) => {
          const params: ProductQueryParams = {
            offset,
            limit,
            sortBy: 'name',
            sortOrder: 'asc',
          };

          const result = paginateProducts(products, params);
          const expectedSlice = products.slice(offset, offset + limit);

          expect(result.data).toEqual(expectedSlice);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('when offset >= products.length, data is empty array', () => {
    fc.assert(
      fc.property(
        productArrayArbitrary.chain((products) =>
          fc.tuple(
            fc.constant(products),
            fc.integer({ min: Math.max(products.length, 0), max: Math.max(products.length, 0) + 10 }),
            fc.integer({ min: 1, max: 100 })
          )
        ),
        ([products, offset, limit]) => {
          const params: ProductQueryParams = {
            offset,
            limit,
            sortBy: 'name',
            sortOrder: 'asc',
          };

          const result = paginateProducts(products, params);

          expect(result.data).toEqual([]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('data.length <= limit always', () => {
    fc.assert(
      fc.property(
        productArrayArbitrary.chain((products) =>
          fc.tuple(
            fc.constant(products),
            fc.integer({ min: 0, max: products.length + 10 }),
            fc.integer({ min: 1, max: 100 })
          )
        ),
        ([products, offset, limit]) => {
          const params: ProductQueryParams = {
            offset,
            limit,
            sortBy: 'name',
            sortOrder: 'asc',
          };

          const result = paginateProducts(products, params);

          expect(result.data.length).toBeLessThanOrEqual(limit);
        }
      ),
      { numRuns: 100 }
    );
  });
});
