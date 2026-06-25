# 📏 Módulo 02 — Steering: Instruções Persistentes

---

## O que é

Steering files são **instruções que o Kiro segue sempre** (ou condicionalmente). Ficam em `.kiro/steering/*.md`.

É como dar um briefing permanente ao agente: padrões de código, arquitetura, convenções, stack.

---

## Tipos de inclusão

| Tipo | Quando carrega | Frontmatter |
|------|----------------|-------------|
| **Always** (padrão) | Em toda interação | Nenhum necessário |
| **fileMatch** | Quando um arquivo matching é lido | `inclusion: fileMatch` + `fileMatchPattern: "*.ts"` |
| **Manual** | Quando você usa `#NomeDoArquivo` no chat | `inclusion: manual` |

---

## Exemplo: padrões do time

**Arquivo**: `.kiro/steering/padroes.md`

```markdown
# Padrões do Time

## Estrutura
- Handlers: apenas validação + chamada de service + resposta
- Services: toda lógica de negócio
- Utils: funções puras e reutilizáveis

## Código
- Arquivos: kebab-case.mjs
- Funções: camelCase
- Sempre async/await, nunca .then()
- try/catch obrigatório em handlers

## Respostas HTTP
Usar sempre a função `resposta()` de utils:
{ sucesso: boolean, dados: object, mensagem: string }
```

---

## Exemplo: condicional por tipo de arquivo

**Arquivo**: `.kiro/steering/testes.md`

```markdown
---
inclusion: fileMatch
fileMatchPattern: "*.test.*"
---

# Convenções de Testes

- Framework: Vitest
- Padrão: "deve [ação] quando [condição]"
- Sempre testar sucesso E erro
- Mockar dependências externas
```

> Só carrega quando o Kiro lê um arquivo `.test.*`.

---

## Demo rápida

1. Mostrar `.kiro/steering/padroes.md` no projeto
2. Pedir: "Crie um handler para deletar tarefa"
3. Verificar que o código segue os padrões (try/catch, chama service, usa resposta())

---

> 📌 [Docs: Steering](https://kiro.dev/docs/steering/)
