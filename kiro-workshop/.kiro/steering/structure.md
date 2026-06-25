# Project Structure

```
kiro-workshop/
├── modulos/                 ← Workshop guides (read-only reference)
│   ├── 00-agenda.md
│   ├── 01-vibe-e-spec.md
│   ├── 02-steering.md
│   ├── 03-hooks.md
│   ├── 04-subagents.md
│   ├── 05-powers-e-mcp.md
│   └── 06-kiro-cli.md
├── projeto-demo/            ← Demo Node.js API (active code)
│   ├── src/
│   │   ├── handlers/       ← HTTP entry points (parse request, call service, return response)
│   │   ├── services/       ← Domain logic (validation, business rules, state)
│   │   └── utils/          ← Shared helpers (response formatting)
│   ├── .kiro/              ← Kiro config for the demo project
│   └── package.json
├── powers/                  ← Custom Kiro powers (empty, for workshop exercises)
└── .kiro/                   ← Kiro config for the workspace root
    └── steering/            ← These steering documents
```

## Architecture Pattern (projeto-demo)

Three-layer separation:

1. **Handlers** — Thin HTTP wrappers. Parse `event.body`, call service, format response with `sucesso()`/`erro()`. Always wrapped in try/catch.
2. **Services** — Pure domain logic. Validation, state management, business errors. No HTTP awareness.
3. **Utils** — Reusable cross-cutting helpers (response formatting, etc.)

## Naming Conventions
- Files: `kebab-case.mjs` (or `.ts` for typed services)
- Functions: `camelCase`
- Classes (errors): `PascalCase`
- Domain constants: `UPPER_SNAKE_CASE`

## Domain Errors
Custom error classes in services (`ValidacaoError`, `TarefaNaoEncontradaError`, etc.) with a `codigo` property for programmatic identification. Handlers map these to appropriate HTTP status codes.
