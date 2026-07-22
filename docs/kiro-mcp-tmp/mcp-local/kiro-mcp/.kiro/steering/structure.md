# Project Structure

```
kiro-mcp/
├── .kiro/
│   ├── settings/       # Kiro IDE settings (mcp.json)
│   └── steering/       # Steering rules for AI assistant
├── src/
│   ├── mcp.mjs             # MCP server entry point (tool registration, transport setup)
│   └── productService.mjs  # HTTP service layer (API calls to products backend)
├── package.json
└── package-lock.json
```

## Architecture

- **`src/mcp.mjs`** — Server bootstrap and tool definitions. Each MCP tool is registered here with its name, description, zod schema, and handler.
- **`src/*Service.mjs`** — Service modules that encapsulate external HTTP calls. One service per domain entity.

## Patterns

- **Separation of concerns**: MCP tool handlers (in `mcp.mjs`) delegate business logic to service modules. Tools should not contain HTTP logic directly.
- **Naming**: Service files follow `{entity}Service.mjs` convention.
- **Single entry point**: `src/mcp.mjs` is the only entry point. All tools are registered there.
- **Error handling**: Tools catch errors from services and return `{ isError: true }` responses with user-facing messages.
