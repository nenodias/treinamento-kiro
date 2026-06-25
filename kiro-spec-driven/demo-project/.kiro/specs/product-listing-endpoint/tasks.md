# Implementation Plan: Product Listing Endpoint

## Overview

Implement a `GET /products` endpoint with filtering (category, price range), sorting (name/price), and pagination (limit/offset) capabilities. The implementation follows a pure-function pipeline architecture: Validate → Filter → Sort → Paginate → Respond. Each step is built incrementally, with property-based tests validating correctness properties from the design.

## Tasks

- [x] 1. Set up project structure, types, and testing infrastructure
  - [x] 1.1 Create shared type definitions in `src/types/productTypes.ts`
    - Define `ProductQueryParams`, `ValidationError`, `ValidationResult`, `PaginationMetadata`, `ProductListResponse`, and `ProductErrorResponse` interfaces
    - Export all types for use across service, validator, and route modules
    - _Requirements: 1.2, 5.1, 7.2, 7.3_

  - [x] 1.2 Set up Vitest, fast-check, and supertest testing infrastructure
    - Install vitest, fast-check, @types/supertest, and supertest as dev dependencies
    - Create `vitest.config.ts` at project root
    - Create test directory structure: `tests/unit/`, `tests/property/`, `tests/integration/`
    - Add `"test": "vitest --run"` script to package.json
    - _Requirements: (testing infrastructure)_

- [ ] 2. Implement query parameter validation
  - [ ] 2.1 Implement `validateProductQuery` function in `src/validators/productQueryValidator.ts`
    - Parse and validate all query parameters: category, minPrice, maxPrice, limit, offset, sortBy, sortOrder
    - Apply default values: limit=20, offset=5, sortBy="name", sortOrder="asc"
    - Return typed `ValidationResult` with all collected errors or parsed `ProductQueryParams`
    - Validate: minPrice/maxPrice are numeric and minPrice ≤ maxPrice, limit is 1–200, offset ≥ 0, sortBy is "name"|"price", sortOrder is "asc"|"desc"
    - _Requirements: 1.1, 3.4, 3.5, 4.3, 4.5, 4.6, 6.5, 6.6, 6.7_

  - [ ]* 2.2 Write unit tests for `validateProductQuery`
    - Test default parameter application when no params provided
    - Test each validation error scenario from the error handling table in design
    - Test valid parameter parsing with various combinations
    - _Requirements: 1.1, 3.4, 3.5, 4.3, 4.5, 4.6, 6.5, 6.6, 6.7_

  - [ ]* 2.3 Write property test for validation (Property 7: Invalid parameters yield HTTP 400)
    - **Property 7: Invalid parameters yield HTTP 400**
    - Generate random invalid parameter combinations (non-numeric prices, out-of-range limit/offset, invalid sortBy/sortOrder)
    - Assert that validation always fails for any input with at least one invalid parameter
    - **Validates: Requirements 3.4, 3.5, 4.5, 4.6, 6.6, 6.7**

