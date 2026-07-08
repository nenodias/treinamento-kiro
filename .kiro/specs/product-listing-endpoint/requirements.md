# Requirements Document

## Introduction

Endpoint REST para listagem de produtos com suporte a filtros (categoria, faixa de preço), paginação (limit/offset), ordenação (nome ou preço) e retorno de metadata de paginação. O endpoint será adicionado à API Express existente no path `GET /products`.

## Glossary

- **Product_Listing_Endpoint**: Rota HTTP GET /products responsável por receber parâmetros de query, aplicar filtros, ordenação e paginação sobre a coleção de produtos, e retornar a resposta formatada.
- **Product**: Entidade com id, name, description, price, category e createdAt representando um item disponível no catálogo.
- **Query_Validator**: Componente responsável por validar e normalizar os parâmetros de query string recebidos na requisição.
- **Pagination_Metadata**: Objeto contendo total (quantidade total de itens que atendem aos filtros), page (número da página atual baseado em offset/limit) e hasNext (indicador booleano se existem mais itens além da página atual).

## Requirements

### Requirement 1: Listar Produtos com Paginação

**User Story:** As a API consumer, I want to list products with pagination, so that I can retrieve manageable subsets of products without loading the entire catalog.

#### Acceptance Criteria

1. WHEN a GET request is made to /products without query parameters, THE Product_Listing_Endpoint SHALL return a response with HTTP status 200 containing the first 10 products sorted by name in ascending order, with Pagination_Metadata where page equals 1 and hasNext reflects whether more than 10 products exist.
2. WHEN the query parameter `limit` is provided with a valid integer between 1 and 100, THE Product_Listing_Endpoint SHALL return at most that number of products in the response data array.
3. WHEN the query parameter `offset` is provided with a valid non-negative integer, THE Product_Listing_Endpoint SHALL skip that number of products before returning results.
4. THE Product_Listing_Endpoint SHALL include Pagination_Metadata in every successful response with HTTP status 200, containing total (integer count of all products matching active filters), page (integer calculated as floor(offset/limit)+1), and hasNext (boolean that is true when offset + limit is less than total, false otherwise).
5. WHEN the offset equals or exceeds the total number of filtered products, THE Product_Listing_Endpoint SHALL return a response with HTTP status 200 containing an empty data array and Pagination_Metadata with total reflecting the actual count of filtered products, page calculated normally, and hasNext as false.

### Requirement 2: Filtrar Produtos por Categoria

**User Story:** As a API consumer, I want to filter products by category, so that I can retrieve only products relevant to a specific category.

#### Acceptance Criteria

1. WHEN the query parameter `category` is provided with a non-empty string, THE Product_Listing_Endpoint SHALL return only products whose category field matches the provided value exactly (case-sensitive).
2. WHEN the query parameter `category` is provided and no products match, THE Product_Listing_Endpoint SHALL return an empty data array with total as 0 in the Pagination_Metadata.
3. WHEN the query parameter `category` is provided together with price range filters (`minPrice`, `maxPrice`), THE Product_Listing_Endpoint SHALL apply all filters in combination (logical AND) and return only products that satisfy every active filter, with Pagination_Metadata reflecting the filtered total.

### Requirement 3: Filtrar Produtos por Faixa de Preço

**User Story:** As a API consumer, I want to filter products by price range, so that I can find products within my budget.

#### Acceptance Criteria

1. WHEN the query parameter `minPrice` is provided with a valid non-negative number, THE Product_Listing_Endpoint SHALL return only products with price greater than or equal to the specified value.
2. WHEN the query parameter `maxPrice` is provided with a valid non-negative number, THE Product_Listing_Endpoint SHALL return only products with price less than or equal to the specified value.
3. WHEN both `minPrice` and `maxPrice` are provided with valid values, THE Product_Listing_Endpoint SHALL return only products with price within the inclusive range [minPrice, maxPrice].
4. IF `minPrice` is greater than `maxPrice`, THEN THE Product_Listing_Endpoint SHALL return an empty data array with total as 0 in the Pagination_Metadata.
5. WHEN price filters are provided together with other query parameters (category, pagination, sorting), THE Product_Listing_Endpoint SHALL apply price filtering using logical AND with category filtering, and apply pagination and sorting to the filtered result set.
6. WHEN `minPrice` or `maxPrice` is provided with a decimal value, THE Product_Listing_Endpoint SHALL compare prices using up to 2 decimal places of precision.

### Requirement 4: Ordenar Produtos

**User Story:** As a API consumer, I want to sort products by name or price, so that I can view results in a meaningful order.

#### Acceptance Criteria

