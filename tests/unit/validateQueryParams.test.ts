import { describe, it, expect } from 'vitest';
import { validateQueryParams } from '../../src/services/productService';

describe('validateQueryParams', () => {
  describe('defaults', () => {
    it('returns success with defaults when query is empty', () => {
      const result = validateQueryParams({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.params.limit).toBe(10);
        expect(result.params.offset).toBe(0);
        expect(result.params.sortBy).toBe('name');
        expect(result.params.sortOrder).toBe('asc');
      }
    });

    it('defaults sortOrder to asc when only sortBy is provided', () => {
      const result = validateQueryParams({ sortBy: 'price' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.params.sortBy).toBe('price');
        expect(result.params.sortOrder).toBe('asc');
      }
    });
  });

  describe('valid boundary values', () => {
    it('accepts limit=1 (minimum)', () => {
      const result = validateQueryParams({ limit: '1' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.params.limit).toBe(1);
      }
    });

    it('accepts limit=100 (maximum)', () => {
      const result = validateQueryParams({ limit: '100' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.params.limit).toBe(100);
      }
    });

    it('accepts offset=0 (minimum)', () => {
      const result = validateQueryParams({ offset: '0' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.params.offset).toBe(0);
      }
    });
  });

  describe('invalid limit', () => {
    it('rejects limit=0', () => {
      const result = validateQueryParams({ limit: '0' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'limit' })]),
        );
      }
    });

    it('rejects limit=101', () => {
      const result = validateQueryParams({ limit: '101' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'limit' })]),
        );
      }
    });

    it('rejects limit=abc (non-numeric)', () => {
      const result = validateQueryParams({ limit: 'abc' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'limit' })]),
        );
      }
    });

    it('rejects limit=3.5 (non-integer)', () => {
      const result = validateQueryParams({ limit: '3.5' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'limit' })]),
        );
      }
    });
  });

  describe('invalid offset', () => {
    it('rejects offset=-1', () => {
      const result = validateQueryParams({ offset: '-1' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'offset' })]),
        );
      }
    });

    it('rejects offset=abc (non-numeric)', () => {
      const result = validateQueryParams({ offset: 'abc' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'offset' })]),
        );
      }
    });

    it('rejects offset=2.5 (non-integer)', () => {
      const result = validateQueryParams({ offset: '2.5' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'offset' })]),
        );
      }
    });
  });

  describe('invalid minPrice', () => {
    it('rejects minPrice=abc (non-numeric)', () => {
      const result = validateQueryParams({ minPrice: 'abc' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'minPrice' })]),
        );
      }
    });

    it('rejects minPrice=-1 (negative)', () => {
      const result = validateQueryParams({ minPrice: '-1' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'minPrice' })]),
        );
      }
    });
  });

  describe('invalid maxPrice', () => {
    it('rejects maxPrice=abc (non-numeric)', () => {
      const result = validateQueryParams({ maxPrice: 'abc' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'maxPrice' })]),
        );
      }
    });

    it('rejects maxPrice=-1 (negative)', () => {
      const result = validateQueryParams({ maxPrice: '-1' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'maxPrice' })]),
        );
      }
    });
  });

  describe('invalid sortBy', () => {
    it('rejects sortBy=invalid', () => {
      const result = validateQueryParams({ sortBy: 'invalid' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'sortBy' })]),
        );
      }
    });
  });

  describe('invalid sortOrder', () => {
    it('rejects sortOrder=invalid', () => {
      const result = validateQueryParams({ sortOrder: 'invalid' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ field: 'sortOrder' })]),
        );
      }
    });
  });

  describe('multiple validation errors', () => {
    it('reports errors for both limit and offset when both are invalid', () => {
      const result = validateQueryParams({ limit: 'abc', offset: 'xyz' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const fields = result.errors.map((e) => e.field);
        expect(fields).toContain('limit');
        expect(fields).toContain('offset');
      }
    });
  });

  describe('valid category', () => {
    it('passes category through as a string', () => {
      const result = validateQueryParams({ category: 'electronics' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.params.category).toBe('electronics');
      }
    });
  });
});
