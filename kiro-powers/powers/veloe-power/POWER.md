---
name: "veloe-power"
displayName: "Veloe Engineering Standards"
description: "Padrões de code review, testes unitários e commits para os times de desenvolvimento Veloe. Separado por stack: React, React Native, Java e .Net."
keywords: ["veloe", "code-review", "testes-unitarios", "commits", "react", "react-native", "java", "dotnet"]
author: "Veloe Engineering"
---

# Veloe Engineering Standards

## Overview

Este power centraliza os padrões de engenharia da Veloe para garantir consistência entre os times. Ele cobre três pilares fundamentais:

1. **Code Review** — Checklist, critérios de aprovação e boas práticas para revisão de código
2. **Testes Unitários** — Convenções de escrita, cobertura mínima e patterns por stack
3. **Padrões de Commit** — Formato de mensagens, conventional commits e regras de branch

Cada pilar é documentado separadamente por linguagem/stack para que o agente carregue apenas o contexto relevante ao projeto em que você está trabalhando.

## Available Steering Files

| Steering File | Stack | Conteúdo |
|---------------|-------|----------|
| `react.md` | React (Web) | Code review, testes unitários e commits para projetos React |
| `react-native.md` | React Native (Mobile) | Code review, testes unitários e commits para apps React Native |
| `java.md` | Java (Backend) | Code review, testes unitários e commits para serviços Java |
| `dotnet.md` | .Net (Backend) | Code review, testes unitários e commits para serviços .Net |

Para carregar o guia da stack desejada:
```
Call action "readSteering" with powerName="veloe-power", steeringFile="react.md"
```

## Princípios Gerais (Todas as Stacks)

### Code Review

- Todo PR deve ter pelo menos **1 aprovação** antes do merge
- Revise em até **24h úteis** após a solicitação
- Comentários devem ser construtivos — sugira soluções, não apenas aponte problemas
- Use labels: `nit` (sugestão), `blocking` (obrigatório corrigir), `question` (dúvida)
- PRs com mais de **400 linhas** devem ser divididos

### Testes Unitários

- Cobertura mínima: **80%** em código novo
- Testes devem ser independentes e determinísticos
- Nome do teste deve descrever o comportamento esperado
- Padrão: `Arrange → Act → Assert`
- Mocks devem ser mínimos — prefira fakes e stubs leves

### Padrões de Commit

Formato obrigatório — **Conventional Commits**:

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

**Tipos permitidos:**

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação (não altera lógica) |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de manutenção (deps, configs) |
| `perf` | Melhoria de performance |
| `ci` | Alterações em CI/CD |

**Regras:**
- Descrição em português, imperativo, lowercase: `feat(auth): adicionar login social`
- Máximo 72 caracteres na primeira linha
- Referência ao ticket no rodapé: `Refs: VEL-1234`
- Commits de breaking change: adicionar `!` após o tipo ou `BREAKING CHANGE:` no rodapé

## Troubleshooting

### PR rejeitado sem motivo claro
- Verifique se os labels estão corretos (`blocking` vs `nit`)
- Converse com o revisor para alinhar expectativas

### Testes quebrando em CI mas passando local
- Verifique variáveis de ambiente
- Confirme que não há dependência de ordem de execução
- Verifique timezone e locale do CI

### Commit rejeitado pelo hook
- Verifique o formato: `tipo(escopo): descrição`
- Escopo é obrigatório em monorepos
- Use `git commit --amend` para corrigir a mensagem
