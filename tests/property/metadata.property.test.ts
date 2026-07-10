import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { paginateProducts } from '../../src/services/productService';
import { Product } from '../../src/database/products';
import { ProductQueryParams } from '../../src/types/productTypes';

/**
 * Property 4: Metadata computation
 * Validates: Requirements 1.4, 6.2, 6.3, 6.4
 *
 * For any product array and any valid query parameters, the pagination metadata SHALL satisfy:
 * - total equals the count of products passing all filters (before pagination)
 * - page equals floor(offset / limit) + 1
 * - hasNext equals (offset + limit) < total
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

describe('Property 4: Metadata computation', () => {
  it('metadata.total equals products.length (since products is already filtered)', () => {
    fc.assert(
      fc.property(
        productArrayArbitrary,
        fc.nat({ max: 40 }),
        fc.integer({ min: 1, max: 100 }),
        (products, offset, limit) => {
          const params: ProductQueryParams = {
            limit,
            offset,
            sortBy: 'name',
            sortOrder: 'asc',
          };

          const { metadata } = paginateProducts(products, params);

          expect(metadata.total).toBe(products.length);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('metadata.page equals Math.floor(offset / limit) + 1', () => {
    fc.assert(
      fc.property(
        productArrayArbitrary,
        fc.nat({ max: 40 }),
        fc.integer({ min: 1, max: 100 }),
        (products, offset, limit) => {
          const params: ProductQueryParams = {
            limit,
            offset,
            sortBy: 'name',
            sortOrder: 'asc',
          };

          const { metadata } = paginateProducts(products, params);

          expect(metadata.page).toBe(Math.floor(offset / limit) + 1);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('metadata.hasNext equals (offset + limit) < products.length', () => {
    fc.assert(
      fc.property(
        productArrayArbitrary,
        fc.nat({ max: 40 }),
        fc.integer({ min: 1, max: 100 }),
        (products, offset, limit) => {
          const params: ProductQueryParams = {
            limit,
            offset,
            sortBy: 'name',
            sortOrder: 'asc',
          };

          const { metadata } = paginateProducts(products, params);

          expect(metadata.hasNext).toBe(offset + limit < products.length);
        },
      ),
      { numRuns: 100 },
    );
  });
});
