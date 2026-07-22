# Tech Stack

## Runtime & Language

- **Node.js** (ES Modules — `"type": "module"` in package.json)
- Source files use `.mjs` extension

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `@modelcontextprotocol/sdk` | MCP server SDK (server, transport, tool registration) |
| `zod` | Schema validation for tool input parameters |

## Build & Run

There is no build step. Source is plain JavaScript (no TypeScript, no bundler).

### Common Commands

```bash
# Start the MCP server (stdio mode)
npm start

# Install dependencies
npm install
```

## Testing

No test framework is configured yet. The `test` script in package.json is a placeholder.

## Conventions

- Use ES module imports (`import`/`export`)
- Use `zod` schemas for all MCP tool input validation
- Error messages and variable names are in Portuguese (project convention)
- No TypeScript — plain `.mjs` files
