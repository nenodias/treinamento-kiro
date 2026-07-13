import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import request from 'supertest';
import app from '../../src/app';

/**
 * Property 7: Response structure invariant
 * Validates: Requirements 7.2
 *
 * For any valid request (parameters pass validation), the response SHALL contain
 * a `data` field that is an array of Product objects (each with id, name, description,
 * price, category, createdAt) and a `metadata` field that is an object with numeric
 * `total`, numeric `page`, and boolean `hasNext`.
 */

const CATEGORIES = ['eletronicos', 'moveis', 'acessorios'];

const validQueryArbitrary = fc.record({
  limit: fc.integer({ min: 1, max: 100 }),
  offset: fc.integer({ min: 0, max: 50 }),
  sortBy: fc.constantFrom('name', 'price'),
  sortOrder: fc.constantFrom('asc', 'desc'),
  category: fc.option(fc.constantFrom(...CATEGORIES), { nil: undefined }),
  minPrice: fc.option(fc.float({ min: 0, max: 50000, noNaN: true, noDefaultInfinity: true }), {
    nil: undefined,
  }),
  maxPrice: fc.option(fc.float({ min: 0, max: 100000, noNaN: true, noDefaultInfinity: true }), {
    nil: undefined,
  }),
});

describe('Property 7: Response structure invariant', () => {
  it('response contains data array with Product objects and metadata with correct types', async () => {
    await fc.assert(
      fc.asyncProperty(validQueryArbitrary, async (params) => {
        const query: Record<string, string> = {
          limit: String(params.limit),
          offset: String(params.offset),
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
        };

        if (params.category !== undefined) {
          query.category = params.category;
        }
        if (params.minPrice !== undefined) {
          query.minPrice = String(params.minPrice);
        }
        if (params.maxPrice !== undefined) {
          query.maxPrice = String(params.maxPrice);
        }

        const res = await request(app).get('/products').query(query);

        // 1. Response status is 200
        expect(res.status).toBe(200);

        // 2. Response body has `data` that is an array
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);

        // 3. Each item in `data` has required Product fields with correct types
        for (const item of res.body.data) {
          expect(typeof item.id).toBe('string');
          expect(typeof item.name).toBe('string');
          expect(typeof item.description).toBe('string');
          expect(typeof item.price).toBe('number');
          expect(typeof item.category).toBe('string');
          expect(typeof item.createdAt).toBe('string');
        }

        // 4. Response body has `metadata` object with correct types
        expect(res.body).toHaveProperty('metadata');
        expect(typeof res.body.metadata).toBe('object');
        expect(res.body.metadata).not.toBeNull();
        expect(typeof res.body.metadata.total).toBe('number');
        expect(typeof res.body.metadata.page).toBe('number');
        expect(typeof res.body.metadata.hasNext).toBe('boolean');
      }),
      { numRuns: 100 },
    );
  });
});
