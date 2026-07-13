import { describe, it, expect } from 'vitest';
import { sortProducts, paginateProducts } from '../../src/services/productService';
import { Product } from '../../src/database/products';
import { ProductQueryParams } from '../../src/types/productTypes';

function makeProduct(overrides: Partial<Product>): Product {
  return {
    id: '1',
    name: 'Default',
    description: 'desc',
    price: 10,
    category: 'cat',
    createdAt: '2024-01-01T00:00:00Z',
    ...overrides,
  };
}

const baseParams: ProductQueryParams = {
  limit: 10,
  offset: 0,
  sortBy: 'name',
  sortOrder: 'asc',
};

describe('sortProducts', () => {
  it('sorts by name ascending (case-insensitive)', () => {
    const products: Product[] = [
      makeProduct({ id: '1', name: 'Charlie', price: 30 }),
      makeProduct({ id: '2', name: 'Alpha', price: 20 }),
      makeProduct({ id: '3', name: 'beta', price: 10 }),
    ];

    const result = sortProducts(products, { ...baseParams, sortBy: 'name', sortOrder: 'asc' });

    expect(result.map((p) => p.name)).toEqual(['Alpha', 'beta', 'Charlie']);
  });

  it('sorts by name descending (case-insensitive)', () => {
    const products: Product[] = [
      makeProduct({ id: '1', name: 'Charlie', price: 30 }),
      makeProduct({ id: '2', name: 'Alpha', price: 20 }),
      makeProduct({ id: '3', name: 'beta', price: 10 }),
    ];

    const result = sortProducts(products, { ...baseParams, sortBy: 'name', sortOrder: 'desc' });

    expect(result.map((p) => p.name)).toEqual(['Charlie', 'beta', 'Alpha']);
  });

  it('sorts by price ascending', () => {
    const products: Product[] = [
      makeProduct({ id: '1', name: 'A', price: 50 }),
      makeProduct({ id: '2', name: 'B', price: 10 }),
      makeProduct({ id: '3', name: 'C', price: 30 }),
    ];

    const result = sortProducts(products, { ...baseParams, sortBy: 'price', sortOrder: 'asc' });

    expect(result.map((p) => p.price)).toEqual([10, 30, 50]);
  });

  it('sorts by price descending', () => {
    const products: Product[] = [
      makeProduct({ id: '1', name: 'A', price: 50 }),
      makeProduct({ id: '2', name: 'B', price: 10 }),
      makeProduct({ id: '3', name: 'C', price: 30 }),
    ];

    const result = sortProducts(products, { ...baseParams, sortBy: 'price', sortOrder: 'desc' });

    expect(result.map((p) => p.price)).toEqual([50, 30, 10]);
  });

  it('uses id as tiebreaker when names are equal', () => {
    const products: Product[] = [
      makeProduct({ id: '3', name: 'Same', price: 10 }),
      makeProduct({ id: '1', name: 'Same', price: 20 }),
      makeProduct({ id: '2', name: 'Same', price: 30 }),
    ];

    const result = sortProducts(products, { ...baseParams, sortBy: 'name', sortOrder: 'asc' });

    expect(result.map((p) => p.id)).toEqual(['1', '2', '3']);
  });

  it('uses id as tiebreaker when prices are equal', () => {
    const products: Product[] = [
      makeProduct({ id: '3', name: 'C', price: 25 }),
      makeProduct({ id: '1', name: 'A', price: 25 }),
      makeProduct({ id: '2', name: 'B', price: 25 }),
    ];

    const result = sortProducts(products, { ...baseParams, sortBy: 'price', sortOrder: 'asc' });

    expect(result.map((p) => p.id)).toEqual(['1', '2', '3']);
  });
});

describe('paginateProducts', () => {
  const fiveProducts: Product[] = [
    makeProduct({ id: '1', name: 'A', price: 10 }),
    makeProduct({ id: '2', name: 'B', price: 20 }),
    makeProduct({ id: '3', name: 'C', price: 30 }),
    makeProduct({ id: '4', name: 'D', price: 40 }),
    makeProduct({ id: '5', name: 'E', price: 50 }),
  ];

  it('returns first page with offset=0, limit=2', () => {
    const result = paginateProducts(fiveProducts, { ...baseParams, offset: 0, limit: 2 });

    expect(result.data).toHaveLength(2);
    expect(result.data.map((p) => p.id)).toEqual(['1', '2']);
    expect(result.metadata.total).toBe(5);
    expect(result.metadata.page).toBe(1);
    expect(result.metadata.hasNext).toBe(true);
  });

  it('returns last partial page with offset=4, limit=2', () => {
    const result = paginateProducts(fiveProducts, { ...baseParams, offset: 4, limit: 2 });

    expect(result.data).toHaveLength(1);
    expect(result.data.map((p) => p.id)).toEqual(['5']);
    expect(result.metadata.total).toBe(5);
    expect(result.metadata.page).toBe(3);
    expect(result.metadata.hasNext).toBe(false);
  });

  it('returns empty data when offset >= total', () => {
    const result = paginateProducts(fiveProducts, { ...baseParams, offset: 10, limit: 2 });

    expect(result.data).toHaveLength(0);
    expect(result.metadata.total).toBe(5);
    expect(result.metadata.hasNext).toBe(false);
  });

  it('computes page as floor(offset/limit) + 1', () => {
    // offset=3, limit=2 → floor(3/2) + 1 = 2
    const result1 = paginateProducts(fiveProducts, { ...baseParams, offset: 3, limit: 2 });
    expect(result1.metadata.page).toBe(2);

    // offset=4, limit=3 → floor(4/3) + 1 = 2
    const result2 = paginateProducts(fiveProducts, { ...baseParams, offset: 4, limit: 3 });
    expect(result2.metadata.page).toBe(2);

    // offset=0, limit=5 → floor(0/5) + 1 = 1
    const result3 = paginateProducts(fiveProducts, { ...baseParams, offset: 0, limit: 5 });
    expect(result3.metadata.page).toBe(1);
  });
});
