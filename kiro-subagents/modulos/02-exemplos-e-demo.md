# 🎬 Módulo 02 — Exemplos Práticos e Demo

> ⏱️ Tempo estimado: ~10 minutos

---

## 3 Subagents prontos para usar

### 1. Code Reviewer (`.kiro/agents/code-reviewer.md`)

```markdown
---
name: code-reviewer
description: Revisa código por qualidade, segurança e boas práticas.
tools: ["read"]
---

Você é um revisor de código sênior.

## Procure por:
- 🔴 Crítico: injection, credenciais hardcoded, falta de auth
- 🟡 Importante: falta de try/catch, validação ausente, lógica no handler
- 🟢 Sugestão: naming confuso, código duplicado, falta de docs

## Formato
| Severidade | Arquivo:linha | Problema | Sugestão |

## Regras
- NUNCA altere código — apenas reporte
- Se não encontrar problemas: "✅ Código aprovado"
```

**Uso**: `/code-reviewer analise src/handlers/criar-usuario.mjs`

---

### 2. Test Writer (`.kiro/agents/test-writer.md`)

```markdown
---
name: test-writer
description: Gera testes unitários com Vitest cobrindo cenários de sucesso e erro.
tools: ["read", "write", "shell"]
---

Você é especialista em testes unitários Node.js.

## Stack: Vitest
## Padrão: "deve [ação] quando [condição]"
## Regras:
1. Sempre testar SUCESSO e ERRO
2. Mockar dependências externas
3. Testes independentes (não depender de ordem)
4. Após gerar, rodar `npx vitest run` para verificar
```

**Uso**: `/test-writer gere testes para src/services/usuario-service.mjs`

---

### 3. Doc Generator (`.kiro/agents/doc-generator.md`)

```markdown
---
name: doc-generator
description: Cria documentação JSDoc para funções Node.js em português.
tools: ["read", "write"]
---

Você é especialista em documentação técnica.

## Formato: JSDoc com @param, @returns, @throws, @example
## Regras:
- Documentação em português brasileiro
- Não inventar funcionalidades que não existem
- Manter descrições concisas (1-2 linhas)
```

**Uso**: `/doc-generator documente src/services/usuario-service.mjs`

---

## Demo ao vivo

### Demo 1: Code Review com código ruim (~3 min)

```
/code-reviewer analise este código:

export const handler = async (event) => {
  const db = require('mysql');
  const conn = db.createConnection({
    host: 'prod-db.internal.com',
    user: 'admin',
    password: 'Senh@123!'
  });
  const result = await conn.query("SELECT * FROM users WHERE id = " + event.id);
  return { body: JSON.stringify(result) };
};
```

**Espere**: SQL injection, credenciais hardcoded, falta try/catch, require ao invés de import.

---

### Demo 2: Delegação paralela — o "wow moment" (~4 min)

```
Para src/handlers/criar-usuario.mjs, use subagents em paralelo:
1. Faça code review
2. Gere testes unitários
3. Adicione documentação JSDoc
```

**Mostre**: 3 subagents rodando ao mesmo tempo, cada um com seu resultado.

---

### Demo 3: Criar um subagent via chat (~3 min)

```
Crie um custom subagent em .kiro/agents/security-auditor.md que:
- Faz auditoria de segurança OWASP Top 10
- Só tem acesso a leitura e shell (para npm audit)
- Reporta: Tipo OWASP, Risco, Arquivo, Descrição, Correção
- Nunca altera código
```

Depois teste: `/security-auditor audite o projeto`

---

## Compartilhando com o time

```
meu-projeto/
└── .kiro/agents/           ← Versionado no Git (Azure DevOps, GitLab, etc.)
    ├── code-reviewer.md
    ├── test-writer.md
    └── doc-generator.md
```

- Todo dev que clona **já tem** os subagents
- Mudanças passam por **Pull Request**
- Funciona com **qualquer Git** (Azure DevOps, GitLab, Bitbucket)

### Combinando com Hooks (bônus)

```json
{
  "name": "Auto Review",
  "version": "1.0.0",
  "when": { "type": "agentStop" },
  "then": {
    "type": "askAgent",
    "prompt": "Use o /code-reviewer para revisar as mudanças que acabou de fazer"
  }
}
```

> Agora todo código gerado é automaticamente revisado!

---

## Resumo rápido

| O que | Como |
|-------|------|
| Criar subagent | Arquivo `.md` em `.kiro/agents/` |
| Usar | `/nome-do-agent` ou Kiro seleciona por description |
| Compartilhar | Commitar `.kiro/agents/` no repo |
| Requisito | Modo Autopilot |

---

> 📌 **Docs**: [kiro.dev/docs/chat/subagents](https://kiro.dev/docs/chat/subagents/)
