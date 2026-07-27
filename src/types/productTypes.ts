import { Product } from '../database/products';

/**
 * Parsed and validated query parameters for the product listing endpoint.
 */
export interface ProductQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit: number;
  offset: number;
  sortBy: 'name' | 'price';
  sortOrder: 'asc' | 'desc';
}

/**
 * Represents a single validation error for a query parameter.
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Result of validating query parameters.
 * Either succeeds with parsed params or fails with a list of errors.
 */
export type ValidationResult =
  { success: true; params: ProductQueryParams } | { success: false; errors: ValidationError[] };

/**
 * Pagination metadata included in successful responses.
 */
export interface PaginationMetadata {
  total: number;
  page: number;
  hasNext: boolean;
}

/**
 * Successful response structure for the product listing endpoint.
 */
export interface ProductListResponse {
  data: Product[];
  metadata: PaginationMetadata;
}

/**
 * Error response structure for invalid requests.
 */
export interface ProductErrorResponse {
  error: string;
}

/**
 * Input body for creating a new product.
 * The id and createdAt are generated server-side.
 */
export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * Result of validating the create product body.
 */
export type CreateProductValidationResult =
  | { success: true; data: CreateProductInput }
  | { success: false; errors: ValidationError[] };
