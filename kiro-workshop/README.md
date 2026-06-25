# Workshop: Kiro — IDE + CLI na Prática

## Sobre

Workshop prático de **40 minutos** cobrindo as principais funcionalidades do **Kiro IDE** e **Kiro CLI**. Um módulo por feature, direto ao ponto, tudo demonstrado num projeto real.

---

## Módulos

| # | Módulo | Feature | Tempo |
|---|--------|---------|-------|
| 00 | [Agenda](modulos/00-agenda.md) | Visão geral do workshop | ~2 min |
| 01 | [Vibe & Spec](modulos/01-vibe-e-spec.md) | Sessões Vibe (chat) e Spec (estruturado) | ~5 min |
| 02 | [Steering](modulos/02-steering.md) | Instruções persistentes para o agente | ~4 min |
| 03 | [Hooks](modulos/03-hooks.md) | Automação baseada em eventos | ~5 min |
| 04 | [Subagents](modulos/04-subagents.md) | Agentes especializados em paralelo | ~5 min |
| 05 | [Powers & MCP](modulos/05-powers-e-mcp.md) | Ferramentas externas e Powers | ~5 min |
| 06 | [Kiro CLI](modulos/06-kiro-cli.md) | IA no terminal: chat, autocomplete, agents | ~6 min |

---

## Projeto Demo

O [`projeto-demo/`](projeto-demo/) é uma API Node.js de **gerenciamento de tarefas** — código limpo, pronto para demonstrações ao vivo.

Instruções detalhadas em [projeto-demo/README.md](projeto-demo/README.md).

---

## Configs do Kiro (na raiz do workspace)

Todas as configurações do Kiro estão em `.kiro/` na raiz:

```
.kiro/
├── steering/            ← 8 steering files
│   ├── padroes.md              → always: padrões do time backend
│   ├── commits.md              → always: Conventional Commits
│   ├── code-review.md          → always: checklist de code review
│   ├── product.md              → always: contexto do produto
│   ├── structure.md            → always: estrutura do projeto
│   ├── tech.md                 → always: tech stack
│   ├── testes.md               → fileMatch: padrões de teste (*.test.mjs)
│   └── api-aws-lambda.md       → manual: referência API Lambda
├── hooks/               ← 3 hooks de exemplo
│   ├── lint-on-save.json       → PostFileSave: roda lint ao salvar
│   ├── auto-review.json        → Stop: revisa código após geração
│   └── testes-antes-commit.json → PreToolUse: exige testes antes de commit
├── agents/              ← 3 subagents customizados
│   ├── code-reviewer.md        → Revisa código por qualidade e segurança
│   ├── test-writer.md          → Gera testes unitários
│   └── test-suite-runner.md    → Orquestra testes em paralelo
└── powers/              ← (vazio — poder removido, use powers/ na raiz)
```

---

## Powers

```
powers/
├── README.md            ← Instruções de como criar um Power
└── padrao-time/         ← Power de exemplo
    ├── POWER.md         → Manifesto do Power
    └── steering/
        └── convencoes.md → Convenções incluídas pelo Power
```

---

## MCP (configuração manual)

O MCP precisa ser configurado via `.kiro/settings/mcp.json`. Crie o arquivo manualmente ou pelo painel do Kiro:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false
    }
  }
}
```

> Requer `uvx` instalado. Instalar com: `pip install uv` ou via [docs](https://docs.astral.sh/uv/getting-started/installation/).

---

## Setup rápido

```bash
# 1. Instalar dependências do projeto demo
cd projeto-demo
npm install

# 2. Verificar que tudo funciona
npm test          # 38 testes devem passar

# 3. Abrir no Kiro IDE
# Abrir a pasta kiro-workshop/ como workspace
```

---

## Pré-requisitos

- **Kiro IDE** instalado (0.9+)
- **Node.js** 18+
- **uvx** instalado (para MCP server — opcional)
- **Modo Autopilot** habilitado no Kiro (para subagents e hooks)

---

## Guia para apresentadores

### Antes da sessão
1. `cd projeto-demo && npm install && npm test` — garantir que funciona
2. Abrir o workspace no Kiro IDE
3. Configurar MCP se quiser demonstrar (ver seção acima)
4. Ativar modo Autopilot

### Durante a sessão
- Seguir os módulos na ordem (00 → 06)
- Cada módulo indica o que demonstrar ao vivo
- O projeto está "limpo" — sem specs pré-criadas, pronto para criar ao vivo
- Use as sugestões de demo do [projeto-demo/README.md](projeto-demo/README.md)

### Dicas
- Se MCP não conectar: pule essa parte (não bloqueia o resto)
- Se testes falharem: rodar `npm install` novamente
- Manter terminal aberto no `projeto-demo/` para comandos rápidos

---

> **Docs**: [kiro.dev/docs](https://kiro.dev/docs/) | **CLI**: [kiro.dev/cli](https://kiro.dev/cli/)
