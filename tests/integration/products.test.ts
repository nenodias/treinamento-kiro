import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('GET /products - Integration Tests', () => {
  it('should return 200 with data array and metadata (default params)', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('metadata');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.metadata).toHaveProperty('total');
    expect(response.body.metadata).toHaveProperty('page');
    expect(response.body.metadata).toHaveProperty('hasNext');
  });

  it('should return first 10 products sorted by name asc with page=1 by default', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.metadata.page).toBe(1);
    expect(response.body.metadata.total).toBe(15);
    expect(response.body.metadata.hasNext).toBe(true);

    // Verify sorted by name ascending (case-insensitive)
    const names = response.body.data.map((p: { name: string }) => p.name.toLowerCase());
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
    }
  });

  it('should filter products by category=eletronicos', async () => {
    const response = await request(app).get('/products?category=eletronicos');

    expect(response.status).toBe(200);
    expect(response.body.metadata.total).toBe(8);
    response.body.data.forEach((product: { category: string }) => {
      expect(product.category).toBe('eletronicos');
    });
  });

  it('should filter products by price range (minPrice=500&maxPrice=2000)', async () => {
    const response = await request(app).get('/products?minPrice=500&maxPrice=2000');

    expect(response.status).toBe(200);
    response.body.data.forEach((product: { price: number }) => {
      expect(product.price).toBeGreaterThanOrEqual(500);
      expect(product.price).toBeLessThanOrEqual(2000);
    });
    expect(response.body.metadata.total).toBeGreaterThan(0);
  });

  it('should sort products by price descending', async () => {
    const response = await request(app).get('/products?sortBy=price&sortOrder=desc');

    expect(response.status).toBe(200);
    const prices = response.body.data.map((p: { price: number }) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  it('should paginate with limit=3&offset=3', async () => {
    const response = await request(app).get('/products?limit=3&offset=3');

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
    expect(response.body.metadata.total).toBe(15);
    expect(response.body.metadata.page).toBe(2); // floor(3/3) + 1 = 2
    expect(response.body.metadata.hasNext).toBe(true); // 3 + 3 = 6 < 15
  });

  it('should combine category filter + sort by price asc + pagination (limit=2&offset=0)', async () => {
    const response = await request(app).get(
      '/products?category=eletronicos&sortBy=price&sortOrder=asc&limit=2&offset=0',
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(response.body.metadata.total).toBe(8);
    expect(response.body.metadata.page).toBe(1);
    expect(response.body.metadata.hasNext).toBe(true); // 0 + 2 = 2 < 8

    // All results should be eletronicos
    response.body.data.forEach((product: { category: string }) => {
      expect(product.category).toBe('eletronicos');
    });

    // Should be sorted by price ascending
    const prices = response.body.data.map((p: { price: number }) => p.price);
    expect(prices[0]).toBeLessThanOrEqual(prices[1]);
  });

  it('should return 400 with error field for invalid limit (limit=abc)', async () => {
    const response = await request(app).get('/products?limit=abc');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('limit');
  });

  it('should return 400 with error mentioning both invalid params (limit=0&offset=-1)', async () => {
    const response = await request(app).get('/products?limit=0&offset=-1');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('limit');
    expect(response.body.error).toContain('offset');
  });

  it('should return 200 with empty data array for non-existent category', async () => {
    const response = await request(app).get('/products?category=inexistente');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
    expect(response.body.metadata.total).toBe(0);
  });

  it('should return 200 with empty data and hasNext=false when offset exceeds total', async () => {
    const response = await request(app).get('/products?offset=1000');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
    expect(response.body.metadata.hasNext).toBe(false);
  });
});
