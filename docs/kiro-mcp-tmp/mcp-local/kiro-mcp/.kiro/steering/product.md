# Product Summary

This is a **Model Context Protocol (MCP) server** that exposes a products API as MCP tools. It acts as a bridge between AI assistants (like Kiro) and a local products REST API running on `localhost:3000`.

## Purpose

Allow AI agents to list and query product data (id, name, description, price, category, createdAt) from a backend service via the MCP standard, using stdio transport.

## Key Behavior

- Exposes a single tool `listar_products` that fetches paginated product listings
- Communicates with the AI host over stdin/stdout (StdioServerTransport)
- Delegates HTTP calls to a local REST API
