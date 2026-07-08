# Implementation Plan: Product Listing Endpoint

## Overview

Implement a `GET /products` REST endpoint with filtering (category, price range), sorting (name, price), pagination (limit/offset), and validation using a pure-function pipeline architecture: validate → filter → sort → paginate → respond. All code is TypeScript on the existing Express API.

## Tasks

- [x] 1. Implement core service functions
  - [x] 1.1 Create `src/services/productService.ts` with `validateQueryParams` function
    - Implement parameter validation that collects all errors in a single pass
    - Return `ValidationResult` (success with parsed `ProductQueryParams` or failure with errors)
    - Apply defaults: limit=10, offset=0, sortBy='name', sortOrder='asc'
    - Validate: limit integer [1,100], offset integer ≥0, minPrice/maxPrice numeric ≥0, sortBy in {name, price}, sortOrder in {asc, desc}
    - Concatenate multiple errors with "; " separator
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 1.1, 4.5, 4.6_

  - [x] 1.2 Implement `filterProducts` function in `src/services/productService.ts`
    - Filter by exact category match (case-sensitive) when provided
    - Filter by minPrice (inclusive) when provided
    - Filter by maxPrice (inclusive) when provided
    - Apply all filters with logical AND
    - Accept product array as parameter for testability
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 1.3 Implement `sortProducts` function in `src/services/productService.ts`
    - Sort by name using case-insensitive comparison
    - Sort by price using numeric comparison
    - Support ascending and descending order
    - Use product `id` as tiebreaker (ascending) for deterministic results
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.7_

  - [x] 1.4 Implement `paginateProducts` function in `src/services/productService.ts`
    - Apply offset (skip items) and limit (max items returned)
    - Calculate metadata: total = filtered count (pre-pagination), page = floor(offset/limit)+1, hasNext = (offset+limit) < total
    - Return empty data array when offset >= total
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 2. Implement route and wire to app
  - [x] 2.1 Create `src/routes/products.ts` with Express Router
    - Define GET `/` handler that orchestrates the pipeline: validate → filter → sort → paginate → respond
    - On validation failure: return 400 with `{ error: string }` body
    - On success: return 200 with `{ data: Product[], metadata: PaginationMetadata }` body
    - Import and use the in-memory products array from `src/database/products.ts`
    - _Requirements: 6.1, 7.1, 7.2, 7.3_

  - [x] 2.2 Mount products router in `src/app.ts`
    - Import `productsRouter` from `./routes/products`
    - Register at path `/products`
    - _Requirements: 1.1_

- [x] 3. Checkpoint - Verify core implementation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Property-based tests
  - [x]* 4.1 Write property test for filter correctness
    - **Property 1: Filter correctness**
    - Generate random product arrays and filter combinations (category, minPrice, maxPrice)
    - Assert every returned product satisfies all active filter conditions
    - Assert no product satisfying all conditions is excluded from total count
    - **Validates: Requirements 2.1, 2.3, 3.1, 3.2, 3.3, 3.5**

  - [x]* 4.2 Write property test for sort correctness
    - **Property 2: Sort correctness**
    - Generate random product arrays with duplicates and random sort params
    - Assert consecutive pairs respect sort order (case-insensitive for name, numeric for price)
    - Assert id tiebreaker is applied when sort field values are equal
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.7**

  - [x]* 4.3 Write property test for pagination slicing
    - **Property 3: Pagination slicing**
    - Generate random arrays, offsets [0, array.length+10], limits [1,100]
    - Assert returned data equals the correct slice of the filtered/sorted array
    - Assert empty data when offset >= filtered length
    - **Validates: Requirements 1.2, 1.3, 1.5, 6.1**

  - [x]* 4.4 Write property test for metadata computation
    - **Property 4: Metadata computation**
    - Generate random product arrays and valid query parameters
    - Assert total = count of products passing filters (before pagination)
    - Assert page = floor(offset/limit) + 1
    - Assert hasNext = (offset + limit) < total
    - **Validates: Requirements 1.4, 6.2, 6.3, 6.4**

  - [x]* 4.5 Write property test for validation rejects invalid parameters
    - **Property 5: Validation rejects invalid parameters**
    - Generate random invalid values per field (out-of-range, non-numeric, wrong enum values)
    - Assert validator returns failure with errors identifying each invalid parameter
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6**

  - [x]* 4.6 Write property test for validation accepts valid parameters
    - **Property 6: Validation accepts valid parameters**
    - Generate random valid values with optional omissions
    - Assert validator returns success with correctly parsed params and defaults applied
    - **Validates: Requirements 1.1, 4.5, 4.6, 5.7**

  - [x]* 4.7 Write property test for response structure invariant
    - **Property 7: Response structure invariant**
    - Generate random valid requests through the full pipeline
    - Assert response contains `data` array of Product objects with all required fields
    - Assert response contains `metadata` object with numeric total, numeric page, boolean hasNext
    - **Validates: Requirements 7.2**

- [x] 5. Unit tests
  - [x]* 5.1 Write unit tests for `validateQueryParams`
    - Test default parameters (no query → limit=10, offset=0, sortBy=name, sortOrder=asc)
    - Test default sortOrder when only sortBy is provided
    - Test multiple validation errors in a single request
    - Test boundary values (limit=1, limit=100, offset=0)
    - _Requirements: 1.1, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x]* 5.2 Write unit tests for `filterProducts`
    - Test category filter with exact match
    - Test price range with minPrice and maxPrice
    - Test minPrice > maxPrice returns empty
    - Test combined filters (category + price range)
    - Test decimal price precision (e.g., 29.99)
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.6_

  - [x]* 5.3 Write unit tests for `sortProducts` and `paginateProducts`
    - Test sort by name (case-insensitive)
    - Test sort by price ascending/descending
    - Test id tiebreaker with equal sort values
    - Test pagination with offset >= total returns empty data
    - Test pagination metadata calculation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.7, 1.4, 1.5, 6.2, 6.3, 6.4_

- [x] 6. Integration tests
  - [x]* 6.1 Write integration tests using supertest
    - Test full GET /products request/response cycle with default params
    - Test combined filter + sort + pagination end-to-end
    - Test 400 response for invalid params with correct Content-Type
    - Test 200 response structure matches expected JSON format
    - Test empty result scenarios (no matching category, offset beyond total)
    - _Requirements: 6.1, 7.1, 7.2, 7.3_

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All test files use `fast-check` for property tests and `vitest` as the runner
- Property tests go in `tests/property/*.property.test.ts`
- Unit tests go in `tests/unit/*.test.ts`
- Integration tests go in `tests/integration/*.test.ts`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4"] },
    { "id": 3, "tasks": ["2.1"] },
    { "id": 4, "tasks": ["2.2"] },
    { "id": 5, "tasks": ["4.1", "4.2", "4.5", "4.6", "5.1", "5.2"] },
    { "id": 6, "tasks": ["4.3", "4.4", "4.7", "5.3"] },
    { "id": 7, "tasks": ["6.1"] }
  ]
}
```
