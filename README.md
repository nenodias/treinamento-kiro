# Demo — Spec Driven Development com Kiro

Projeto backend usado na demonstração ao vivo do treinamento.

## Stack

- Node.js + TypeScript
- Express
- Dados em memória (sem banco externo)

## Setup

```bash
npm install
npm run dev
```

## Endpoints existentes

| Método | Rota      | Descrição         |
|--------|-----------|-------------------|
| GET    | /health   | Health check      |

## O que será criado na demo

Durante a demonstração ao vivo, usaremos o **Spec Driven** do Kiro para criar:

> **GET /products** — Endpoint de busca de produtos com filtros, paginação e ordenação.

O objetivo é mostrar o fluxo completo:
1. Requisitos gerados e revisados
2. Design aprovado
3. Tarefas criadas
4. Implementação automática

## Estrutura

```
src/
├── app.ts              # Configuração do Express
├── server.ts           # Entrypoint
├── database/
│   └── products.ts     # Dados fake (simula DB)
└── routes/
    └── health.ts       # Health check
```

Após a demo, a estrutura terá novos arquivos criados pelo Kiro via Spec.
