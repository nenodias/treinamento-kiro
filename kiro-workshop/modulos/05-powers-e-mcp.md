# ⚡ Módulo 05 — Powers & MCP: Ferramentas Externas

---

## MCP (Model Context Protocol)

Padrão que conecta o Kiro a ferramentas externas: documentação, APIs, bancos, etc.

**Configuração**: `.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uv",
      "args": [
        "tool", "run", "--from",
        "awslabs.aws-documentation-mcp-server@latest",
        "awslabs.aws-documentation-mcp-server.exe"
      ],
      "env": { "FASTMCP_LOG_LEVEL": "ERROR" }
    }
  }
}
```

> Este server não precisa de key/token — só `uv` instalado.

---

## Powers

Powers = **MCP + Documentação** empacotados, ativados sob demanda por keywords.

```
┌─────────────────────────────────────┐
│           Kiro Power                │
│                                     │
│  📄 POWER.md   → Instruções        │
│  ⚙️  mcp.json   → MCP servers      │
│  📂 steering/  → Guias extras      │
└─────────────────────────────────────┘
```

**Vantagem sobre MCP puro**: não carrega 100+ ferramentas o tempo todo — só quando relevante.

---

## Instalar um Power

`Ctrl + Shift + P` → `Configure Powers` → Escolher → Install

Powers sem key: **power-builder**, **aws-infrastructure-as-code**, **aws-sam**, **terraform**

---

## Criar um Power (Knowledge Base)

Mínimo = um arquivo `POWER.md`:

```markdown
---
name: "padroes-do-time"
displayName: "Padrões do Time"
description: "Convenções de código do time backend"
keywords: ["padrões", "convenções", "código"]
---

# Regras do time aqui...
```

Instale localmente e o Kiro ativa quando você menciona uma keyword.

---

## Demo rápida

```
Prompt: "Pesquise na documentação da AWS sobre DynamoDB single-table design"
```

O Kiro usa o MCP server de docs para buscar e retornar a informação.

---

> 📌 [Docs: Powers](https://kiro.dev/docs/powers/) | [Docs: MCP](https://kiro.dev/docs/mcp/configuration/)
