# ⚡ Módulo 02 — Anatomia de um Power

> ⏱️ Tempo estimado: ~7 minutos

---

## Estrutura de um Power

Um Power é um **bundle unificado** composto por até 3 elementos:

```
meu-power/
├── POWER.md              # ← Obrigatório: metadados + instruções para o agente
├── mcp.json              # ← Opcional: configuração de servidores MCP
└── steering/             # ← Opcional: guias de workflow específicos
    ├── workflow-a.md
    └── workflow-b.md
```

---

## 1. POWER.md — O cérebro do Power

O arquivo `POWER.md` tem duas partes:

### Frontmatter: quando ativar

O frontmatter define os metadados e as keywords que disparam a ativação:

```yaml
---
name: "supabase"
displayName: "Supabase with local CLI"
description: "Build fullstack applications with Supabase's Postgres database, authentication, storage, and real-time subscriptions"
keywords: ["database", "postgres", "auth", "storage", "realtime", "backend", "supabase", "rls"]
author: "Supabase"
---
```

| Campo | Descrição |
|-------|-----------|
| `name` | Identificador interno (não mude após instalação) |
| `displayName` | Nome exibido na UI |
| `description` | O que o power faz |
| `keywords` | Palavras que disparam a ativação automática |
| `author` | Criador do power |

> ⚠️ O campo `name` é usado internamente pelo Kiro. Alterar após instalação pode exigir desinstalar e reinstalar.

### Corpo: instruções para o agente

O corpo do POWER.md contém instruções divididas em:

#### Seção de Onboarding

Executa quando alguém usa o power pela primeira vez. Serve para validar dependências e configurar o ambiente:

```markdown
# Onboarding

## Step 1: Validate tools work
Before using Supabase Local MCP, ensure the following are installed:
- **Docker Desktop**: verify with `docker --version`
- **Supabase CLI**: verify with `supabase --version`

## Step 2: Add hooks
Add a hook to `.kiro/hooks/review-advisors.kiro.hook`
...
```

#### Seção de Steering (mapeamento de workflows)

Define quando carregar cada guia específico:

```markdown
# When to Load Steering Files
- Setting up a database → `database-setup-workflow.md`
- Writing SQL code → `supabase-code-format-sql.md`
- Creating RLS policies → `supabase-database-rls-policies.md`
- Creating PostgreSQL functions → `supabase-database-functions.md`
```

---

## 2. mcp.json — As ferramentas do Power

Se o power usa ferramentas MCP, o `mcp.json` define as conexões:

```json
{
  "mcpServers": {
    "supabase-local": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_ANON_KEY": "${SUPABASE_ANON_KEY}"
      }
    }
  }
}
```

**Pontos importantes:**
- Use variáveis de ambiente para API keys e secrets
- Os nomes dos servidores no POWER.md devem bater com o `mcpServers` do mcp.json
- Na instalação, o Kiro automaticamente faz namespace dos servidores (ex: `supabase-local` → `power-supabase-supabase-local`)

---

## 3. steering/ — Guias de workflow

Para powers complexos com muitos workflows distintos, separe orientações em arquivos individuais:

```
steering/
├── database-setup-workflow.md       # Configuração inicial do banco
├── supabase-code-format-sql.md      # Formatação de SQL
├── supabase-database-rls-policies.md # Políticas de segurança
└── supabase-edge-functions.md       # Edge Functions
```

O Kiro carrega **apenas o steering relevante** para o contexto atual:
- Trabalhando com RLS → carrega `supabase-database-rls-policies.md`
- Trabalhando com auth → carrega `supabase-nextjs-supabase-auth.md`

Isso evita sobrecarregar o contexto com todos os padrões de uma vez.

---

## Exemplos de estruturas

### Power simples (sem steering)

```
power-simple-tool/
├── POWER.md          # Toda orientação aqui dentro
└── mcp.json          # Configuração MCP opcional
```

### Power com steering único

```
power-prisma/
├── POWER.md
├── mcp.json
└── steering/
    └── schema-patterns.md
```

### Power multi-tool

```
power-full-stack/
├── POWER.md
├── mcp.json
└── steering/
    ├── database-setup.md
    ├── deployment.md
    └── api-integration.md
```

### Power de documentação (sem MCP)

```
power-react-patterns/
├── POWER.md          # Sem servidores MCP
└── steering/
    ├── component-patterns.md
    └── hooks-patterns.md
```

---

## Resumo

| Componente | Obrigatório? | Função |
|------------|:---:|--------|
| `POWER.md` | ✅ | Metadados + instruções para o agente |
| `mcp.json` | ❌ | Configuração de ferramentas MCP |
| `steering/` | ❌ | Guias detalhados por workflow |

**Regra geral:**
- Power simples → tudo no POWER.md
- Power complexo → POWER.md + steering files separados
- Power com ferramentas → adicione mcp.json

---

> 📌 **Próximo**: [Módulo 03 — Instalação e Uso](03-instalacao-e-uso.md)
