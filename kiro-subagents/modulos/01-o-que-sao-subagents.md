# 🤖 Módulo 01 — O que são Subagents

> ⏱️ Tempo estimado: ~5 minutos

---

## Conceito

Subagents são **agentes independentes** que rodam em paralelo ao agente principal, cada um com contexto isolado e ferramentas específicas.

```
┌─────────────────────────────────────────────────────┐
│              SEM Subagents (sequencial)              │
│                                                     │
│  [Review] → [Testes] → [Docs] → Resposta           │
│  (contexto poluído, lento)                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              COM Subagents (paralelo)                │
│                                                     │
│  [Subagent: Review]  ──┐                            │
│  [Subagent: Testes]  ──┼──→ Resultado combinado     │
│  [Subagent: Docs]    ──┘                            │
│  (contexto limpo, rápido)                           │
└─────────────────────────────────────────────────────┘
```

---

## Built-in vs Custom

| Tipo | Quais são | Quem controla |
|------|-----------|---------------|
| **Built-in** | Context Gatherer + General Purpose | O Kiro decide quando usar |
| **Custom** | Você cria (reviewer, tester, etc.) | Você define tudo |

---

## Como criar um Custom Subagent

Um arquivo Markdown em `.kiro/agents/` com frontmatter:

```markdown
---
name: code-reviewer
description: Revisa código por qualidade, segurança e boas práticas.
tools: ["read"]
---

Você é um revisor de código sênior.
Analise qualidade, segurança e legibilidade.
Nunca altere código — apenas reporte.
```

| Campo | O que faz | Exemplo |
|-------|-----------|---------|
| `name` | Identificador (vira slash command) | `code-reviewer` → `/code-reviewer` |
| `description` | Kiro usa para seleção automática | `Revisa código por qualidade...` |
| `tools` | Ferramentas disponíveis | `["read"]`, `["read", "write", "shell"]` |
| `model` | Modelo de IA (opcional) | `claude-sonnet-4` |

---

## Tools disponíveis

| Valor | Permissão |
|-------|-----------|
| `read` | Ler arquivos, buscar, listar diretórios |
| `write` | Criar, editar, deletar arquivos |
| `shell` | Executar comandos no terminal |
| `web` | Busca na web, fetch de URLs |
| `@builtin` | Todas as ferramentas built-in |
| `@nome-mcp` | Ferramentas de um MCP server específico |
| `*` | Tudo |

**Princípio**: cada agente só com as tools que precisa (least privilege).

---

## Onde colocar

| Escopo | Caminho | Compartilhável? |
|--------|---------|-----------------|
| Global | `~/.kiro/agents/` | ❌ Só local |
| Workspace | `.kiro/agents/` | ✅ Via Git |

---

## Requisitos

- ⚠️ **Modo Autopilot** obrigatório (subagents não rodam em Supervised)
- Subagents **herdam** steering files e MCP servers
- Subagents **NÃO** acessam Specs e **NÃO** disparam Hooks

---

> 📌 **Próximo**: [Módulo 02 — Exemplos práticos e demo](02-exemplos-e-demo.md)
