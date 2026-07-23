# 🔌 Treinamento: MCP (Model Context Protocol) no Kiro

---

## O que é MCP?

MCP é um **protocolo aberto** que padroniza a comunicação entre agentes de IA e ferramentas externas. No Kiro, MCP servers fornecem **ferramentas adicionais** que o agente pode usar durante suas interações.

[Documentação oficial](https://modelcontextprotocol.io/docs/getting-started/intro)

```
┌──────────────────────────────────────────────────────────────┐
│                    Fluxo MCP no Kiro                          │
│                                                              │
│  Usuário → Prompt → Kiro Agent → MCP Server → Ferramenta    │
│                         ↑              ↓                     │
│                         └── Resultado ←┘                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Pontos Principais

### 1. Conceito e Motivação

- MCP = **Model Context Protocol** — padrão aberto criado pela Anthropic
- Permite que o agente **acesse ferramentas externas** sem código customizado
- Analogia: MCP é como uma "tomada universal" — qualquer ferramenta que implemente o protocolo funciona com qualquer agente compatível
- Resolve o problema de **cada IDE ter seu próprio sistema de plugins**

### 2. Arquitetura

```
┌─────────┐     stdio/SSE      ┌──────────────┐     HTTP/SDK     ┌──────────┐
│  Kiro   │ ←─────────────────→│  MCP Server  │←────────────────→│  Serviço │
│ (Host)  │   JSON-RPC 2.0     │  (processo)  │                  │ Externo  │
└─────────┘                    └──────────────┘                  └──────────┘
```

- **Host**: Kiro (o cliente que consome as ferramentas)
- **MCP Server**: processo local que expõe ferramentas via protocolo padronizado
- **Transporte**: stdio (local) ou SSE (remoto)
- **Formato**: JSON-RPC 2.0

### 3. Configuração no Kiro

Arquivo de configuração: `.kiro/settings/mcp.json` (workspace) ou `~/.kiro/settings/mcp.json` (global)

```json
{
  "mcpServers": {
    "nome-do-server": {
      "command": "uvx",
      "args": ["pacote-do-server@latest"],
      "env": {
        "VARIAVEL": "valor"
      },
      "disabled": false,
      "autoApprove": ["nome_da_ferramenta"]
    }
  }
}
```

#### Campos importantes:

| Campo | Descrição |
|-------|-----------|
| `command` | Comando para iniciar o server (`uvx`, `npx`, `node`, etc.) |
| `args` | Argumentos do comando |
| `env` | Variáveis de ambiente para o server |
| `disabled` | Habilitar/desabilitar sem remover config |
| `autoApprove` | Ferramentas aprovadas automaticamente (sem confirmação) |


### 5. Exemplos de MCP Servers Populares

| Server | O que faz | Comando |
|--------|-----------|---------|
| AWS Docs | Pesquisa documentação AWS | `uvx awslabs.aws-documentation-mcp-server@latest` |
| Trello | Gerencia boards, cards, listas | `npx trello-mcp-server` |
| GitHub | Acessa repos, issues, PRs | `uvx github-mcp-server` |
| Filesystem | Lê/escreve arquivos fora do workspace | `npx @modelcontextprotocol/server-filesystem` |
| PostgreSQL | Queries em banco PostgreSQL | `uvx pg-mcp-server` |

### 6. Como o Kiro usa as ferramentas MCP

1. **Descoberta**: Kiro lista as ferramentas disponíveis no server
2. **Seleção**: Baseado no prompt do usuário, decide qual ferramenta usar
3. **Execução**: Chama a ferramenta com os parâmetros adequados
4. **Aprovação**: Pede confirmação do usuário (a menos que esteja em `autoApprove`)
5. **Resultado**: Incorpora o resultado na resposta

> ⚠️ **CUIDADO**: MCP servers são **código executado na sua máquina**. Nunca instale servers de fontes desconhecidas ou não confiáveis — um server malicioso pode acessar arquivos, variáveis de ambiente, tokens e executar comandos arbitrários no seu sistema. Sempre verifique o código-fonte e a reputação do repositório antes de adicionar um novo MCP server.

### 7. Boas Práticas

- ✅ Use `autoApprove` apenas para ferramentas **read-only** e seguras
- ✅ Configure servers no nível de **workspace** para projetos específicos
- ✅ Use `disabled: true` para desligar temporariamente sem perder config
- ✅ Prefira `uvx` (Python) ou `npx` (Node) — download automático sem instalação manual
- ❌ Não coloque secrets diretamente no `mcp.json` — use variáveis de ambiente
- ❌ Evite muitos servers ativos simultaneamente — polui o contexto do agente

> 💡 **Regra prática**: Se você tem **1-3 servers** que usa o tempo todo → MCP direto. Se tem **5+ servers** especializados → encapsule em Powers.


## Referências

- 📌 [Documentação Kiro - MCP](https://kiro.dev/docs/mcp/)
- 📌 [MCP Specification (oficial)](https://modelcontextprotocol.io/)
- 📌 [Repositório de MCP Servers](https://github.com/modelcontextprotocol/servers)
