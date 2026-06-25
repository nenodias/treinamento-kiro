# Projeto Demo — API de Tarefas

Projeto Node.js preparado para demonstrar as funcionalidades do Kiro num workshop.

## Setup

```bash
cd projeto-demo
npm install
npm test    # 38 testes passando
```

## Estrutura

```
projeto-demo/
├── src/
│   ├── handlers/            ← Entry points HTTP
│   │   ├── criar-tarefa.mjs
│   │   ├── criar-tarefa.test.mjs
│   │   └── listar-tarefas.mjs
│   ├── services/            ← Lógica de negócio
│   │   ├── tarefa-service.mjs
│   │   ├── subtarefa-service.ts
│   │   └── subtarefa-service.test.mjs
│   └── utils/               ← Helpers compartilhados
│       └── resposta.mjs
└── package.json
```

## Sugestões de demo ao vivo

1. **Vibe**: "Crie um handler para concluir tarefa por ID"
2. **Spec**: Criar spec "filtro por status na listagem de tarefas"
3. **Steering**: Mostrar que código gerado segue padrões de `padroes.md`
4. **Hooks**: Salvar arquivo e ver lint rodar; fazer commit e ver testes rodarem
5. **Subagents**: Invocar `test-writer` para gerar testes do `listar-tarefas.mjs`
6. **MCP**: "Pesquise na doc AWS como configurar Lambda com API Gateway"
7. **Powers**: Mostrar `powers/padrao-time/` como exemplo de power customizado

## Pré-requisitos

- Kiro IDE 0.9+
- Node.js 18+
- Modo **Autopilot** habilitado (para subagents e hooks)
