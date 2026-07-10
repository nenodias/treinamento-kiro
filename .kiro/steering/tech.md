# Tech Stack & Build System

## Runtime & Language

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode, ES2020 target, CommonJS modules)

## Frameworks & Libraries

- **HTTP**: Express 4.x
- **CORS**: cors middleware
- **Dev server**: ts-node-dev (hot reload with transpile-only)

## Testing

- **Test runner**: Vitest 4.x (globals enabled, node environment)
- **Property-based testing**: fast-check 4.x
- **HTTP testing**: supertest 7.x
- **Coverage**: v8 provider (covers `src/**/*.ts`, excludes `server.ts`)

## Build & Commands

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start dev server with hot reload         |
| `npm run build` | Compile TypeScript to `dist/`            |
| `npm start`     | Run compiled output (`dist/server.js`)   |
| `npm test`      | Run all tests once (`vitest --run`)      |

## TypeScript Configuration

- Strict mode enabled
- Source maps and declaration maps generated
- Output directory: `./dist`
- Source root: `./src`

## Key Conventions

- Use `vitest --run` for single-execution tests (no watch mode)
- Property-based tests use `fast-check` with `fc.assert()` and `{ numRuns: 100 }`
- Test files match patterns: `tests/**/*.test.ts` and `tests/**/*.property.test.ts`
- Dev dependencies are typed (`@types/*` packages for express, cors, node, supertest)
