# 🪝 Treinamento: Agent Hooks no Kiro

## Sobre este treinamento

Material de apoio para sessão de **~25 minutos** sobre **Agent Hooks** no Kiro — o mecanismo de automação baseado em eventos que permite executar ações automaticamente na IDE quando algo acontece no seu fluxo de trabalho.

## Contexto do projeto

Este treinamento usa o **mesmo projeto** das sessões anteriores (Spec Driven e Steering Documents). A API de produtos já está implementada com:

- Endpoint `GET /products` com filtros, paginação e ordenação
- Steering documents configurados (tech, structure, product, padrões de teste, git flow)
- Spec completa (requirements → design → tasks) já executada

Nesta sessão, adicionamos **Hooks** ao projeto — mais uma camada de automação que complementa o que já foi construído.

## O que são Agent Hooks?

Hooks são **triggers automatizados** que executam ações quando eventos ocorrem na IDE:

```
EVENTO detectado  →  AÇÃO executada
(arquivo salvo)       (rodar lint)
(agente parou)        (review de segurança)
(task concluída)      (rodar testes)
```

Diferente dos Steering Documents (que guiam *como* o agente pensa), Hooks automatizam *o que acontece* em resposta a eventos reais.

## Estrutura do Treinamento

| Módulo | Tema | Tempo |
|--------|------|-------|
| [01 — O que são Hooks](01-o-que-sao-hooks.md) | Conceito, problema e solução | ~5 min |
| [02 — Tipos e Ações](02-tipos-e-acoes.md) | 10 triggers + 2 tipos de ação | ~7 min |
| [03 — Exemplos Práticos](03-exemplos-praticos.md) | 6 casos de uso reais com JSON | ~5 min |
| [04 — Demo ao Vivo](04-demo-ao-vivo.md) | Criação e teste de hooks no projeto | ~8 min |

## Pré-requisitos

- Kiro IDE instalado
- Projeto do treinamento clonado e com dependências instaladas
- Familiaridade com as sessões anteriores (Steering e Spec Driven)

## Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar em modo dev (hot reload)
npm run dev

# Rodar testes
npm test

# Rodar lint
npm run lint

# Formatar código
npm run format
```

## Hooks já configurados no projeto

O projeto já vem com 2 hooks em `.kiro/hooks/` para demonstração:

| Hook | Trigger | Ação | Consome créditos? |
|------|---------|------|-------------------|
| **Lint on Save** | Salvar arquivo `.ts` em `src/` ou `tests/` | `npm run format & npm run lint:fix` | Não |
| **Atualizar README** | Manual (botão ▶️) | Pede ao agente para atualizar o README | Sim |

## Como apresentar

### Antes da sessão
1. Certifique-se que `npm install` foi executado
2. Verifique que os hooks existem em `.kiro/hooks/`
3. Tenha o painel **Agent Hooks** visível na sidebar

### Fluxo sugerido
1. **Conceito** (módulos 01–02): explique o que são hooks, os tipos de trigger e ações
2. **Exemplos** (módulo 03): mostre casos reais — qual hook resolver qual problema
3. **Demo ao vivo** (módulo 04): crie e teste hooks no projeto
   - Demo 1: Lint on Save via UI — mostrar hook de `runCommand` (rápido, sem créditos)
   - Demo 2: Atualizar README via trigger manual — mostrar hook de `askAgent` (inteligente, consome créditos)
   - Comparar tempo e custo entre os dois tipos

### Pontos-chave para enfatizar
- **Run Command** é rápido e não consome créditos — ideal para lint, testes, builds
- **Ask Kiro** usa o LLM e consome créditos — ideal para tarefas que precisam de raciocínio
- Hooks vivem no repo (`.kiro/hooks/`) — compartilháveis com o time via Git
- Hooks complementam Steering: steering guia *como* pensar, hooks automatizam *quando* agir

## Evolução do projeto ao longo das sessões

```
Sessão 1 — Spec Driven
  └── Criou: src/services/, src/types/, src/routes/products.ts, tests/

Sessão 2 — Steering Documents
  └── Criou: .kiro/steering/ (tech, structure, product, padrões, git flow, trello)

Sessão 3 — Agent Hooks  ← ESTA SESSÃO
  └── Criou: .kiro/hooks/ (lint-on-save, update-readme)
```

---

> 📌 **Fonte oficial**: [Documentação Kiro - Hooks](https://kiro.dev/docs/hooks/)