- [ ] 3. Implement core business logic (filter, sort, paginate)
  - [ ] 3.1 Implement `filterProducts` function in `src/services/productService.ts`
    - Filter by category (case-insensitive comparison)
    - Filter by minPrice (price ≥ minPrice)
    - Filter by maxPrice (price ≤ maxPrice)
    - Apply all active filters simultaneously (AND logic)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 8.1_

  - [ ] 3.2 Implement `sortProducts` function in `src/services/productService.ts`
    - Sort by "name" alphabetically or by "price" numerically
    - Support "asc" and "desc" order
    - Return a new sorted array (pure function, no mutation)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 3.3 Implement `paginateProducts` function in `src/services/productService.ts`
    - Slice the array from `offset` position with at most `limit` elements
    - Return the paginated subset
    - _Requirements: 4.1, 4.2_

  - [ ] 3.4 Implement `buildMetadata` function in `src/services/productService.ts`
    - Calculate `total` as count of filtered products (before pagination)
    - Calculate `page` as `Math.floor(offset / limit) + 1`
    - Calculate `hasNext` as `offset + limit < total`
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ]* 3.5 Write property test for filtering (Property 1: Filter correctness)
    - **Property 1: Filter correctness**
    - Generate random product arrays and random filter parameter combinations
    - Assert every product in the result satisfies ALL active filter conditions
    - **Validates: Requirements 2.1, 2.3, 3.1, 3.2, 3.3, 8.1**

  - [ ]* 3.6 Write property test for sorting (Property 2: Sort correctness)
    - **Property 2: Sort correctness**
    - Generate random product arrays with random sortBy/sortOrder
    - Assert ordering invariant holds for all consecutive pairs in result
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**

  - [ ]* 3.7 Write property test for pagination (Property 3: Pagination correctness)
    - **Property 3: Pagination correctness**
    - Generate random product arrays with random valid limit/offset
    - Assert result is exactly the contiguous slice at position offset with at most limit elements
    - **Validates: Requirements 4.1, 4.2, 8.3**

  - [ ]* 3.8 Write property test for metadata (Property 4: Metadata total accuracy)
    - **Property 4: Metadata total accuracy**
    - Generate random products and filter params
    - Assert metadata.total equals count of products satisfying all filters
    - **Validates: Requirements 5.2, 8.4**

  - [ ]* 3.9 Write property test for metadata page (Property 5: Metadata page calculation)
    - **Property 5: Metadata page calculation**
    - Generate random valid offset and limit values
    - Assert metadata.page equals `Math.floor(offset / limit) + 1`
    - **Validates: Requirements 5.3**

  - [ ]* 3.10 Write property test for metadata hasNext (Property 6: Metadata hasNext calculation)
    - **Property 6: Metadata hasNext calculation**
    - Generate random valid requests
    - Assert metadata.hasNext is true iff `offset + limit < metadata.total`
    - **Validates: Requirements 5.4**

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement route handler and wire into Express app
  - [ ] 5.1 Create route handler in `src/routes/products.ts`
    - Create Express Router with GET `/` handler
    - Wire the pipeline: validate query → filter → sort → paginate → build metadata → respond
    - Return 200 with `{ data, metadata }` for valid requests
    - Return 400 with `{ error }` for invalid requests
    - Import products from `src/database/products.ts`
    - _Requirements: 1.2, 1.3, 7.1, 7.2, 7.3, 8.2, 8.3_

  - [ ] 5.2 Register `productsRouter` in `src/app.ts`
    - Import `productsRouter` from `./routes/products`
    - Mount at `/products` path
    - _Requirements: 1.1_

  - [ ]* 5.3 Write property test for valid response structure (Property 9: Valid response structure)
    - **Property 9: Valid response structure**
    - Generate random valid query parameters and send HTTP requests via supertest
    - Assert response body contains "data" array (each element has id, name, description, price, category, createdAt) and "metadata" object (with total, page, hasNext)
    - **Validates: Requirements 1.2, 5.1, 7.2**

  - [ ]* 5.4 Write property test for error response format (Property 8: Error response format)
    - **Property 8: Error response format**
    - Generate random invalid query parameters and send HTTP requests via supertest
    - Assert response status is 400 and body contains "error" field with non-empty string
    - **Validates: Requirements 7.3**

  - [ ]* 5.5 Write integration tests for the products endpoint
    - Test GET /products returns 200 with default parameters
    - Test Content-Type header is application/json
    - Test category filter returns correct subset
    - Test price range filter works correctly
    - Test sorting by name and price in both orders
    - Test pagination with custom limit/offset
    - Test invalid parameters return 400
    - Test empty category match returns empty data with total=0
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 4.1, 4.2, 6.1, 6.2, 7.1_

- [ ] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation uses TypeScript throughout, consistent with the existing project
- All business logic functions are pure (no side effects) for easy testability
- The processing order is always: Validate → Filter → Sort → Paginate → Respond

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "3.1", "3.2", "3.3", "3.4"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10"] },
    { "id": 3, "tasks": ["5.1"] },
    { "id": 4, "tasks": ["5.2", "5.3", "5.4", "5.5"] }
  ]
}
```
