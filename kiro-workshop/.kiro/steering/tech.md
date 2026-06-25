# Tech Stack

## Runtime & Language
- Node.js 18+
- ES Modules (`"type": "module"` in package.json)
- `.mjs` extension for JavaScript files
- TypeScript (`.ts`) used selectively for typed services

## Dependencies
- **vitest** (^3.0.0) — test framework (dev dependency)
- No production dependencies — in-memory storage, no external DB

## Common Commands

All commands run from `projeto-demo/`:

```bash
# Install dependencies
npm install

# Run tests (single run, no watch)
npm test          # → vitest run

# Lint check
npm run lint      # → placeholder script (echo)

# Start (dev entry point)
npm start         # → node src/handlers/criar-tarefa.mjs
```

## Testing Conventions
- Test files colocated with source: `<nome>.test.mjs`
- Vitest with `vi.mock()` for service isolation
- Use `describe`/`it`/`expect` pattern
- Mock services in handler tests; test services directly with unit tests
- Reset in-memory state with `resetarTarefas()` / `resetarSubtarefas()` in `beforeEach`

## Module System
- All imports use explicit `.mjs` or `.ts` extensions
- Relative imports with `../` paths
- Named exports preferred over default exports
