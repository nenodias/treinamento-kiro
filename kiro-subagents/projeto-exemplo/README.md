# 💻 Projeto de Exemplo — API de Usuários com Custom Subagents

## Sobre

API simples de gerenciamento de usuários em Node.js, usada para demonstrar **Custom Subagents** no Kiro.

O projeto já vem com **3 subagents configurados** em `.kiro/agents/` prontos para testar.

---

## Estrutura

```
projeto-exemplo/
├── .kiro/
│   └── agents/                     ← Custom Subagents do time
│       ├── code-reviewer.md        ← Revisa código (read only)
│       ├── test-writer.md          ← Gera testes unitários
│       └── doc-generator.md        ← Cria documentação JSDoc
├── src/
│   ├── handlers/
│   │   └── criar-usuario.mjs      ← Handler Lambda
│   ├── services/
│   │   └── usuario-service.mjs    ← Lógica de negócio
│   └── utils/
│       └── resposta.mjs           ← Resposta HTTP padronizada
├── package.json
└── README.md
```

---

## Subagents disponíveis

| Agente | Slash Command | O que faz | Tools |
|--------|--------------|-----------|-------|
| Code Reviewer | `/code-reviewer` | Revisa qualidade e segurança | read |
| Test Writer | `/test-writer` | Gera testes com Vitest | read, write, shell |
| Doc Generator | `/doc-generator` | Cria JSDoc e READMEs | read, write |

---

## Exercícios práticos

### Exercício 1: Usar o Code Reviewer

```
/code-reviewer analise o arquivo src/handlers/criar-usuario.mjs
```

Observe que ele só **lê e reporta** — não altera código.

### Exercício 2: Gerar testes

```
/test-writer gere testes para src/services/usuario-service.mjs
```

Observe que ele cria o arquivo de teste e pode rodar com `npx vitest run`.

### Exercício 3: Delegação paralela

```
Para src/handlers/criar-usuario.mjs, faça em paralelo:
1. Code review
2. Gere testes
3. Documente com JSDoc
```

Observe os 3 subagents rodando simultaneamente.

### Exercício 4: Criar seu próprio subagent

Crie `.kiro/agents/security-auditor.md`:

```markdown
---
name: security-auditor
description: Auditoria de segurança focada em OWASP Top 10.
tools: ["read", "shell"]
---

Você é um especialista em segurança.
Analise o código buscando vulnerabilidades OWASP Top 10.
Reporte cada issue com: Tipo, Risco, Arquivo, Descrição, Correção.
```

Teste com: `/security-auditor audite o projeto`

---

## Pré-requisitos

- Kiro IDE (versão 0.9+)
- Modo **Autopilot** ativado
- Node.js 18+ (para os exemplos de código)

---

## Importante

⚠️ **Subagents só funcionam em modo Autopilot.** Se estiver em Supervised, mude antes de testar.
