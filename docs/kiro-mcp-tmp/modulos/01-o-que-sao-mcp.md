# 🔌 Treinamento: MCP (Model Context Protocol) no Kiro

## Sobre este treinamento

Material de apoio para sessão de **~30 minutos** sobre **MCP — Model Context Protocol** no Kiro — o protocolo aberto que permite ao agente se conectar com ferramentas externas, APIs e fontes de dados em tempo real.

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

## Pontos Principais da Apresentação

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

### 4. Precedência de Configuração

```
User config (global)  →  Workspace 1  →  Workspace 2  → ...
   (menor)                                    (maior precedência)
```

- Configs são **mergeadas** — workspace sobrescreve global
- Em multi-root workspaces, cada workspace pode ter sua própria config

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

### 7. Boas Práticas

- ✅ Use `autoApprove` apenas para ferramentas **read-only** e seguras
- ✅ Configure servers no nível de **workspace** para projetos específicos
- ✅ Use `disabled: true` para desligar temporariamente sem perder config
- ✅ Prefira `uvx` (Python) ou `npx` (Node) — download automático sem instalação manual
- ❌ Não coloque secrets diretamente no `mcp.json` — use variáveis de ambiente
- ❌ Evite muitos servers ativos simultaneamente — polui o contexto do agente

### 8. MCP vs Powers

| Aspecto | MCP puro | Kiro Powers |
|---------|----------|-------------|
| Carregamento | Sempre ativo | Sob demanda (por keywords) |
| Contexto | Todas as ferramentas sempre visíveis | Só carrega quando relevante |
| Documentação | Separada do server | Integrada (POWER.md) |
| Compartilhamento | Copiar mcp.json | Instalar via repositório |
| Ideal para | Poucos servers essenciais | Muitos servers especializados |

> 💡 **Regra prática**: Se você tem **1-3 servers** que usa o tempo todo → MCP direto. Se tem **5+ servers** especializados → encapsule em Powers.

### 9. Demo ao Vivo — Sugestão de Roteiro

#### Demo 1: Configurando um MCP Server (~5 min)
1. Abrir `.kiro/settings/mcp.json`
2. Adicionar o Trello MCP server
3. Mostrar reconexão automática
4. Testar com "Liste os boards do Trello"

#### Demo 2: Usando ferramentas MCP no chat (~5 min)
1. Pedir ao Kiro para criar um card no Trello
2. Mostrar o fluxo de aprovação
3. Configurar `autoApprove` para leitura
4. Refazer a consulta — sem confirmação

#### Demo 3: autoApprove e Segurança (~3 min)
1. Explicar o conceito de aprovação
2. Mostrar como listar ferramentas aprovadas
3. Discutir riscos de aprovar operações de escrita

### 10. Troubleshooting Comum

| Problema | Solução |
|----------|---------|
| Server não conecta | Verificar se `uvx`/`npx` está instalado e no PATH |
| Ferramenta não aparece | Reconectar via Command Palette → "MCP: Reconnect" |
| Erro de permissão | Verificar variáveis de ambiente e tokens |
| Server lento | Checar logs do MCP server no Output panel |
| Conflito de config | Lembrar da precedência: workspace > global |

---

## Pré-requisitos

- **Kiro IDE** instalado e autenticado
- **Python + uv** instalados (para servers com `uvx`)
- **Node.js + npm** instalados (para servers com `npx`)

---

## Referências

- 📌 [Documentação Kiro - MCP](https://kiro.dev/docs/mcp/)
- 📌 [MCP Specification (oficial)](https://modelcontextprotocol.io/)
- 📌 [Repositório de MCP Servers](https://github.com/modelcontextprotocol/servers)

---

## Resumo para o Apresentador

```
1. MCP = protocolo aberto para conectar agentes a ferramentas externas
2. Configuração simples via JSON (mcp.json)
3. Servers rodam localmente como processos (uvx, npx)
4. autoApprove controla quais ferramentas não pedem confirmação
5. Powers encapsulam MCP servers + docs para uso sob demanda
6. Boas práticas: poucos servers ativos, secrets em env vars, autoApprove só para leitura
```
