# 💻 Treinamento: Kiro CLI

## O que é o Kiro CLI?

O Kiro CLI é um agente de codificação IA que vive no seu terminal. Ele lê seu codebase, escreve código, executa comandos e pede confirmação antes de fazer qualquer ação destrutiva.

```
Terminal → Kiro CLI → Desenvolvimento assistido por IA
                    → Custom Agents especializados
                    → Automação via headless mode
                    → MCP, Hooks, Steering — tudo no terminal
```

---

## Agenda do Treinamento

| # | Módulo | Duração |
|---|--------|---------|
| 1 | Introdução e Instalação | 5 min |
| 2 | Chat Interativo e Slash Commands | 15 min |
| 3 | Custom Agents | 10 min |
| 4 | Steering, Hooks e MCP no CLI | 10 min |
| 5 | Headless Mode (CI/CD) | 10 min |
| 6 | Features Avançadas (Plan, Spawn, Knowledge) | 10 min |
| 7 | Demo ao Vivo | 15 min |

---

## 1. Instalação

### Windows

Download direto ou via PowerShell:

```powershell
irm 'https://cli.kiro.dev/install.ps1' | iex
```

### macOS / Linux

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

### Primeiro uso

```bash
cd my-project
kiro-cli
```

Na primeira execução, o Kiro abre o navegador para autenticação (login social ou IAM Identity Center).

---

## 2. Chat Interativo e Slash Commands

### Iniciando uma sessão

```bash
kiro-cli chat
```

O CLI abre uma interface interativa rica com syntax highlighting, painéis interativos e progresso visual de ferramentas.

### Slash Commands principais

| Comando | Descrição |
|---------|-----------|
| `/help` | Acessa o Help Agent ou exibe ajuda clássica |
| `/model` | Seleciona o modelo de IA (persiste entre sessões) |
| `/agent` | Lista, cria, edita ou troca de agente |
| `/context` | Gerencia arquivos de contexto (add, remove, show) |
| `/compact` | Compacta histórico para liberar espaço de contexto |
| `/plan` | Ativa o Plan Agent para planejamento estruturado |
| `/spawn` | Inicia uma sessão paralela para tarefas concorrentes |
| `/chat new` | Inicia nova conversa sem reiniciar o CLI |
| `/chat resume` | Retoma sessão anterior |
| `/tools` | Visualiza e gerencia permissões de ferramentas |
| `/mcp` | Visualiza servidores MCP ativos |
| `/hooks` | Visualiza hooks de contexto ativos |
| `/knowledge` | Gerencia knowledge base (busca semântica) |
| `/effort` | Define nível de raciocínio (low → max) |
| `/goal` | Inicia loop iterativo até atingir objetivo |
| `/checkpoint` | Gerencia snapshots do workspace |
| `/copy` | Copia última resposta para clipboard |
| `/code` | Code intelligence (LSP, overview, status) |
| `/settings` | Configurações de tema, keybindings, display |

### Atalhos de teclado

| Atalho | Ação |
|--------|------|
| `Ctrl+C` | Cancela input / sai da sessão |
| `Ctrl+G` | Monitor de subagents e sessões paralelas |
| `Ctrl+J` | Nova linha (funciona em todos os terminais) |
| `Ctrl+O` | Expande output de shell colapsado |
| `Ctrl+R` | Busca reversa no histórico |
| `Ctrl+S` | Fuzzy search em comandos e arquivos de contexto |
| `Ctrl+T` | Toggle tangent mode |
| `Shift+Tab` | Entra no Plan mode |
| `Tab` | Autocomplete / drill-down em opções |
| `Esc` | Fecha painéis / cancela execução |

---

## 3. Custom Agents

Custom agents permitem criar configurações especializadas para diferentes casos de uso.

### Criando um agente

```bash
# Criação assistida por IA (padrão)
> /agent create code-reviewer

# Com descrição e MCP servers
> /agent create code-reviewer -D "Revisão de código" -m code-analysis

# Criação manual via editor
> /agent create code-reviewer --manual
```

### Estrutura de um agente

Agentes ficam em:
- **Workspace**: `.kiro/agents/`
- **Global**: `~/.kiro/agents/`

Cada agente define: ferramentas permitidas, permissões, contexto e prompts.

### Gerenciando agentes

```bash
> /agent list           # Lista todos os agentes
> /agent swap reviewer  # Troca de agente em runtime
> /agent edit           # Edita agente atual
> /agent set-default    # Define agente padrão
```

### Lançando com agente específico

```bash
kiro-cli chat --agent code-reviewer
```

---

## 4. Steering, Hooks e MCP no CLI

### Steering

Steering files guiam o comportamento do agente — funcionam igual ao Kiro IDE:

- **Global**: `~/.kiro/steering/*.md`
- **Workspace**: `.kiro/steering/*.md`

Workspace tem prioridade sobre global em caso de conflito.

### Hooks

Hooks executam comandos em pontos específicos do ciclo de vida do agente:

```bash
> /hooks   # Visualiza hooks ativos
```

Configuração em `.kiro/hooks/` — mesmo formato JSON que no IDE.

### MCP (Model Context Protocol)

```bash
> /mcp            # Visualiza servidores ativos
> /mcp auth       # Re-autentica servidor remoto
> /mcp logout     # Remove credenciais de um servidor
```

Configuração em `.kiro/settings/mcp.json` (workspace ou global).

---

## 5. Headless Mode (CI/CD)

