# Módulo 01 — O que é Spec Driven e por que usar

## O problema que o Spec Driven resolve

Quando usamos IA para codificar no modo "vibe coding":

- Você pede algo vago → a IA interpreta do jeito dela → resultado imprevisível
- Features complexas viram **bola de neve** — a IA perde contexto no meio
- Não há rastreabilidade entre o que foi pedido e o que foi implementado
- Retrabalho constante porque "não era bem isso que eu queria"
- Difícil de revisar — ninguém sabe qual era a intenção original

## O que é Spec Driven?

É o modo de sessão do Kiro que estrutura o desenvolvimento em **3 artefatos** antes de escrever código:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Requisitos │ ──▶ │   Design    │ ──▶ │   Tarefas   │ ──▶ │   Código    │
│  (O quê)    │     │  (Como)     │     │  (Passos)   │     │  (Execução) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

Cada etapa é **iterativa** — você revisa, ajusta e aprova antes de avançar.

## Os 3 artefatos

### 1. Requirements (requirements.md)
- User stories no formato "Como [persona], quero [ação], para [benefício]"
- Critérios de aceitação claros
- Você valida antes de prosseguir

### 2. Design (design.md)
- Arquitetura da solução
- Modelos de dados, APIs, fluxos
- Decisões técnicas documentadas

### 3. Tasks (tasks.md)
- Lista ordenada de tarefas de implementação
- Cada tarefa é atômica e verificável
- O Kiro executa uma a uma, marcando como concluída

## Vibe vs Spec — Quando usar cada um?

| Cenário | Modo recomendado |
|---------|-----------------|
| Fix rápido, pergunta, exploração | **Vibe** |
| Feature nova com múltiplos arquivos | **Spec** |
| Refatoração grande | **Spec** |
| Protótipo descartável | **Vibe** |
| Feature que precisa de review do time | **Spec** |

## O diferencial

- ✅ **Rastreabilidade** — cada linha de código tem uma tarefa, que tem um requisito
- ✅ **Controle** — você aprova cada etapa antes de avançar
- ✅ **Contexto preservado** — os artefatos servem de "memória" para a IA
- ✅ **Colaboração** — specs podem ser revisadas pelo time antes da implementação
- ✅ **Reprodutibilidade** — mesma spec, mesmo resultado

---

➡️ **Próximo**: [Módulo 02 — O fluxo na prática](02-fluxo-na-pratica.md)
