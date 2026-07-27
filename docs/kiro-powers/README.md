# ⚡ Treinamento: Powers no Kiro

## Sobre este treinamento

Material de apoio para sessão de **~25 minutos** sobre **Kiro Powers** — o sistema de pacotes inteligentes que dá ao agente acesso instantâneo a conhecimento especializado para qualquer tecnologia, ativando contexto sob demanda.

## Contexto do projeto

Este treinamento faz parte da série de sessões sobre Kiro. As sessões anteriores cobriram:

- **Spec Driven Development** — criação de features com requirements → design → tasks
- **Steering Documents** — guias que orientam o comportamento do agente
- **Agent Hooks** — automação baseada em eventos na IDE

Nesta sessão, exploramos **Powers** — pacotes que empacotam ferramentas, workflows e boas práticas em um formato que o Kiro ativa sob demanda.

## O que são Powers?

Powers são **pacotes inteligentes** que combinam documentação, ferramentas MCP e workflows em um formato que o Kiro carrega automaticamente quando você menciona palavras-chave relevantes.

```
Você menciona "database"  →  Kiro ativa o Power do Supabase
Você menciona "payment"   →  Kiro ativa o Power do Stripe
Você muda de assunto      →  Kiro desativa e ativa outro Power
```

Diferente de carregar 100+ ferramentas MCP de uma vez (consumindo 50.000+ tokens), Powers carregam apenas o contexto relevante para a tarefa atual.

## Estrutura do Treinamento

| Módulo | Tema | Tempo |
|--------|------|-------|
| [01 — O que são Powers](01-o-que-sao-powers.md) | Conceito, problema e solução | ~5 min |
| [02 — Anatomia de um Power](02-anatomia-de-um-power.md) | POWER.md, mcp.json, steering/ | ~7 min |
| [03 — Instalação e Uso](03-instalacao-e-uso.md) | Instalar, ativar e usar powers | ~5 min |
| [04 — Criando seu próprio Power](04-criando-power.md) | Guia para criar e compartilhar | ~8 min |

## Pré-requisitos

- Kiro IDE instalado
- Projeto do treinamento clonado e com dependências instaladas
- Familiaridade com as sessões anteriores (Steering, Hooks, Spec Driven)

## Powers parceiros de lançamento

O ecossistema já conta com powers curados de parceiros:

| Power | Domínio |
|-------|---------|
| Datadog | Monitoramento e observabilidade |
| Dynatrace | Performance e APM |
| Figma | Design e UI |
| Neon | Banco de dados Postgres serverless |
| Netlify | Deploy e hosting |
| Postman | Testes de API |
| Supabase | Backend-as-a-Service |
| Stripe | Pagamentos |
| Strands SDK | Agentes AI |
| AWS Aurora | Banco de dados relacional |

## Evolução do projeto ao longo das sessões

```
Sessão 1 — Spec Driven
  └── Criou: src/services/, src/types/, src/routes/products.ts, tests/

Sessão 2 — Steering Documents
  └── Criou: .kiro/steering/ (tech, structure, product, padrões, git flow, trello)

Sessão 3 — Agent Hooks
  └── Criou: .kiro/hooks/ (lint-on-save, update-readme)

Sessão 4 — Kiro Powers  ← ESTA SESSÃO
  └── Explorou: instalação, ativação e criação de powers
```

---

> 📌 **Fonte oficial**: [Documentação Kiro - Powers](https://kiro.dev/docs/powers/)