O headless mode permite executar o Kiro CLI de forma não-interativa em pipelines automatizados.

### Setup

1. Gerar API key no painel Kiro
2. Configurar variável de ambiente:

```bash
export KIRO_API_KEY="sua-api-key"
```

### Uso básico

```bash
kiro-cli chat --no-interactive "Analise o código e gere testes unitários"
```

### Flags importantes

| Flag | Descrição |
|------|-----------|
| `--no-interactive` | Modo headless (não espera input) |
| `--trust-all-tools` | Confia em todas as ferramentas |
| `--trust-tools` | Confia em ferramentas específicas |
| `--print` | Executa prompt e imprime resultado |

### Exemplo: Script de CI/CD

```bash
#!/bin/bash
git checkout -b fix/deploy-issue
kiro-cli --print "Analise os logs de falha do CI, encontre a causa raiz e aplique um fix."
git add -A
git commit -m "fix: resolve deploy step failure"
git push origin fix/deploy-issue
gh pr create --title "fix: resolve deploy step failure" --body "Fix automatizado via Kiro CLI"
```

### Casos de uso

- Code review automatizado em PRs
- Geração de testes em pipelines
- Troubleshooting de falhas de build
- Documentação automática
- Análise de segurança

---

## 6. Features Avançadas

### Plan Agent (`/plan`)

Modo de planejamento que quebra ideias complexas em planos de implementação sem modificar código.

```bash
> /plan Build a REST API for user management
```

O Plan Agent pesquisa na web, analisa codebase e gera um plano detalhado com tasks.

### Spawn — Sessões Paralelas (`/spawn`)

Executa tarefas em paralelo sem bloquear a conversa principal:

```bash
> /spawn --name test-analysis Analise a cobertura de testes e sugira melhorias
```

Monitore com `Ctrl+G` (crew monitor).

### Knowledge Base (`/knowledge`)

Busca semântica em arquivos indexados:

```bash
> /knowledge add --name docs --path ./docs
> /knowledge search "authentication flow"
```

### Goal Mode (`/goal`)

Loop iterativo onde o agente trabalha autonomamente até atingir um objetivo:

```bash
> /goal --max 10 Migrar todos os testes de Jest para Vitest e garantir que passam
```

### Code Intelligence (`/code`)

Integração com LSP para análise inteligente de código:

```bash
> /code init       # Inicializa LSP
> /code overview   # Overview do workspace
> /code status     # Status dos servers LSP
```

### Rewind (`/rewind`)

Fork da conversa em um ponto anterior para explorar caminhos alternativos:

```bash
> /rewind      # Picker interativo
> /rewind 4    # Volta para turn 4
```

---

## 7. Comparação: Kiro IDE vs Kiro CLI

| Aspecto | Kiro IDE | Kiro CLI |
|---------|----------|----------|
| Interface | GUI visual | Terminal interativo |
| Specs | Sim (UI dedicada) | Via Plan Agent |
| Steering | Sim | Sim (mesmos arquivos) |
| Hooks | Sim | Sim (mesmos arquivos) |
| MCP | Sim | Sim (mesma config) |
| Custom Agents | Sim | Sim (mais flexível) |
| Headless/CI | Não | Sim |
| Sessões paralelas | Não | Sim (`/spawn`) |
| Knowledge base | Não | Sim (experimental) |
| Plan mode | Não | Sim |
| Goal mode | Não | Sim |

---

## Pré-requisitos

- Kiro CLI instalado (Windows, macOS ou Linux)
- Conta Kiro (Builder ID, social login, ou IAM Identity Center)
- Projeto de exemplo clonado
- Terminal com suporte a cores (recomendado: iTerm2, Windows Terminal, Ghostty)

---

## Links Úteis

| Recurso | URL |
|---------|-----|
| Documentação oficial | https://kiro.dev/docs/cli/ |
| Quick Start | https://kiro.dev/docs/cli/quick-start/ |
| Instalação | https://kiro.dev/docs/cli/installation/ |
| CLI Commands | https://kiro.dev/docs/cli/reference/cli-commands/ |
| Slash Commands | https://kiro.dev/docs/cli/reference/slash-commands/ |
| Custom Agents | https://kiro.dev/docs/cli/custom-agents/ |
| Headless Mode | https://kiro.dev/docs/cli/headless/ |
| Steering | https://kiro.dev/docs/cli/steering/ |
| Hooks | https://kiro.dev/docs/cli/hooks/ |
| MCP | https://kiro.dev/docs/cli/mcp/ |
| Changelog | https://kiro.dev/changelog/cli/ |
| Blog de introdução | https://kiro.dev/blog/introducing-kiro-cli/ |

---

## Evolução do projeto ao longo das sessões

```
Sessão 1 — Spec Driven
  └── Criou: src/services/, src/types/, src/routes/, tests/

Sessão 2 — Steering Documents
  └── Criou: .kiro/steering/ (tech, structure, product, padrões, git flow)

Sessão 3 — Agent Hooks
  └── Criou: .kiro/hooks/ (lint-on-save, update-readme)

Sessão 4 — MCP & Powers
  └── Configurou: .kiro/settings/mcp.json, Powers

Sessão 5 — Kiro CLI  ← ESTA SESSÃO
  └── Demonstra: chat interativo, custom agents, headless mode, plan/spawn
```

---

> 📌 **Fonte oficial**: [Kiro CLI Documentation](https://kiro.dev/docs/cli/)
