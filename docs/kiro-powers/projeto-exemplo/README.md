# 💻 Projeto de Exemplo — API de Usuários

## Sobre

API simples de gerenciamento de usuários em Node.js, usada como base para demonstrar a criação de Kiro Powers.

O projeto segue padrões específicos (handlers → services → utils) que serão documentados em um Power durante a demo.

---

## Estrutura

```
projeto-exemplo/
├── src/
│   ├── handlers/
│   │   └── criar-usuario.mjs      ← Handler Lambda
│   ├── services/
│   │   └── usuario-service.mjs    ← Lógica de negócio
│   └── utils/
│       └── resposta.mjs           ← Função de resposta padronizada
├── power-do-time/
│   └── POWER.md                   ← Power criado como referência
├── package.json
└── README.md
```

---

## Padrões usados no projeto

| Camada | Responsabilidade | Exemplo |
|--------|-----------------|---------|
| handlers/ | Entry point, validação básica, try/catch | `criar-usuario.mjs` |
| services/ | Lógica de negócio, regras | `usuario-service.mjs` |
| utils/ | Funções auxiliares reutilizáveis | `resposta.mjs` |

---

## Exercícios práticos

### Exercício 1: Instalar o Power de exemplo

1. Abra este projeto no Kiro
2. `Ctrl + Shift + P` → `Configure Powers`
3. Instale de diretório local → aponte para `power-do-time/`
4. Teste: peça ao Kiro "Crie um endpoint para listar usuários"

### Exercício 2: Modificar o Power

1. Abra `power-do-time/POWER.md`
2. Adicione uma nova regra (ex: "Sempre adicionar timestamp nos logs")
3. Teste: peça ao Kiro para gerar código e veja se a nova regra é seguida

### Exercício 3: Criar seu próprio Power

1. Crie uma nova pasta `meu-power/`
2. Crie um `POWER.md` com frontmatter e regras do seu time
3. Instale e teste no chat

---

## Configuração MCP (bônus)

O arquivo `.kiro/settings/mcp.json` já vem configurado com o AWS Documentation server:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uv",
      "args": [
        "tool", "run", "--from",
        "awslabs.aws-documentation-mcp-server@latest",
        "awslabs.aws-documentation-mcp-server.exe"
      ],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

> ⚠️ Requer `uv` instalado. Instale com: `irm https://astral.sh/uv/install.ps1 | iex`

---

## Pré-requisitos

- Kiro IDE instalado
- Node.js 18+ (para os exemplos de código)
- `uv` instalado (para o MCP server — opcional)
