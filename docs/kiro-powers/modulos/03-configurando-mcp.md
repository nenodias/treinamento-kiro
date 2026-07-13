# ⚙️ Módulo 03 — Configurando MCP Servers

> ⏱️ Tempo estimado: ~5 minutos

---

## O que é MCP?

**Model Context Protocol** é o padrão que permite ao Kiro se conectar com ferramentas externas — banco de dados, APIs, documentação, e mais.

```
┌──────────┐       MCP Protocol       ┌──────────────────┐
│   Kiro   │ ◄─────────────────────► │  MCP Server      │
│  (IDE)   │    stdio / HTTP / SSE    │  (ferramenta)    │
└──────────┘                          └──────────────────┘
```

Powers **podem** incluir MCP servers — quando incluem, o Kiro configura tudo automaticamente na instalação.

Mas você também pode configurar MCP servers **manualmente**, sem usar um Power.

---

## Arquivo de configuração: mcp.json

O Kiro procura configuração MCP em dois lugares:

### 1. Workspace (projeto específico)
```
.kiro/settings/mcp.json
```

### 2. Usuário (global, todos os projetos)
```
~/.kiro/settings/mcp.json
```

> Precedência: workspace sobrescreve usuário.

---

## Exemplo prático: AWS Documentation Server

Este MCP server **não precisa de key, token ou Docker**. Apenas `uv` instalado.

### Passo 1: Instalar o `uv`

```powershell
# Windows (PowerShell)
irm https://astral.sh/uv/install.ps1 | iex

# Verificar instalação
uv --version
```

### Passo 2: Criar o arquivo de configuração

Crie `.kiro/settings/mcp.json` no seu projeto:

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
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Passo 3: Testar no chat

```
Prompt: "Pesquise na documentação da AWS sobre S3 bucket policies"
```

O Kiro vai usar a ferramenta `mcp_aws_docs_search_documentation` para buscar na doc oficial.

---

## Anatomia do mcp.json

```json
{
  "mcpServers": {
    "nome-do-server": {
      // Para servidores LOCAIS (stdio):
      "command": "uv",              // comando para executar
      "args": ["..."],              // argumentos do comando
      "env": { "CHAVE": "valor" }, // variáveis de ambiente
      "cwd": ".",                   // diretório de trabalho

      // Para servidores REMOTOS (HTTP/SSE):
      "url": "https://...",         // URL do servidor
      "headers": { "Auth": "..." },// headers HTTP

      // Opções comuns:
      "disabled": false,            // desativar temporariamente
      "autoApprove": ["tool_name"]  // aprovar ferramentas automaticamente
    }
  }
}
```

> ⚠️ Use **local** (command/args) OU **remoto** (url/headers), nunca os dois juntos.

---

## Segundo exemplo: AWS IaC Server (também sem key)

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
    },
    "aws-iac": {
      "command": "uv",
      "args": [
        "tool", "run", "--from",
        "awslabs.aws-iac-mcp-server@latest",
        "awslabs.aws-iac-mcp-server.exe"
      ],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

Agora o Kiro pode:
- 🔍 Pesquisar documentação AWS (`aws-docs`)
- 🏗️ Validar templates CloudFormation/CDK (`aws-iac`)

---

## MCP vs Power — Qual a diferença?

| | MCP Server manual | Power com MCP |
|-|-------------------|---------------|
| Configuração | Você edita mcp.json | Instalação automática |
| Documentação | Separada (você procura) | Junto com a ferramenta |
| Ativação | Sempre carregado | Sob demanda (keywords) |
| Compartilhamento | Copiar JSON | Instalar da galeria/repo |
| Contexto | Ocupa tokens sempre | Carrega só quando precisa |

**Resumo**: MCP manual é bom para testar. Power é melhor para produção e time.

---

## Troubleshooting

### "Failed to connect to MCP server"

**Causa mais comum**: `uv` não está instalado ou não está no PATH.

```powershell
# Verificar se uv existe
uv --version

# Se não encontrar, reinstalar
irm https://astral.sh/uv/install.ps1 | iex
```

### Server conecta mas não responde

**Causa**: Primeira execução baixa dependências. Aguarde ~30 segundos.

### Ferramentas não aparecem

**Causa**: O servidor pode estar desabilitado.
- Verifique `"disabled": false` no mcp.json
- Use `Ctrl + Shift + P` → `Kiro: Reconnect MCP Servers`

---

## Resumo

- MCP servers se configuram em `.kiro/settings/mcp.json`
- O AWS Documentation server é o mais fácil: zero key, zero Docker
- Dois modos: local (command + args) e remoto (url + headers)
- Pode combinar múltiplos servers no mesmo arquivo
- Para o time, Powers são melhores que MCP manual

---

> 📌 **Próximo**: [Módulo 04 — Criando seu próprio Power](04-criando-seu-power.md)
