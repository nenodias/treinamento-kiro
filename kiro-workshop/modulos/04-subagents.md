# 🤖 Módulo 04 — Subagents: Agentes Especializados

---

## O que são

Agentes independentes que rodam **em paralelo**, cada um com contexto isolado e ferramentas específicas.

```
[Subagent: Review]  ──┐
[Subagent: Testes]  ──┼──→ Resultado combinado
[Subagent: Docs]    ──┘
```

---

## Como criar

Arquivo Markdown em `.kiro/agents/`:

```markdown
---
name: code-reviewer
description: Revisa código por qualidade e segurança.
tools: ["read"]
---

Você é um revisor de código sênior.
Analise qualidade, segurança e boas práticas.
Nunca altere código — apenas reporte.
Formato: 🔴/🟡/🟢 | Arquivo | Problema | Sugestão
```

---

## Campos do frontmatter

| Campo | O que faz |
|-------|-----------|
| `name` | ID do agente (vira `/code-reviewer`) |
| `description` | Kiro usa para selecionar automaticamente |
| `tools` | `["read"]`, `["read","write","shell"]`, `["*"]` |
| `model` | Modelo específico (opcional) |

---

## Invocação

**Automática**: Kiro seleciona pelo `description`

**Explícita**: `/code-reviewer analise src/handlers/`

---

## Requisitos

- ⚠️ Modo **Autopilot** obrigatório
- Herdam steering e MCP
- NÃO acessam Specs, NÃO disparam Hooks

---

## Demo rápida

```
/code-reviewer analise este código:

export const handler = async (event) => {
  const result = await db.query("SELECT * FROM tasks WHERE id = " + event.id);
  return { body: JSON.stringify(result) };
};
```

Espere: SQL injection, falta try/catch, resposta fora do padrão.

---

> 📌 [Docs: Subagents](https://kiro.dev/docs/chat/subagents/)
