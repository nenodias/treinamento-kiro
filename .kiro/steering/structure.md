# Project Structure

```
src/
├── app.ts                  # Express app setup (middleware + route mounting)
├── server.ts               # Entrypoint (starts HTTP listener)
├── database/
│   └── products.ts         # In-memory data store + Product interface
├── routes/
│   └── *.ts                # Route handlers (thin — delegate to services)
├── services/
│   └── *Service.ts         # Business logic (validation, filtering, sorting, pagination)
└── types/
    └── *Types.ts           # TypeScript interfaces and type definitions

tests/
├── unit/                   # Unit tests for individual functions
├── integration/            # Integration tests (HTTP layer with supertest)
└── property/               # Property-based tests (fast-check)
```

## Architecture Patterns

- **Layered separation**: routes → services → database
- **Route handlers are thin**: validate input, call service functions, return response
- **Services are pure functions**: accept data + params, return results (no side effects)
- **Data passed as parameter**: functions receive the product array rather than importing it directly, enabling testability
- **Validation-first**: query params are validated and parsed before any business logic runs
- **Pipeline pattern in routes**: Validate → Filter → Sort → Paginate → Respond

## Naming Conventions

- Route files: noun plural (`products.ts`, `health.ts`)
- Service files: camelCase with `Service` suffix (`productService.ts`)
- Type files: camelCase with `Types` suffix (`productTypes.ts`)
- Router exports: `{noun}Router` (e.g., `productsRouter`, `healthRouter`)
- Test files: `{functionName}.test.ts` for unit, `{resource}.test.ts` for integration, `{concern}.property.test.ts` for property tests

## Testing Strategy

- **Unit tests**: test service functions in isolation with crafted test data
- **Property-based tests**: validate correctness invariants with random inputs via fast-check
- **Integration tests**: test HTTP endpoints end-to-end with supertest
- Each test category lives in its own directory under `tests/`
