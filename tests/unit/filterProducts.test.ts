import { describe, it, expect } from 'vitest';
import { filterProducts } from '../../src/services/productService';
import { Product } from '../../src/database/products';
import { ProductQueryParams } from '../../src/types/productTypes';

const testProducts: Product[] = [
  {
    id: '1',
    name: 'Notebook',
    description: 'A laptop',
    price: 2999.99,
    category: 'eletronicos',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mouse',
    description: 'A mouse',
    price: 49.9,
    category: 'eletronicos',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Cadeira',
    description: 'A chair',
    price: 899.0,
    category: 'moveis',
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Mesa',
    description: 'A desk',
    price: 1299.0,
    category: 'moveis',
    createdAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: 'Hub USB',
    description: 'A hub',
    price: 29.99,
    category: 'acessorios',
    createdAt: '2024-01-05T00:00:00Z',
  },
];

const defaultParams: ProductQueryParams = {
  limit: 10,
  offset: 0,
  sortBy: 'name',
  sortOrder: 'asc',
};

describe('filterProducts', () => {
  it('returns products with price >= minPrice', () => {
    const params: ProductQueryParams = { ...defaultParams, minPrice: 899 };
    const result = filterProducts(testProducts, params);

    expect(result).toHaveLength(3);
    expect(result.every((p) => p.price >= 899)).toBe(true);
  });
});