1. WHEN the query parameter `sortBy` is provided with value `name`, THE Product_Listing_Endpoint SHALL sort products alphabetically by the name field using case-insensitive comparison.
2. WHEN the query parameter `sortBy` is provided with value `price`, THE Product_Listing_Endpoint SHALL sort products numerically by the price field.
3. WHEN the query parameter `sortOrder` is provided with value `asc`, THE Product_Listing_Endpoint SHALL sort products in ascending order (A-Z for name, lowest-to-highest for price).
4. WHEN the query parameter `sortOrder` is provided with value `desc`, THE Product_Listing_Endpoint SHALL sort products in descending order (Z-A for name, highest-to-lowest for price).
5. WHEN neither `sortBy` nor `sortOrder` is provided, THE Product_Listing_Endpoint SHALL default to sorting by `name` in ascending order.
6. WHEN `sortBy` is provided but `sortOrder` is not provided, THE Product_Listing_Endpoint SHALL default `sortOrder` to `asc`.
7. WHEN two or more products have the same value for the active `sortBy` field, THE Product_Listing_Endpoint SHALL use the product `id` field in ascending order to guarantee deterministic results.

### Requirement 5: Validação de Parâmetros

**User Story:** As a API consumer, I want to receive clear error messages for invalid parameters, so that I can correct my requests.

#### Acceptance Criteria

1. IF `limit` is provided with a non-integer value or a value outside the range 1-100, THEN THE Query_Validator SHALL return a 400 status code with a JSON response body containing an `error` field that identifies the `limit` parameter and indicates the valid range is 1 to 100.
2. IF `offset` is provided with a non-integer value or a value less than 0, THEN THE Query_Validator SHALL return a 400 status code with a JSON response body containing an `error` field that identifies the `offset` parameter and indicates the value must be an integer greater than or equal to 0.
3. IF `minPrice` or `maxPrice` is provided with a non-numeric value or a value less than 0, THEN THE Query_Validator SHALL return a 400 status code with a JSON response body containing an `error` field that identifies the invalid parameter name and indicates the value must be a number greater than or equal to 0.
4. IF `sortBy` is provided with a value other than `name` or `price`, THEN THE Query_Validator SHALL return a 400 status code with a JSON response body containing an `error` field that identifies the `sortBy` parameter and lists `name` and `price` as the valid options.
5. IF `sortOrder` is provided with a value other than `asc` or `desc`, THEN THE Query_Validator SHALL return a 400 status code with a JSON response body containing an `error` field that identifies the `sortOrder` parameter and lists `asc` and `desc` as the valid options.
6. IF multiple parameters are invalid in a single request, THEN THE Query_Validator SHALL return a 400 status code with a JSON response body containing an `error` field that identifies each invalid parameter and its respective validation failure in a single string.
7. WHEN any validation error occurs, THE Query_Validator SHALL return the response with `Content-Type: application/json` and SHALL NOT process the query against the product data.

### Requirement 6: Combinação de Filtros com Paginação e Ordenação

**User Story:** As a API consumer, I want to combine filters, pagination and sorting, so that I can perform precise queries.

#### Acceptance Criteria

1. WHEN any combination of category, price range, sorting, and pagination parameters are provided, THE Product_Listing_Endpoint SHALL apply the processing pipeline in this fixed order: validate parameters, apply filters, apply sorting, apply pagination, then respond.
2. THE Product_Listing_Endpoint SHALL calculate the total field in Pagination_Metadata as the count of products matching all applied filters, before pagination (offset and limit) is applied.
3. THE Product_Listing_Endpoint SHALL calculate the page field as floor(offset / limit) + 1.
4. THE Product_Listing_Endpoint SHALL set hasNext to true when (offset + limit) is less than total, and false otherwise.
5. IF the applied filters match zero products, THEN THE Product_Listing_Endpoint SHALL return an empty data array with total set to 0, page set to 1, and hasNext set to false.
6. IF offset is greater than or equal to total, THEN THE Product_Listing_Endpoint SHALL return an empty data array with total reflecting the filtered count, page calculated as floor(offset / limit) + 1, and hasNext set to false.

### Requirement 7: Formato da Resposta

**User Story:** As a API consumer, I want a consistent response format, so that I can reliably parse API responses.

#### Acceptance Criteria

1. THE Product_Listing_Endpoint SHALL return all responses (success and error) with Content-Type header set to application/json.
2. THE Product_Listing_Endpoint SHALL return successful responses with HTTP status code 200 containing a `data` array of Product objects (with fields: id, name, description, price, category, createdAt) and a `metadata` object with Pagination_Metadata (with fields: total, page, hasNext), where `data` SHALL be an empty array when no products match the request criteria.
3. IF the request contains invalid parameters, THEN THE Product_Listing_Endpoint SHALL return HTTP status code 400 containing a JSON body with a single `error` field whose value is a non-empty string message indicating which parameter failed validation.
