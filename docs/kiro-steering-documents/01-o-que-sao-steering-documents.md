# Módulo 01 — O que são Steering Documents?

## O problema que eles resolvem

Imagine que você trabalha em um time com regras claras:

- "Sempre use camelCase para variáveis"
- "APIs devem retornar erros no formato RFC 7807"
- "Nunca use `any` no TypeScript"
- "Logs devem seguir o padrão structured logging"

Sem Steering Documents, você precisa **repetir essas instruções** toda vez que interage com o agente. É como ter um estagiário novo todo dia que não lembra das regras do time.

## Analogia simples

| Sem Steering | Com Steering |
|---|---|
| Repetir regras a cada prompt | Regras carregadas automaticamente |
| Respostas inconsistentes | Padrão mantido em toda interação |
| Cada dev configura diferente | Time inteiro alinhado via repositório |
| Contexto perdido entre sessões | Contexto persistente no projeto |

Pense nos Steering Documents como o **"onboarding permanente"** do agente — ele sempre sabe como seu time trabalha.

## O que são na prática?

São arquivos `.md` (Markdown) que ficam em:

```
.kiro/steering/
├── padroes-codigo.md
├── convencoes-api.md
└── seguranca.md
```

Cada arquivo contém instruções em linguagem natural que o Kiro lê antes de responder. Podem incluir:

- Regras de estilo de código
- Convenções de nomenclatura
- Padrões de arquitetura
- Informações sobre o projeto
- Instruções de build/test/deploy
- Qualquer contexto relevante para o time

## Como funciona por baixo dos panos

```
┌─────────────────────────────────────────────────┐
│                  Sua pergunta                     │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│         Kiro carrega Steering Documents          │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ always       │  │ fileMatch    │            │
│  │ (sempre)     │  │ (condicional)│            │
│  └──────────────┘  └──────────────┘            │
│                                                  │
│  ┌──────────────┐                               │
│  │ manual       │                               │
│  │ (sob demanda)│                               │
│  └──────────────┘                               │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│     Resposta alinhada com padrões do time        │
└─────────────────────────────────────────────────┘
```

## Escopos disponíveis

Os Steering Documents podem existir em dois níveis:

| Escopo | Localização | Uso |
|--------|-------------|-----|
| **Workspace** | `.kiro/steering/` no projeto | Regras específicas do projeto/time |
| **Usuário** | `~/.kiro/steering/` (home) | Preferências pessoais globais |

O escopo de workspace é compartilhado via Git com todo o time. O escopo de usuário é pessoal e se aplica a todos os projetos.

## Quando usar?

✅ **Use Steering Documents quando:**
- Seu time tem padrões que devem ser seguidos sempre
- Você repete as mesmas instruções frequentemente
- Quer consistência entre diferentes desenvolvedores
- Precisa que o agente conheça contexto do projeto

❌ **Não use para:**
- Instruções de uma única vez (use o chat direto)
- Dados sensíveis como secrets ou tokens
- Arquivos muito grandes (mantenha focado e conciso)

## Resumo

| Conceito | Descrição |
|----------|-----------|
| O que é | Arquivo Markdown com instruções para o Kiro |
| Onde fica | `.kiro/steering/*.md` |
| Para que serve | Manter padrões e contexto persistentes |
| Quem se beneficia | Todo o time (via Git) |

---

> 📌 **Próximo módulo**: [02 - Como criar e configurar](02-como-criar-e-configurar.md)
